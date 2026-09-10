#Requires -Version 5.1
<#
.SYNOPSIS
  Non-interactive Vercel + Neon preflight - validates deploy path without inventing secrets.

.DESCRIPTION
  Checks required env var names, validates root vercel.json + content tracing config,
  optionally opens Neon/Vercel consoles, prints migrate command with placeholders,
  and probes vercel CLI / link state. Stops cleanly when credentials or secrets are missing.
  Never invents DATABASE_URL or auth secrets. Never claims live HTTPS.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts/vercel-neon-preflight.ps1
  powershell -ExecutionPolicy Bypass -File scripts/vercel-neon-preflight.ps1 -OpenBrowsers
  powershell -ExecutionPolicy Bypass -File scripts/vercel-neon-preflight.ps1 -SkipBrowserPrompt
#>

param(
  [switch]$OpenBrowsers,
  [switch]$SkipBrowserPrompt
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$WebDir = Join-Path $RepoRoot "web"
$VercelJson = Join-Path $RepoRoot "vercel.json"
$NextConfig = Join-Path $WebDir "next.config.ts"
$EnvExample = Join-Path $WebDir ".env.production.example"
$ContentA1 = Join-Path $RepoRoot "content\a1\modules"
$VercelDir = Join-Path $RepoRoot ".vercel"
$ProjectJson = Join-Path $VercelDir "project.json"

$script:Fail = 0
$script:Warn = 0

function Ok([string]$Msg) { Write-Host ("  [OK]  " + $Msg) -ForegroundColor Green }
function Bad([string]$Msg) { Write-Host ("  [FAIL] " + $Msg) -ForegroundColor Red; $script:Fail++ }
function Note([string]$Msg) { Write-Host ("  [..]  " + $Msg) -ForegroundColor DarkGray }
function WarnMsg([string]$Msg) { Write-Host ("  [WARN] " + $Msg) -ForegroundColor Yellow; $script:Warn++ }

function Open-UrlSafe([string]$Url) {
  Write-Host ("  -> opening " + $Url) -ForegroundColor Cyan
  try { Start-Process $Url | Out-Null } catch {
    WarnMsg ("could not open browser - visit manually: " + $Url)
  }
}

function Section([string]$Title) {
  Write-Host ""
  Write-Host ("  * " + $Title) -ForegroundColor Cyan
}

Write-Host ""
Write-Host "  SLOWARIUM - Vercel + Neon preflight" -ForegroundColor Cyan
Write-Host ("  Repo: " + $RepoRoot) -ForegroundColor DarkGray
Write-Host "  Does not invent secrets. Does not claim live HTTPS." -ForegroundColor DarkGray
Write-Host ""

# --- 1) Repo layout ---
Section "Layout"
if (Test-Path $VercelJson) { Ok "vercel.json at repo root" } else { Bad "missing vercel.json at repo root" }
if (Test-Path $NextConfig) { Ok "web/next.config.ts present" } else { Bad "missing web/next.config.ts" }
if (Test-Path $EnvExample) { Ok "web/.env.production.example present" } else { Bad "missing web/.env.production.example" }
if (Test-Path $ContentA1) { Ok "content/a1/modules present (sibling of web/)" } else { Bad "missing content/a1/modules - build will lack lessons" }

# --- 2) vercel.json shape ---
Section "vercel.json"
if (Test-Path $VercelJson) {
  try {
    $vj = Get-Content -Raw -Encoding UTF8 $VercelJson | ConvertFrom-Json
    if ($vj.buildCommand -match "pnpm.*--dir web build") { Ok "buildCommand uses pnpm --dir web build" }
    else { Bad ("buildCommand should be 'pnpm --dir web build' (got: " + $vj.buildCommand + ")") }
    if ($vj.installCommand -match "pnpm install --dir web") { Ok "installCommand installs web/" }
    else { WarnMsg ("installCommand may not install web/: " + $vj.installCommand) }
    if ($vj.outputDirectory -eq "web/.next") { Ok "outputDirectory = web/.next" }
    else { WarnMsg ("outputDirectory expected web/.next (got: " + $vj.outputDirectory + ")") }
    if ($vj.framework -eq "nextjs") { Ok "framework = nextjs" }
    else { WarnMsg "framework expected nextjs" }
  } catch {
    Bad ("vercel.json is not valid JSON: " + $_)
  }
}

# --- 3) Content tracing ---
Section "Content tracing (next.config.ts)"
if (Test-Path $NextConfig) {
  $nc = Get-Content -Raw -Encoding UTF8 $NextConfig
  if ($nc -match "outputFileTracingRoot") { Ok "outputFileTracingRoot set" } else { Bad "missing outputFileTracingRoot" }
  if ($nc -match "outputFileTracingIncludes") { Ok "outputFileTracingIncludes set" } else { Bad "missing outputFileTracingIncludes" }
  if ($nc -match "\.\./content" -or $nc -match "\./content") { Ok "includes mention content/ paths" }
  else { Bad "tracing includes should reference content/" }
}

# --- 4) Required env names (from production example) ---
Section "Required Vercel env names (values NOT checked - never invent)"
$requiredNames = @(
  "DATABASE_URL",
  "BETTER_AUTH_SECRET",
  "INVITE_TOKEN_PEPPER",
  "PRIVACY_AUDIT_SECRET",
  "BETTER_AUTH_URL",
  "NEXT_PUBLIC_APP_URL",
  "APP_URL",
  "BETA_MODE",
  "BETA_ALLOW_DRAFT",
  "DEMO_MODE",
  "DEMO_PREVIEW"
)
$closedBetaShape = @(
  @{ Name = "BETA_ALLOW_DRAFT"; Expect = "true" },
  @{ Name = "DEMO_MODE"; Expect = "false" },
  @{ Name = "DEMO_PREVIEW"; Expect = "false" }
)

foreach ($n in $requiredNames) { Note ("must set on Vercel Production: " + $n) }

Write-Host ""
Note "Closed-beta contract (must match live):"
foreach ($row in $closedBetaShape) {
  Note ("  " + $row.Name + "=" + $row.Expect)
}

if (Test-Path $EnvExample) {
  $ex = Get-Content -Raw -Encoding UTF8 $EnvExample
  $missingFromExample = @()
  foreach ($n in $requiredNames) {
    if ($ex -notmatch [regex]::Escape($n)) { $missingFromExample += $n }
  }
  if ($missingFromExample.Count -eq 0) { Ok ".env.production.example lists all required names" }
  else { WarnMsg (".env.production.example missing names: " + ($missingFromExample -join ", ")) }
}

# --- 5) Migrate command (placeholders only) ---
Section "Migrate (run AFTER Neon direct URL exists - placeholders only)"
Write-Host ""
Write-Host ("  cd " + $WebDir)
Write-Host '  $env:DATABASE_URL = "<NEON_DIRECT_POSTGRES_URL>"   # not pooler; never commit'
Write-Host "  pnpm db:migrate"
Write-Host ""
Note "App DATABASE_URL on Vercel should be the pooled Neon URL when available."

# --- 6) Tooling probes ---
Section "Tooling probes"

$vercelCmd = Get-Command vercel -ErrorAction SilentlyContinue
if ($null -ne $vercelCmd) {
  Ok ("vercel CLI found (" + $vercelCmd.Source + ")")
  $who = & vercel whoami 2>&1 | Out-String
  if ($LASTEXITCODE -eq 0 -and ($who -notmatch "Error|credentials|login")) {
    Ok ("vercel whoami: " + $who.Trim())
  } else {
    WarnMsg "vercel not logged in - run: vercel login"
    Note "Deploy blocked until founder authenticates Vercel CLI or uses dashboard Import."
  }
} else {
  WarnMsg "vercel CLI not on PATH - install: npm i -g vercel  (or use dashboard only)"
}

$ghCmd = Get-Command gh -ErrorAction SilentlyContinue
if ($null -ne $ghCmd) {
  $ghOut = & gh auth status 2>&1 | Out-String
  if ($ghOut -match "Logged in") { Ok "gh authenticated" }
  else { WarnMsg "gh not authenticated (optional for Vercel-only path)" }
} else {
  Note "gh not on PATH (optional)"
}

if (Test-Path $ProjectJson) {
  try {
    $pj = Get-Content -Raw -Encoding UTF8 $ProjectJson | ConvertFrom-Json
    Ok ("linked project: org=" + $pj.orgId + " project=" + $pj.projectId)
  } catch {
    WarnMsg ".vercel/project.json present but unreadable"
  }
} else {
  Note "No .vercel link in this clone - link via dashboard Import or: vercel link"
  Note "Do not invent VERCEL_ORG_ID / VERCEL_PROJECT_ID."
}

# --- 7) Optional browsers ---
Section "Consoles"
$neonUrl = "https://console.neon.tech"
$vercelUrl = "https://vercel.com/new"
$githubEnv = "https://github.com/IvanStabronik/PolishApp/settings/environments/private-beta"

Note ("Neon:   " + $neonUrl)
Note ("Vercel: " + $vercelUrl + "  (Import IvanStabronik/PolishApp)")
Note ("GH env: " + $githubEnv + "  (optional; secrets empty until human fills)")

$doOpen = $OpenBrowsers.IsPresent
if (-not $doOpen -and -not $SkipBrowserPrompt -and [Environment]::UserInteractive) {
  Write-Host ""
  Write-Host "  Open Neon + Vercel in browser now? [y/N] " -ForegroundColor DarkGray -NoNewline
  $ans = Read-Host
  if ($ans -match '^(y|yes)$') { $doOpen = $true }
}
if ($doOpen) {
  Open-UrlSafe $neonUrl
  Open-UrlSafe $vercelUrl
}

# --- 8) Attempt link/deploy only if already authenticated ---
Section "Deploy attempt (auth-gated)"
if ($null -ne $vercelCmd) {
  $who2 = & vercel whoami 2>&1 | Out-String
  if ($LASTEXITCODE -eq 0 -and ($who2 -notmatch "Error|credentials|login")) {
    if (-not (Test-Path $ProjectJson)) {
      Note "Authenticated but unlinked. Run interactively: vercel link"
      Note "Then: vercel env pull (or set env in dashboard) before vercel deploy --prod"
      WarnMsg "Stopping before deploy - no linked project and secrets not verified."
    } else {
      Note "Project linked. Checking whether production env names exist via CLI..."
      $envLs = & vercel env ls production 2>&1 | Out-String
      if ($LASTEXITCODE -ne 0) {
        WarnMsg "vercel env ls failed - set env in dashboard; stop before deploy."
      } else {
        $missingEnv = @()
        foreach ($n in $requiredNames) {
          if ($envLs -notmatch [regex]::Escape($n)) { $missingEnv += $n }
        }
        if ($missingEnv.Count -gt 0) {
          WarnMsg ("Missing on Vercel Production (names): " + ($missingEnv -join ", "))
          Note "Fill via dashboard Settings - Environment Variables, then redeploy."
          Note "Stopping before deploy - secrets missing."
        } else {
          Ok "All required env names appear in vercel env ls production"
          Note "Not auto-running vercel deploy - founder should redeploy after confirming secret VALUES."
          Note "Migrate still requires human DATABASE_URL (direct) on this machine."
        }
      }
    }
  } else {
    Note "Skip deploy: vercel login required (or use Import on vercel.com)."
  }
} else {
  Note "Skip deploy: no vercel CLI."
}

# --- Summary ---
Section "Summary"
if ($script:Fail -eq 0) {
  Ok ("Repo deploy path config looks ready (" + $script:Warn + " warning(s)).")
} else {
  Bad ($script:Fail.ToString() + " check(s) failed - fix before Import/deploy.")
}

Write-Host ""
Write-Host "  Exact 3 clicks for founder next:" -ForegroundColor Yellow
Write-Host "    1) Neon console - New Project - copy pooled + direct URLs"
Write-Host "    2) Vercel - Add New - Project - Import IvanStabronik/PolishApp"
Write-Host "    3) Vercel - Settings - Environment Variables - paste from .env.production.example"
Write-Host "  Then: pnpm db:migrate with DIRECT URL; curl /api/health + /api/ready on *.vercel.app"
Write-Host ""
Write-Host "  Interactive full wizard: powershell -ExecutionPolicy Bypass -File scripts\founder-unblock.ps1" -ForegroundColor DarkGray
Write-Host "  Docs: docs\operations\FOUNDER-UNBLOCK-NOW.md" -ForegroundColor DarkGray
Write-Host ""

if ($script:Fail -gt 0) { exit 1 } else { exit 0 }

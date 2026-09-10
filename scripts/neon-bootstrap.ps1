#Requires -Version 5.1
<#
.SYNOPSIS
  Post-Neon-Create bootstrap - migrate against the DIRECT URL, print Vercel next steps.

.DESCRIPTION
  Runs pnpm --dir web db:migrate with DATABASE_URL set to -DirectUrl.
  Never invents connection strings. Fails if DirectUrl is empty.
  Does NOT enable DEMO_MODE. Does NOT claim live HTTPS.
  Optional -PooledUrl is printed for Vercel docs only (not used for migrate).

.PARAMETER DirectUrl
  Neon (or Supabase) DIRECT postgres URL - no pooler. Required for migrate.

.PARAMETER PooledUrl
  Optional pooled URL - printed as the value to set on Vercel DATABASE_URL.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts/neon-bootstrap.ps1 -DirectUrl 'postgresql://...'
  powershell -ExecutionPolicy Bypass -File scripts/neon-bootstrap.ps1 -DirectUrl 'postgresql://...' -PooledUrl 'postgresql://...-pooler...'
#>

param(
  [Parameter(Mandatory = $false)]
  [string]$DirectUrl = "",

  [Parameter(Mandatory = $false)]
  [string]$PooledUrl = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$WebDir = Join-Path $RepoRoot "web"

function Fail([string]$Msg) {
  Write-Host ""
  Write-Host ("  [FAIL] " + $Msg) -ForegroundColor Red
  Write-Host ""
  exit 1
}

function Ok([string]$Msg) { Write-Host ("  [OK]  " + $Msg) -ForegroundColor Green }
function Note([string]$Msg) { Write-Host ("  [..]  " + $Msg) -ForegroundColor DarkGray }
function Section([string]$Title) {
  Write-Host ""
  Write-Host ("  * " + $Title) -ForegroundColor Cyan
}

Write-Host ""
Write-Host "  SLOWARIUM - Neon bootstrap (migrate + next steps)" -ForegroundColor Cyan
Write-Host ("  Repo: " + $RepoRoot) -ForegroundColor DarkGray
Write-Host "  Never invents URLs. Never enables DEMO_MODE. Does not claim HTTPS." -ForegroundColor DarkGray
Write-Host ""

$direct = if ($null -eq $DirectUrl) { "" } else { $DirectUrl.Trim() }
if ([string]::IsNullOrWhiteSpace($direct)) {
  Fail @"
DirectUrl is empty. Paste the Neon DIRECT connection string (no pooler). Example:
  powershell -ExecutionPolicy Bypass -File scripts\neon-bootstrap.ps1 -DirectUrl 'postgresql://...'
"@
}

if ($direct -match "YOUR_|changeme|example\.com|localhost|127\.0\.0\.1") {
  Fail "DirectUrl looks like a placeholder or local URL. Use the real Neon DIRECT string from the console."
}

$pooled = if ($null -eq $PooledUrl) { "" } else { $PooledUrl.Trim() }

Section "Migrate (direct URL)"
Note "Using DIRECT URL for pnpm db:migrate (advisory lock)."
if ($pooled) {
  Note "Pooled URL captured for Vercel docs only (not used for migrate)."
}

$env:DATABASE_URL = $direct
Push-Location $RepoRoot
try {
  Write-Host ("  -> pnpm --dir web db:migrate") -ForegroundColor DarkGray
  & pnpm --dir web db:migrate
  if ($LASTEXITCODE -ne 0) {
    Fail ("db:migrate exited with code " + $LASTEXITCODE + " - stop. Do not claim ready.")
  }
  Ok "db:migrate completed"
} finally {
  Pop-Location
  # Do not leave the secret in the process env for interactive shells that inherit this session.
  Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue
}

Section "Next: Vercel env + redeploy"
if ($pooled) {
  $appDbHint = "<Neon POOLED URL you passed as -PooledUrl>"
} else {
  $appDbHint = "<Neon POOLED URL (...-pooler...) - preferred for app>"
}
Write-Host ""
Write-Host "  1) Vercel -> Project -> Settings -> Environment Variables (Production):"
Write-Host ("     DATABASE_URL=" + $appDbHint)
Write-Host "     BETTER_AUTH_SECRET / INVITE_TOKEN_PEPPER / PRIVACY_AUDIT_SECRET  (pnpm ops:generate-secret x3)"
Write-Host "     BETTER_AUTH_URL / NEXT_PUBLIC_APP_URL / APP_URL = https://<your>.vercel.app"
Write-Host "     BETA_MODE=true"
Write-Host "     BETA_ALLOW_DRAFT=true"
Write-Host "     DEMO_MODE=false"
Write-Host "     DEMO_PREVIEW=false"
Write-Host "  2) Redeploy (Deployments -> Redeploy, or push / Deploy Hook)."
Write-Host "  3) Prove HTTPS (no fake claims):"
Write-Host '     $BASE_URL = "https://YOUR_PROJECT.vercel.app"   # no trailing slash'
Write-Host '     curl.exe -fsS "$BASE_URL/api/health"'
Write-Host '     curl.exe -fsS "$BASE_URL/api/ready"'
Write-Host ""

Section "First admin / invite-first (no DEMO_MODE on Vercel)"
Note "Prefer bootstrap-first-admin with a real email. Do NOT set DEMO_MODE=true on Vercel."
Write-Host ""
Write-Host "  Preferred (founder email + password, DEMO_MODE stays false):"
Write-Host ""
Write-Host ("    powershell -ExecutionPolicy Bypass -File " + (Join-Path $RepoRoot "scripts\bootstrap-first-admin.ps1") + " ``")
Write-Host '      -DatabaseUrl "<same DIRECT URL>" -Email "you@example.com" -Password "<strong>"'
Write-Host ""
Write-Host "  Fallback (demo accounts via FORCE_SEED — laptop only; DEMO_MODE unset/false):"
Write-Host ""
Write-Host ("    cd " + $WebDir)
Write-Host '    $env:DATABASE_URL = "<same DIRECT URL>"'
Write-Host '    $env:FORCE_SEED = "true"'
Write-Host "    # Keep DEMO_MODE unset/false - FORCE_SEED alone opens the seed gate."
Write-Host "    pnpm db:seed"
Write-Host '    Remove-Item Env:FORCE_SEED, Env:DATABASE_URL -ErrorAction SilentlyContinue'
Write-Host ""
Write-Host "  Then on live HTTPS (DEMO_MODE=false and BETA_ALLOW_DRAFT=true):"
Write-Host "    - Sign in as the bootstrap admin (or DEMO_ACCOUNTS.admin if FORCE_SEED fallback)"
Write-Host "    - Open /{locale}/admin/beta -> create invite -> share /{locale}/invite/{token}"
Write-Host "    - Invitee registers -> onboard -> one DRAFT lesson attempt"
Write-Host ""

Section "Done"
Ok "Schema migrated. Finish Vercel env + redeploy + curl health/ready before claiming HTTPS."
Note "Docs: docs\operations\FOUNDER-UNBLOCK-NOW.md"
Write-Host ""
exit 0

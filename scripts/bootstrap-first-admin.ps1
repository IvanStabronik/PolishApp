#Requires -Version 5.1
<#
.SYNOPSIS
  Create the first closed-beta admin against a Neon DIRECT URL (DEMO_MODE=false).

.DESCRIPTION
  Sets DATABASE_URL for one shot, forces DEMO_MODE=false in-process, runs
  pnpm db:bootstrap-admin. Never writes Vercel env. Never sets DEMO_MODE=true.
  Refuses if DEMO_MODE or ALLOW_PRODUCTION_DEMO is already true in the process env.

.PARAMETER DatabaseUrl
  Neon (or Supabase) DIRECT postgres URL — prefer no pooler for this one-shot.

.PARAMETER Email
  Founder admin email (not @demo.slowarium.local).

.PARAMETER Password
  Credential password (min 8 chars). Store in a password manager; do not paste into chat.

.PARAMETER Name
  Optional display name (default: Founder Admin).

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts/bootstrap-first-admin.ps1 `
    -DatabaseUrl 'postgresql://…' -Email 'you@example.com' -Password '…'
#>

param(
  [Parameter(Mandatory = $true)]
  [string]$DatabaseUrl,

  [Parameter(Mandatory = $true)]
  [string]$Email,

  [Parameter(Mandatory = $true)]
  [string]$Password,

  [Parameter(Mandatory = $false)]
  [string]$Name = "Founder Admin"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")

function Fail([string]$Msg) {
  Write-Host ""
  Write-Host ("  [FAIL] " + $Msg) -ForegroundColor Red
  Write-Host ""
  exit 1
}

function Ok([string]$Msg) { Write-Host ("  [OK]  " + $Msg) -ForegroundColor Green }
function Note([string]$Msg) { Write-Host ("  [..]  " + $Msg) -ForegroundColor DarkGray }

Write-Host ""
Write-Host "  SLOWARIUM - Bootstrap first admin (no DEMO_MODE)" -ForegroundColor Cyan
Write-Host ("  Repo: " + $RepoRoot) -ForegroundColor DarkGray
Write-Host "  Never sets DEMO_MODE=true. Never invents URLs or passwords." -ForegroundColor DarkGray
Write-Host ""

$db = if ($null -eq $DatabaseUrl) { "" } else { $DatabaseUrl.Trim() }
if ([string]::IsNullOrWhiteSpace($db)) {
  Fail "DatabaseUrl is empty. Paste the Neon DIRECT connection string."
}
if ($db -match "YOUR_|changeme|example\.com") {
  Fail "DatabaseUrl looks like a placeholder. Use the real Neon DIRECT string."
}

$mail = if ($null -eq $Email) { "" } else { $Email.Trim() }
if ([string]::IsNullOrWhiteSpace($mail) -or ($mail -notmatch "@")) {
  Fail "Email is required and must look like an email address."
}
if ($mail -match "@demo\.slowarium\.local$") {
  Fail "Refuse demo.slowarium.local emails — those are DEMO_MODE seed only."
}

if ([string]::IsNullOrWhiteSpace($Password) -or $Password.Length -lt 8) {
  Fail "Password must be at least 8 characters."
}

# Refuse if caller already has demo theater on — would leave production DEMO_MODE=true risk.
if ($env:DEMO_MODE -eq "true" -or $env:DEMO_MODE -eq "1") {
  Fail "Refuse: DEMO_MODE is true in this shell. Unset it (Remove-Item Env:DEMO_MODE) and keep Vercel DEMO_MODE=false."
}
if ($env:ALLOW_PRODUCTION_DEMO -eq "true" -or $env:ALLOW_PRODUCTION_DEMO -eq "1") {
  Fail "Refuse: ALLOW_PRODUCTION_DEMO is set. First-admin bootstrap is for real closed beta only."
}

$prevDb = $env:DATABASE_URL
$prevDemo = $env:DEMO_MODE
$prevAllow = $env:ALLOW_PRODUCTION_DEMO

$env:DATABASE_URL = $db
$env:DEMO_MODE = "false"
Remove-Item Env:ALLOW_PRODUCTION_DEMO -ErrorAction SilentlyContinue

Note "DATABASE_URL set for one shot; DEMO_MODE=false in-process (not written to Vercel)."
Write-Host ("  -> pnpm --dir web db:bootstrap-admin -- --email <redacted> --password <redacted>") -ForegroundColor DarkGray

Push-Location $RepoRoot
try {
  $nameArg = if ([string]::IsNullOrWhiteSpace($Name)) { "Founder Admin" } else { $Name.Trim() }
  & pnpm --dir web db:bootstrap-admin -- --email $mail --password $Password --name $nameArg
  if ($LASTEXITCODE -ne 0) {
    Fail ("db:bootstrap-admin exited with code " + $LASTEXITCODE)
  }
  Ok "First admin ready. Sign in on live host → /{locale}/admin/beta → create invite."
  Note "Do NOT set DEMO_MODE=true on Vercel. Keep BETA_ALLOW_DRAFT=true for closed-beta DRAFT."
} finally {
  Pop-Location
  if ($null -eq $prevDb -or $prevDb -eq "") {
    Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue
  } else {
    $env:DATABASE_URL = $prevDb
  }
  if ($null -eq $prevDemo -or $prevDemo -eq "") {
    Remove-Item Env:DEMO_MODE -ErrorAction SilentlyContinue
  } else {
    $env:DEMO_MODE = $prevDemo
  }
  if ($null -ne $prevAllow -and $prevAllow -ne "") {
    $env:ALLOW_PRODUCTION_DEMO = $prevAllow
  }
}

Write-Host ""
exit 0

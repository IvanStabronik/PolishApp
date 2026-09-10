#Requires -Version 5.1
<#
.SYNOPSIS
  Prove live HTTPS health/ready for a Vercel (or any) BASE_URL — no secret invention.

.DESCRIPTION
  Calls GET /api/health and GET /api/ready on -BaseUrl until both return HTTP 200
  or retries are exhausted. Optional Playwright production smoke.
  Never invents BASE_URL. Never claims PUBLISHED / JPJO.
  Paste Done/Blocked into docs/operations/external-unblock-wizard.md §4 only after PASS.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts/smoke-vercel.ps1 -BaseUrl https://your-app.vercel.app
  powershell -ExecutionPolicy Bypass -File scripts/smoke-vercel.ps1 -BaseUrl https://your-app.vercel.app -WaitSeconds 90
  powershell -ExecutionPolicy Bypass -File scripts/smoke-vercel.ps1 -BaseUrl https://your-app.vercel.app -RunPlaywright
#>

param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl,

  [int]$WaitSeconds = 60,

  [int]$IntervalSeconds = 2,

  [switch]$RunPlaywright
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$WebDir = Join-Path $RepoRoot "web"

function Ok([string]$Msg) { Write-Host ("  [OK]  " + $Msg) -ForegroundColor Green }
function Bad([string]$Msg) { Write-Host ("  [FAIL] " + $Msg) -ForegroundColor Red }
function Note([string]$Msg) { Write-Host ("  [..]  " + $Msg) -ForegroundColor DarkGray }

$Base = $BaseUrl.Trim().TrimEnd("/")
if ($Base -notmatch "^https://") {
  Bad "BaseUrl must be https://… (got: $BaseUrl)"
  Write-Host ""
  Write-Host "  Blocked: BASE_URL not HTTPS. Do not mark wizard §4 Done." -ForegroundColor Yellow
  exit 1
}

Write-Host ""
Write-Host "  SLOWARIUM - production smoke (health/ready)" -ForegroundColor Cyan
Write-Host ("  BASE_URL: " + $Base) -ForegroundColor DarkGray
Write-Host "  Does not invent secrets. Does not claim PUBLISHED / JPJO." -ForegroundColor DarkGray
Write-Host ""

$deadline = [DateTime]::UtcNow.AddSeconds([Math]::Max(1, $WaitSeconds))
$healthy = $false
$attempt = 0

while ([DateTime]::UtcNow -lt $deadline) {
  $attempt++
  $healthOk = $false
  $readyOk = $false
  try {
    $h = Invoke-WebRequest -Uri "$Base/api/health" -Method GET -UseBasicParsing -TimeoutSec 15
    if ($h.StatusCode -eq 200) { $healthOk = $true }
  } catch {
    $healthOk = $false
  }
  try {
    $r = Invoke-WebRequest -Uri "$Base/api/ready" -Method GET -UseBasicParsing -TimeoutSec 15
    if ($r.StatusCode -eq 200) { $readyOk = $true }
  } catch {
    $readyOk = $false
  }

  if ($healthOk -and $readyOk) {
    $healthy = $true
    Ok ("health + ready HTTP 200 (attempt $attempt)")
    break
  }

  $parts = @()
  if (-not $healthOk) { $parts += "health" }
  if (-not $readyOk) { $parts += "ready" }
  Note ("attempt $attempt — waiting on: " + ($parts -join ", "))
  Start-Sleep -Seconds ([Math]::Max(1, $IntervalSeconds))
}

if (-not $healthy) {
  Bad "health/ready did not both return 200 within ${WaitSeconds}s"
  Write-Host ""
  Write-Host "  Blocked: live HTTPS smoke FAILED." -ForegroundColor Yellow
  Write-Host "  Paste into external-unblock-wizard.md §4: Blocked — health/ready not 200 on $Base" -ForegroundColor Yellow
  Write-Host "  Manual: curl.exe -fsS `"$Base/api/health`"; curl.exe -fsS `"$Base/api/ready`"" -ForegroundColor DarkGray
  exit 1
}

if ($RunPlaywright) {
  Write-Host ""
  Note "Running Playwright production smoke (optional)…"
  $env:BASE_URL = $Base
  Push-Location $WebDir
  try {
    pnpm test:e2e:production
    if ($LASTEXITCODE -ne 0) {
      Bad "Playwright production smoke failed (exit $LASTEXITCODE)"
      Write-Host "  Blocked: health/ready OK but e2e smoke FAILED." -ForegroundColor Yellow
      exit 1
    }
    Ok "Playwright production smoke passed"
  } finally {
    Pop-Location
  }
}

Write-Host ""
Write-Host "  Done: health + ready 200 on $Base" -ForegroundColor Green
Write-Host "  Paste into external-unblock-wizard.md §4: Done — smoke-vercel.ps1 PASS on $Base" -ForegroundColor Green
Write-Host "  Next (human): invite → accept → onboard → one lesson attempt." -ForegroundColor DarkGray
Write-Host "  Still EXTERNAL: JPJO / PUBLISHED — do not fake." -ForegroundColor DarkGray
Write-Host ""
exit 0

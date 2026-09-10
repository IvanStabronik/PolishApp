#Requires -Version 5.1
<#
.SYNOPSIS
  Interactive founder unblock wizard - human-owned EXTERNAL steps only.

.DESCRIPTION
  Walks Railway + GitHub Environment private-beta setup, prompts for secrets
  (never invents values), dispatches deploy, curls health/ready, optional JPJO.
  Prints Done/Blocked checkboxes to paste back into chat.

.EXAMPLE
  pwsh -File scripts/founder-unblock.ps1
  powershell -ExecutionPolicy Bypass -File scripts/founder-unblock.ps1
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# --------------------------------------------------------------------------
# Wizard library (PowerShell port of wizard skill template UX)
# --------------------------------------------------------------------------

$script:TOTAL_STAGES = 0
$script:STAGE_INDEX = 0
$script:REPO = "IvanStabronik/PolishApp"
$script:ENV_NAME = "private-beta"
$script:Checklist = [ordered]@{}
$script:WrittenSecrets = New-Object System.Collections.Generic.List[string]
$script:Skipped = New-Object System.Collections.Generic.List[string]
$script:Captured = @{}

function Clear-WizardScreen {
  if ([Environment]::UserInteractive -and $Host.Name -ne "ServerRemoteHost") {
    try { Clear-Host } catch { }
  }
}

function Write-Banner {
  param([string]$Title)
  Clear-WizardScreen
  Write-Host ""
  Write-Host "  $Title" -ForegroundColor Cyan
  Write-Host "  $($script:TOTAL_STAGES) stages" -ForegroundColor DarkGray
  Write-Host ""
  Write-Host "  You drive the browser; this wizard tells you exactly what to do and" -ForegroundColor DarkGray
  Write-Host "  captures values you paste back. Never paste secret values into chat." -ForegroundColor DarkGray
  Write-Host "  Stop any time with Ctrl-C and re-run later." -ForegroundColor DarkGray
  Write-Host ""
  Pause-Wizard "Ready to start? Press Enter"
}

function Enter-Stage {
  param([string]$Name)
  Clear-WizardScreen
  $script:STAGE_INDEX++
  Write-Host ""
  Write-Host "  > Stage $($script:STAGE_INDEX)/$($script:TOTAL_STAGES) - $Name" -ForegroundColor Cyan
  Write-Host ""
}

function Say  { param([string]$Msg) Write-Host "  $Msg" }
function Step { param([string]$Msg) Write-Host "  * $Msg" -ForegroundColor Blue }
function Note { param([string]$Msg) Write-Host "  $Msg" -ForegroundColor DarkGray }
function Warn-Wizard { param([string]$Msg) Write-Host "  ! $Msg" -ForegroundColor Yellow }

function Open-Url {
  param([string]$Url)
  Write-Host "  -> opening $Url" -ForegroundColor Green
  try {
    Start-Process $Url | Out-Null
  } catch {
    Warn-Wizard "could not open a browser - visit it manually: $Url"
  }
}

function Pause-Wizard {
  param([string]$Msg = "Press Enter to continue")
  Write-Host "  $Msg " -ForegroundColor DarkGray -NoNewline
  [void](Read-Host)
}

function Confirm-Wizard {
  param([string]$Question)
  $reply = Read-Host "  ? $Question [y/N]"
  return ($reply -match '^[Yy]')
}

function Ask-Value {
  param(
    [string]$Key,
    [string]$Prompt,
    [switch]$Secret
  )
  $existing = $null
  if ($script:Captured.ContainsKey($Key)) {
    $existing = $script:Captured[$Key]
  }
  if ($Secret) {
    if ($existing) {
      Write-Host "  $Prompt [Enter keeps current]" -NoNewline
      $secure = Read-Host -AsSecureString
      if ($secure.Length -eq 0) {
        return $existing
      }
      $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
      try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
      } finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
      }
    }
    Write-Host "  $Prompt" -NoNewline
    $secure = Read-Host -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try {
      return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    } finally {
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
  }
  if ($existing) {
    $raw = Read-Host "  $Prompt [Enter keeps current]"
    if ([string]::IsNullOrWhiteSpace($raw)) { return $existing }
    return $raw.Trim()
  }
  $raw = Read-Host "  $Prompt"
  if ($null -eq $raw) { return "" }
  return $raw.Trim()
}

function Test-GhReady {
  if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { return $false }
  & gh auth status 2>$null | Out-Null
  return ($LASTEXITCODE -eq 0)
}

function Set-EnvSecret {
  param(
    [string]$Name,
    [string]$Value,
    [string]$Environment = $script:ENV_NAME
  )
  if ([string]::IsNullOrWhiteSpace($Value)) {
    Warn-Wizard "empty value for $Name - recorded as Blocked (not set)"
    $script:Skipped.Add("GitHub Environment secret $Name (empty - set manually)") | Out-Null
    return $false
  }
  if (-not (Test-GhReady)) {
    Warn-Wizard "gh not ready - set $Name manually on Environment '$Environment'"
    $script:Skipped.Add("GitHub Environment secret $Name (gh not ready)") | Out-Null
    return $false
  }
  $Value | & gh secret set $Name --env $Environment --repo $script:REPO 2>$null
  if ($LASTEXITCODE -eq 0) {
    $script:WrittenSecrets.Add($Name) | Out-Null
    Write-Host "  OK set Environment secret $Name ($Environment)" -ForegroundColor Green
    return $true
  }
  Warn-Wizard "failed to set $Name via gh - set it in the GitHub UI"
  $script:Skipped.Add("GitHub Environment secret $Name (gh set failed)") | Out-Null
  return $false
}

function Mark-Check {
  param(
    [string]$Id,
    [ValidateSet("Done", "Blocked", "Skipped")]
    [string]$Status,
    [string]$Label
  )
  $script:Checklist[$Id] = [pscustomobject]@{ Status = $Status; Label = $Label }
}

function Get-RepoRoot {
  $here = $PSScriptRoot
  if (-not $here) { $here = (Get-Location).Path }
  return (Resolve-Path (Join-Path $here "..")).Path
}

# --------------------------------------------------------------------------
# STAGES
# --------------------------------------------------------------------------

$script:TOTAL_STAGES = 7
$repoRoot = Get-RepoRoot
$packetRel = "docs/reviews/pierwsze-spotkanie-jpjo-hall-packet.md"
$packetPath = Join-Path $repoRoot $packetRel

Write-Banner "SLOWARIUM founder unblock (EXTERNAL)"

# -- 1. Railway project + Postgres -----------------------------------------
Enter-Stage "Railway project + Postgres"
Say "Create the host. Do not invent DATABASE_URL - copy it from Railway."
Open-Url "https://railway.app"
Step "New Project -> Deploy from GitHub -> repo PolishApp (IvanStabronik/PolishApp)."
Step "Add Postgres plugin; open the Postgres service -> Variables / Connect -> copy DATABASE_URL."
Step "Open the web service -> Variables. You will paste runtime env in stage 3."
Pause-Wizard "When Postgres exists and you have DATABASE_URL copied, press Enter"

$dbUrl = Ask-Value -Key "DATABASE_URL" -Prompt "Paste DATABASE_URL:" -Secret
if ([string]::IsNullOrWhiteSpace($dbUrl)) {
  Mark-Check "railway_db" "Blocked" "Railway Postgres / DATABASE_URL"
  Warn-Wizard "No DATABASE_URL - later secret steps will stay Blocked."
} else {
  $script:Captured["DATABASE_URL"] = $dbUrl
  Mark-Check "railway_db" "Done" "Railway Postgres / DATABASE_URL"
}
if (Confirm-Wizard "Railway project + web service created?") {
  Mark-Check "railway_project" "Done" "Railway project + web service"
} else {
  Mark-Check "railway_project" "Blocked" "Railway project + web service"
}

# -- 2. GitHub Environment private-beta ------------------------------------
Enter-Stage "GitHub Environment private-beta"
Say "Environment name must be exactly: private-beta (matches deploy.yml)."
Open-Url "https://github.com/$($script:REPO)/settings/environments"
Step "New environment -> name exactly: private-beta"
Step "Leave protection rules optional for now; secrets come next."
Pause-Wizard "When the environment exists, press Enter"

if (Confirm-Wizard "Environment private-beta exists?") {
  Mark-Check "gh_env" "Done" "GitHub Environment private-beta created"
} else {
  Mark-Check "gh_env" "Blocked" "GitHub Environment private-beta created"
}

# -- 3. Host runtime flags + generate secrets ------------------------------
Enter-Stage "Host runtime flags + generate secrets"
Say "On Railway web service Variables, set closed-beta flags exactly:"
Step "BETA_MODE=true"
Step "BETA_ALLOW_DRAFT=true"
Step "DEMO_MODE=false"
Step "DEMO_PREVIEW=false"
Step "ALLOW_PRODUCTION_DEMO unset / false"
Say ""
Say "Generate three secrets from the repo (do not invent them in chat):"
Note "  cd $repoRoot\web"
Note "  pnpm ops:generate-secret   # -> BETTER_AUTH_SECRET"
Note "  pnpm ops:generate-secret   # -> INVITE_TOKEN_PEPPER"
Note "  pnpm ops:generate-secret   # -> PRIVACY_AUDIT_SECRET"
Say ""
Say "Also set on Railway (shape: web/.env.production.example):"
Step "NODE_ENV=production"
Step "DATABASE_URL=<postgres url>"
Step "BETTER_AUTH_SECRET / INVITE_TOKEN_PEPPER / PRIVACY_AUDIT_SECRET"
Step "BETTER_AUTH_URL / NEXT_PUBLIC_APP_URL / APP_URL = https://<your-railway-host>"
Say ""
Step "Deploy once from Railway UI so a public HTTPS host exists."
Step "Copy public HTTPS URL (no trailing slash) -> BASE_URL"
Step "Account -> Tokens -> create token -> RAILWAY_TOKEN"
Step "Service settings -> copy Service ID -> RAILWAY_SERVICE_ID"
Open-Url "https://railway.app/account/tokens"
Pause-Wizard "When Railway variables + first deploy + token/service id are ready, press Enter"

if (Confirm-Wizard "BETA_ALLOW_DRAFT=true and DEMO_*=false set on Railway?") {
  Mark-Check "beta_flags" "Done" "BETA_ALLOW_DRAFT=true, DEMO_*=false on host"
} else {
  Mark-Check "beta_flags" "Blocked" "BETA_ALLOW_DRAFT=true, DEMO_*=false on host"
}

$baseUrl = Ask-Value -Key "BASE_URL" -Prompt "Paste BASE_URL (https://... no trailing slash):"
if ($baseUrl -and $baseUrl -notmatch '^https://') {
  Warn-Wizard "BASE_URL should start with https:// - keeping what you pasted; fix if wrong."
}
if ($baseUrl) {
  $baseUrl = $baseUrl.TrimEnd("/")
  $script:Captured["BASE_URL"] = $baseUrl
  Mark-Check "base_url" "Done" "BASE_URL captured"
} else {
  Mark-Check "base_url" "Blocked" "BASE_URL captured"
}

# -- 4. Set each required GitHub Environment secret ------------------------
Enter-Stage "Set private-beta Environment secrets"
Say "Prompting one secret at a time. Empty = Blocked (never invent)."
Say "These names must match .github/workflows/deploy.yml + FOUNDER-UNBLOCK-NOW.md."
Write-Host ""

$secretSpecs = @(
  @{ Name = "DATABASE_URL";         FromCapture = "DATABASE_URL"; Hint = "Railway Postgres URL" }
  @{ Name = "BETTER_AUTH_SECRET";   FromCapture = $null;          Hint = "from pnpm ops:generate-secret (same as Railway)" }
  @{ Name = "INVITE_TOKEN_PEPPER";  FromCapture = $null;          Hint = "from pnpm ops:generate-secret (same as Railway)" }
  @{ Name = "PRIVACY_AUDIT_SECRET"; FromCapture = $null;          Hint = "from pnpm ops:generate-secret (same as Railway)" }
  @{ Name = "BASE_URL";             FromCapture = "BASE_URL";     Hint = "public https:// host, no trailing slash" }
  @{ Name = "RAILWAY_TOKEN";        FromCapture = $null;          Hint = "Railway account token" }
  @{ Name = "RAILWAY_SERVICE_ID";   FromCapture = $null;          Hint = "Railway web service ID" }
)

Open-Url "https://github.com/$($script:REPO)/settings/environments"
Note "If gh auth is ready, values are written with: gh secret set NAME --env private-beta"
Note "Otherwise set them in the Environment UI (Secrets)."
Write-Host ""

foreach ($spec in $secretSpecs) {
  $name = $spec.Name
  Say "-- $name --"
  Note $spec.Hint
  if ($spec.FromCapture -and $script:Captured.ContainsKey($spec.FromCapture)) {
    $script:Captured[$name] = $script:Captured[$spec.FromCapture]
    Note "(offering value captured earlier this run - Enter to reuse, or paste a new one)"
  }
  $val = Ask-Value -Key $name -Prompt "Paste $name (empty = skip/Blocked):" -Secret
  if ([string]::IsNullOrWhiteSpace($val)) {
    Mark-Check "secret_$name" "Blocked" "Environment secret $name"
    continue
  }
  if ($name -eq "BASE_URL") {
    $val = $val.TrimEnd("/")
    $script:Captured["BASE_URL"] = $val
  }
  $ok = Set-EnvSecret -Name $name -Value $val
  if ($ok) {
    Mark-Check "secret_$name" "Done" "Environment secret $name"
  } else {
    if (Confirm-Wizard "Did you set $name manually in the GitHub Environment UI?") {
      Mark-Check "secret_$name" "Done" "Environment secret $name"
    } else {
      Mark-Check "secret_$name" "Blocked" "Environment secret $name"
    }
  }
}

Say ""
Say "Optional smoke secrets (leave empty to skip - keep run_production_smoke=false):"
foreach ($opt in @("PROD_SMOKE_ADMIN_EMAIL", "PROD_SMOKE_ADMIN_PASSWORD")) {
  $val = Ask-Value -Key $opt -Prompt "Paste $opt (optional, empty=skip):" -Secret
  if ([string]::IsNullOrWhiteSpace($val)) {
    Mark-Check "secret_$opt" "Skipped" "Optional Environment secret $opt"
    continue
  }
  if (Set-EnvSecret -Name $opt -Value $val) {
    Mark-Check "secret_$opt" "Done" "Optional Environment secret $opt"
  } else {
    Mark-Check "secret_$opt" "Blocked" "Optional Environment secret $opt"
  }
}

# -- 5. workflow_dispatch deploy -------------------------------------------
Enter-Stage "Dispatch Deploy private beta"
Say "Manual deploy only - workflow_dispatch. Do not invent image_tag."
Open-Url "https://github.com/$($script:REPO)/actions/workflows/deploy.yml"

$defaultSha = $null
try {
  Push-Location $repoRoot
  $defaultSha = (& git rev-parse HEAD 2>$null)
} finally {
  Pop-Location
}

Step "Actions -> Deploy private beta -> Run workflow"
Step "confirm_environment = private-beta"
if ($defaultSha) {
  Step "image_tag = $defaultSha  (current HEAD; change only if you intend another SHA)"
} else {
  Step "image_tag = current commit SHA on docs/requirements-r2 (or main when ready)"
}
Step "run_production_smoke = false until smoke secrets exist"
Pause-Wizard "After you start the workflow (or decide to skip), press Enter"

$dispatched = $false
if ((Test-GhReady) -and (Confirm-Wizard "Dispatch via gh now? (needs secrets already set)")) {
  $script:Captured["IMAGE_TAG"] = $defaultSha
  $tag = Ask-Value -Key "IMAGE_TAG" -Prompt "image_tag SHA"
  if (-not $tag -and $defaultSha) { $tag = $defaultSha }
  if ($tag) {
    & gh workflow run deploy.yml `
      --repo $script:REPO `
      -f "confirm_environment=private-beta" `
      -f "image_tag=$tag" `
      -f "run_production_smoke=false"
    if ($LASTEXITCODE -eq 0) {
      Write-Host "  OK workflow_dispatch sent" -ForegroundColor Green
      $dispatched = $true
      Open-Url "https://github.com/$($script:REPO)/actions"
    } else {
      Warn-Wizard "gh workflow run failed - use the Actions UI"
    }
  }
}

if ($dispatched -or (Confirm-Wizard "Deploy workflow started (or already green)?")) {
  Mark-Check "deploy" "Done" "workflow_dispatch Deploy private beta"
} else {
  Mark-Check "deploy" "Blocked" "workflow_dispatch Deploy private beta"
}

# -- 6. curl health / ready ------------------------------------------------
Enter-Stage "Prove live HTTPS (health + ready)"
Say "Both must return HTTP 200. Do not claim success without that."
$base = $null
if ($script:Captured.ContainsKey("BASE_URL")) {
  $base = $script:Captured["BASE_URL"]
}
if (-not $base) {
  $base = Ask-Value -Key "BASE_URL" -Prompt "BASE_URL for curl (https://...):"
  if ($base) {
    $base = $base.TrimEnd("/")
    $script:Captured["BASE_URL"] = $base
  }
}

$healthOk = $false
$readyOk = $false
if ($base) {
  Say "GET $base/api/health"
  Say "GET $base/api/ready"
  if (Confirm-Wizard "Run curl.exe now?") {
    try {
      & curl.exe -fsS "$base/api/health"
      if ($LASTEXITCODE -eq 0) {
        $healthOk = $true
        Write-Host "  OK health" -ForegroundColor Green
      } else {
        Warn-Wizard "health failed (exit $LASTEXITCODE)"
      }
    } catch {
      Warn-Wizard "health request error: $_"
    }
    try {
      & curl.exe -fsS "$base/api/ready"
      if ($LASTEXITCODE -eq 0) {
        $readyOk = $true
        Write-Host "  OK ready" -ForegroundColor Green
      } else {
        Warn-Wizard "ready failed (exit $LASTEXITCODE)"
      }
    } catch {
      Warn-Wizard "ready request error: $_"
    }
  } else {
    if (Confirm-Wizard "Did /api/health return 200?") { $healthOk = $true }
    if (Confirm-Wizard "Did /api/ready return 200?") { $readyOk = $true }
  }
} else {
  Warn-Wizard "No BASE_URL - cannot curl."
}

if ($healthOk) {
  Mark-Check "health" "Done" "curl BASE_URL/api/health -> 200"
} else {
  Mark-Check "health" "Blocked" "curl BASE_URL/api/health -> 200"
}
if ($readyOk) {
  Mark-Check "ready" "Done" "curl BASE_URL/api/ready -> 200"
} else {
  Mark-Check "ready" "Blocked" "curl BASE_URL/api/ready -> 200"
}

if (Confirm-Wizard "Browser opens the same host over HTTPS without cert warning?") {
  Mark-Check "https_browser" "Done" "Browser HTTPS without cert warning"
} else {
  Mark-Check "https_browser" "Blocked" "Browser HTTPS without cert warning"
}

# -- 7. Optional JPJO ------------------------------------------------------
Enter-Stage "Optional: book JPJO reviewer"
Say "Packet (human only - AI must not APPROVE):"
Note "  $packetRel"
if (Test-Path $packetPath) {
  if (Confirm-Wizard "Open the JPJO packet in the default editor?") {
    try { Invoke-Item $packetPath } catch { Note "Open manually: $packetPath" }
  }
} else {
  Warn-Wizard "Packet file not found at $packetPath"
}
Step "Calendar invite to an independent JPJO reviewer"
Step "Leave packet status honest (NOT_STARTED until human starts)"
Step "No PUBLISHED until packet + DEC-016 gates"

if (Confirm-Wizard "JPJO calendar booked (optional)?") {
  Mark-Check "jpjo" "Done" "JPJO calendar booked (packet still not PUBLISHED)"
} elseif (Confirm-Wizard "Skip JPJO for now?") {
  Mark-Check "jpjo" "Skipped" "JPJO calendar booked (optional)"
} else {
  Mark-Check "jpjo" "Blocked" "JPJO calendar booked (optional)"
}

# -- Finish: paste-back checklist ------------------------------------------
Clear-WizardScreen
Write-Host ""
Write-Host "  Wizard finished - paste the block below back into chat" -ForegroundColor Green
Write-Host "  (names only - never paste secret values)" -ForegroundColor DarkGray
Write-Host ""

if ($script:WrittenSecrets.Count -gt 0) {
  Note ("GitHub secrets set this run: " + ($script:WrittenSecrets -join ", "))
}
if ($script:Skipped.Count -gt 0) {
  Warn-Wizard "Still to do by hand:"
  foreach ($s in $script:Skipped) { Note "  - $s" }
}

$shortSha = "unknown"
if ($defaultSha) {
  $len = [Math]::Min(7, $defaultSha.Length)
  $shortSha = $defaultSha.Substring(0, $len)
}

Write-Host ""
Write-Host "---------- PASTE FROM HERE ----------"
Write-Host "FOUNDER UNBLOCK - Done/Blocked ($((Get-Date).ToString('yyyy-MM-dd')))"
Write-Host "Branch/commit: docs/requirements-r2 @ $shortSha"
if ($script:Captured.ContainsKey("BASE_URL") -and $script:Captured["BASE_URL"]) {
  Write-Host "BASE_URL set: yes (value not pasted)"
} else {
  Write-Host "BASE_URL set: no"
}
Write-Host ""
foreach ($key in $script:Checklist.Keys) {
  $row = $script:Checklist[$key]
  $boxDone = if ($row.Status -eq "Done") { "[x]" } else { "[ ]" }
  $boxBlocked = if ($row.Status -eq "Blocked") { "[x]" } else { "[ ]" }
  $boxSkipped = if ($row.Status -eq "Skipped") { "[x]" } else { "[ ]" }
  Write-Host ("- {0}  Done {1}  Blocked {2}  Skipped {3}" -f $row.Label, $boxDone, $boxBlocked, $boxSkipped)
}
Write-Host ""
$extDone = ($script:Checklist["health"].Status -eq "Done") -and ($script:Checklist["ready"].Status -eq "Done")
if ($extDone) {
  Write-Host "Verdict: live health/ready Done - EXTERNAL HTTPS smoke unlocked (still not reference quality / not PUBLISHED)."
} else {
  Write-Host "Verdict: still EXTERNAL - health/ready not both Done. Local closed-beta only."
}
Write-Host "---------- PASTE TO HERE ----------"
Write-Host ""
Note "Also mark matching rows in docs/operations/external-unblock-wizard.md after curls succeed."
Write-Host ""

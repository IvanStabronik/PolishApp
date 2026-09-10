#!/usr/bin/env bash
#
# A wizard — walks a human through a manual procedure step by step.
# Prefer scripts/founder-unblock.ps1 on Windows.
#
# Primary path: Neon/Supabase Postgres + Vercel. Railway is legacy/optional.
# Do not invent secrets. Do not claim HTTPS without curl 200.

set -euo pipefail

# ──────────────────────────────────────────────────────────────────────────
# Wizard library
# ──────────────────────────────────────────────────────────────────────────

if [[ -t 1 ]] && command -v tput >/dev/null 2>&1 && [[ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]]; then
  BOLD=$(tput bold); DIM=$(tput dim); RESET=$(tput sgr0)
  BLUE=$(tput setaf 4); GREEN=$(tput setaf 2); YELLOW=$(tput setaf 3); RED=$(tput setaf 1)
else
  BOLD=""; DIM=""; RESET=""; BLUE=""; GREEN=""; YELLOW=""; RED=""
fi

TOTAL_STAGES=0
_STAGE_INDEX=0
ENV_FILE="${ENV_FILE:-.env}"
WRITTEN_ENV=()
WRITTEN_SECRET=()
SKIPPED=()

_clear() {
  [[ -t 1 ]] || return 0
  if command -v tput >/dev/null 2>&1; then tput clear; else printf '\033[2J\033[3J\033[H'; fi
}

banner() {
  _clear
  printf '\n%s%s  %s%s\n' "$BOLD" "$BLUE" "$1" "$RESET"
  printf '%s  %s stages%s\n\n' "$DIM" "$TOTAL_STAGES" "$RESET"
  printf '%s  You drive the browser; this wizard tells you exactly what to do and\n' "$DIM"
  printf '  captures the values you copy back. Stop any time with Ctrl-C and re-run\n'
  printf '  later — it remembers values already saved.%s\n' "$RESET"
  pause "Ready to start?"
}

stage() {
  _clear
  _STAGE_INDEX=$((_STAGE_INDEX + 1))
  printf '\n%s%s▸ Stage %s/%s · %s%s\n' \
    "$BOLD" "$BLUE" "$_STAGE_INDEX" "$TOTAL_STAGES" "$1" "$RESET"
}

say()  { printf '  %s\n' "$1"; }
step() { printf '  %s•%s %s\n' "$BLUE" "$RESET" "$1"; }
note() { printf '  %s%s%s\n' "$DIM" "$1" "$RESET"; }
warn() { printf '  %s⚠ %s%s\n' "$YELLOW" "$1" "$RESET"; }

open_url() {
  local url="$1"
  printf '  %s↗ opening%s %s\n' "$GREEN" "$RESET" "$url"
  { if   command -v wslview     >/dev/null 2>&1; then wslview "$url"
    elif command -v explorer.exe >/dev/null 2>&1; then explorer.exe "$url"
    elif command -v xdg-open    >/dev/null 2>&1; then xdg-open "$url"
    elif command -v open        >/dev/null 2>&1; then open "$url"
    else warn "couldn't open a browser — visit it manually: $url"; fi
  } >/dev/null 2>&1 || warn "couldn't open a browser — visit it manually: $url"
}

pause() {
  printf '  %s%s%s ' "$DIM" "${1:-Press Enter to continue}" "$RESET"
  read -r _ || true
}

confirm() {
  local reply=""
  printf '  %s? %s [y/N] ' "$YELLOW" "$1"
  read -r reply || true
  [[ "$reply" =~ ^[Yy] ]]
}

_existing() {
  [[ -f "$ENV_FILE" ]] || return 1
  local line; line=$(grep -E "^${1}=" "$ENV_FILE" | tail -n1) || return 1
  printf '%s' "${line#*=}"
}

ask() {
  local key="$1" prompt="$2" current input
  current=$(_existing "$key" || true)
  if [[ -n "$current" ]]; then
    printf '  %s%s%s %s[Enter keeps current]%s ' "$BOLD" "$prompt" "$RESET" "$DIM" "$RESET"
  else
    printf '  %s%s%s ' "$BOLD" "$prompt" "$RESET"
  fi
  read -r input || true
  [[ -z "$input" && -n "$current" ]] && input="$current"
  printf -v "$key" '%s' "$input"
}

ask_secret() {
  local key="$1" prompt="$2" current input
  current=$(_existing "$key" || true)
  if [[ -n "$current" ]]; then
    printf '  %s%s%s %s[Enter keeps current]%s ' "$BOLD" "$prompt" "$RESET" "$DIM" "$RESET"
  else
    printf '  %s%s%s ' "$BOLD" "$prompt" "$RESET"
  fi
  read -rs input || true
  printf '\n'
  [[ -z "$input" && -n "$current" ]] && input="$current"
  printf -v "$key" '%s' "$input"
}

write_env() {
  local key="$1" value="$2" tmp
  touch "$ENV_FILE"
  tmp=$(mktemp)
  grep -vE "^${key}=" "$ENV_FILE" > "$tmp" || true
  printf '%s=%s\n' "$key" "$value" >> "$tmp"
  mv "$tmp" "$ENV_FILE"
  WRITTEN_ENV+=("$key")
  printf '  %s✓ wrote%s %s → %s\n' "$GREEN" "$RESET" "$key" "$ENV_FILE"
}

set_env_secret() {
  local name="$1" value="$2"
  if [[ -z "$value" ]]; then
    warn "empty $name — Blocked"
    SKIPPED+=("GitHub Environment secret $name (empty)")
    return 1
  fi
  if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
    if printf '%s' "$value" | gh secret set "$name" --env "$ENV_NAME" --repo "$REPO" >/dev/null 2>&1; then
      WRITTEN_SECRET+=("$name")
      printf '  %s✓ set%s Environment secret %s (%s)\n' "$GREEN" "$RESET" "$name" "$ENV_NAME"
      return 0
    fi
  fi
  SKIPPED+=("GitHub Environment secret $name (set manually: gh secret set $name --env $ENV_NAME)")
  warn "skipped $name — gh not ready or set failed; use GitHub UI"
  return 1
}

mark() {
  CHECKLIST+=("$1|$2|$3")
}

print_pasteback() {
  _clear
  printf '\n%s%s  ✓ Wizard finished — paste the block below back into chat%s\n' "$BOLD" "$GREEN" "$RESET"
  note "(names only — never paste secret values)"
  (( ${#WRITTEN_SECRET[@]} )) && note "GitHub secrets set this run: ${WRITTEN_SECRET[*]}"
  if (( ${#SKIPPED[@]} )); then
    printf '\n'; warn "still to do by hand:"
    for s in "${SKIPPED[@]}"; do note "  - $s"; done
  fi
  local short="${DEFAULT_SHA:0:7}"
  [[ -z "$short" ]] && short="unknown"
  printf '\n---------- PASTE FROM HERE ----------\n'
  printf 'FOUNDER UNBLOCK — Done/Blocked (%s)\n' "$(date +%Y-%m-%d)"
  printf 'Branch/commit: docs/requirements-r2 @ %s\n' "$short"
  printf 'Primary path: Vercel + Neon/Supabase\n'
  if [[ -n "${BASE_URL:-}" ]]; then
    printf 'BASE_URL set: yes (value not pasted)\n\n'
  else
    printf 'BASE_URL set: no\n\n'
  fi
  local row id status label done blocked skipped rest
  for row in "${CHECKLIST[@]}"; do
    id="${row%%|*}"; rest="${row#*|}"
    status="${rest%%|*}"; label="${rest#*|}"
    done="[ ]"; blocked="[ ]"; skipped="[ ]"
    case "$status" in
      Done) done="[x]" ;;
      Blocked) blocked="[x]" ;;
      Skipped) skipped="[x]" ;;
    esac
    printf -- '- %s  Done %s  Blocked %s  Skipped %s\n' "$label" "$done" "$blocked" "$skipped"
  done
  printf '\n'
  local health_done=0 ready_done=0
  for row in "${CHECKLIST[@]}"; do
    [[ "$row" == health\|Done\|* ]] && health_done=1
    [[ "$row" == ready\|Done\|* ]] && ready_done=1
  done
  if (( health_done && ready_done )); then
    printf 'Verdict: live health/ready Done — EXTERNAL HTTPS smoke unlocked (still not reference quality / not PUBLISHED).\n'
  else
    printf 'Verdict: still EXTERNAL — health/ready not both Done. Local closed-beta only.\n'
  fi
  printf '---------- PASTE TO HERE ----------\n\n'
  note "Also mark matching rows in docs/operations/external-unblock-wizard.md after curls succeed."
}

# ──────────────────────────────────────────────────────────────────────────
# STAGES
# ──────────────────────────────────────────────────────────────────────────

REPO="IvanStabronik/PolishApp"
ENV_NAME="private-beta"
ENV_FILE="${FOUNDER_UNBLOCK_ENV:-$HOME/.slowarium-founder-unblock.env}"
CHECKLIST=()
DEFAULT_SHA="$(git -C "$(dirname "$0")/.." rev-parse HEAD 2>/dev/null || true)"

TOTAL_STAGES=8

banner "SŁOWARIUM founder unblock (EXTERNAL) — Vercel + Neon/Supabase"

# ── 1. Postgres ───────────────────────────────────────────────────────────
stage "Neon (preferred) or Supabase Postgres"
say "Create managed Postgres. Do not invent DATABASE_URL — copy it from the console."
open_url "https://console.neon.tech"
step "Neon: New Project → copy pooled + direct connection strings."
step "Supabase (alt): New project → Settings → Database → URI."
step "Pooled → Vercel DATABASE_URL; Direct → pnpm db:migrate."
pause "When you have DATABASE_URL, press Enter"
ask_secret DATABASE_URL "Paste DATABASE_URL (app/pooled OK):"
if [[ -n "${DATABASE_URL:-}" ]]; then
  write_env DATABASE_URL "$DATABASE_URL"
  mark postgres_db Done "Neon/Supabase Postgres / DATABASE_URL"
else
  mark postgres_db Blocked "Neon/Supabase Postgres / DATABASE_URL"
fi
if confirm "Postgres project created (Neon or Supabase)?"; then
  mark postgres_project Done "Postgres project created"
else
  mark postgres_project Blocked "Postgres project created"
fi

# ── 2. Vercel ─────────────────────────────────────────────────────────────
stage "Vercel project linked to PolishApp"
say "Import the GitHub repo. Prefer root vercel.json (Root Directory empty)."
open_url "https://vercel.com/new"
step "Import IvanStabronik/PolishApp."
step "Root Directory empty (root vercel.json) OR web (content via next.config tracing)."
step "Deploy once; copy https://….vercel.app → BASE_URL."
pause "When Vercel project exists and you have the public URL, press Enter"
if confirm "Vercel project linked and first deploy started?"; then
  mark vercel_project Done "Vercel project linked to PolishApp"
else
  mark vercel_project Blocked "Vercel project linked to PolishApp"
fi
ask BASE_URL "Paste BASE_URL (https://… no trailing slash):"
BASE_URL="${BASE_URL%/}"
if [[ -n "${BASE_URL:-}" ]]; then
  write_env BASE_URL "$BASE_URL"
  mark base_url Done "BASE_URL captured"
else
  mark base_url Blocked "BASE_URL captured"
fi

# ── 3. Vercel env ─────────────────────────────────────────────────────────
stage "Vercel Environment Variables + closed-beta flags"
say "On Vercel → Settings → Environment Variables (Production), set:"
step "BETA_MODE=true"
step "BETA_ALLOW_DRAFT=true"
step "DEMO_MODE=false"
step "DEMO_PREVIEW=false"
say ""
say "Generate three secrets (do not invent in chat):"
note "  cd web && pnpm ops:generate-secret   # ×3"
say "Also set NODE_ENV, DATABASE_URL, public URL trio from web/.env.production.example."
step "Redeploy after saving env vars."
open_url "https://vercel.com"
pause "When Vercel env vars + closed-beta flags are set, press Enter"
if confirm "BETA_ALLOW_DRAFT=true and DEMO_*=false set on Vercel?"; then
  mark beta_flags Done "BETA_ALLOW_DRAFT=true, DEMO_*=false on Vercel"
else
  mark beta_flags Blocked "BETA_ALLOW_DRAFT=true, DEMO_*=false on Vercel"
fi
if confirm "Auth secrets + DATABASE_URL + public URL trio set on Vercel?"; then
  mark vercel_env Done "Vercel production env vars set"
else
  mark vercel_env Blocked "Vercel production env vars set"
fi

# ── 4. Migrate ────────────────────────────────────────────────────────────
stage "Run migrations (one-off against Neon/Supabase)"
say "Migrations are NOT run by Vercel app start. Use DIRECT DB URL if pooler fails."
note "  cd web && DATABASE_URL='<direct>' pnpm db:migrate"
pause "After you run migrate (or skip), press Enter"
if confirm "pnpm db:migrate succeeded against Neon/Supabase?"; then
  mark migrate Done "pnpm db:migrate against Neon/Supabase"
else
  mark migrate Blocked "pnpm db:migrate against Neon/Supabase"
fi

# ── 5. Optional GitHub secrets ────────────────────────────────────────────
stage "Optional: GitHub Environment private-beta secrets"
say "App secrets live primarily on Vercel. GitHub secrets only for Actions deploy.yml."
open_url "https://github.com/$REPO/settings/environments"
if ! confirm "Set GitHub Environment secrets for workflow_dispatch? (N = skip)"; then
  mark gh_env Skipped "GitHub Environment private-beta secrets (optional)"
  mark gh_secrets Skipped "Optional GitHub deploy secrets"
else
  pause "When Environment private-beta exists, press Enter"
  if confirm "Environment private-beta exists?"; then
    mark gh_env Done "GitHub Environment private-beta created"
  else
    mark gh_env Blocked "GitHub Environment private-beta created"
  fi

  prompt_secret() {
    local name="$1" hint="$2" prefill="${3:-}"
    say "── $name ──"
    note "$hint"
    if [[ -n "$prefill" ]]; then
      printf -v "$name" '%s' "$prefill"
      ask_secret "$name" "Paste $name (Enter keeps captured):"
    else
      ask_secret "$name" "Paste $name (empty = skip/Blocked):"
    fi
    local val="${!name:-}"
    if [[ -z "$val" ]]; then
      mark "secret_$name" Blocked "Environment secret $name"
      return
    fi
    if [[ "$name" == "BASE_URL" ]]; then
      val="${val%/}"
      BASE_URL="$val"
      write_env BASE_URL "$val"
    fi
    if set_env_secret "$name" "$val"; then
      mark "secret_$name" Done "Environment secret $name"
    elif confirm "Did you set $name manually in the GitHub Environment UI?"; then
      mark "secret_$name" Done "Environment secret $name"
    else
      mark "secret_$name" Blocked "Environment secret $name"
    fi
  }

  prompt_secret DATABASE_URL "Neon/Supabase URL (direct preferred for migrate job)" "${DATABASE_URL:-}"
  prompt_secret BETTER_AUTH_SECRET "same as Vercel (pnpm ops:generate-secret)"
  prompt_secret BASE_URL "public https:// host, no trailing slash" "${BASE_URL:-}"
  prompt_secret VERCEL_DEPLOY_HOOK_URL "Vercel Deploy Hook (preferred transport)"

  say "Optional CLI trio (empty if using Deploy Hook):"
  for opt in VERCEL_TOKEN VERCEL_ORG_ID VERCEL_PROJECT_ID; do
    ask_secret "$opt" "Paste $opt (optional, empty=skip):"
    val="${!opt:-}"
    if [[ -z "$val" ]]; then
      mark "secret_$opt" Skipped "Optional Environment secret $opt"
    elif set_env_secret "$opt" "$val"; then
      mark "secret_$opt" Done "Optional Environment secret $opt"
    else
      mark "secret_$opt" Blocked "Optional Environment secret $opt"
    fi
  done

  say "Optional smoke secrets (empty = skip):"
  for opt in PROD_SMOKE_ADMIN_EMAIL PROD_SMOKE_ADMIN_PASSWORD; do
    ask_secret "$opt" "Paste $opt (optional, empty=skip):"
    val="${!opt:-}"
    if [[ -z "$val" ]]; then
      mark "secret_$opt" Skipped "Optional Environment secret $opt"
    elif set_env_secret "$opt" "$val"; then
      mark "secret_$opt" Done "Optional Environment secret $opt"
    else
      mark "secret_$opt" Blocked "Optional Environment secret $opt"
    fi
  done
  mark gh_secrets Done "Optional GitHub deploy secrets prompted"
fi

# ── 6. Optional workflow_dispatch ─────────────────────────────────────────
stage "Optional: Dispatch Deploy private beta"
say "Usually unnecessary if Vercel Git auto-deploys. Skip unless GH secrets set."
open_url "https://github.com/$REPO/actions/workflows/deploy.yml"
if ! confirm "Run workflow_dispatch Deploy private beta now?"; then
  mark deploy Skipped "workflow_dispatch Deploy private beta (optional)"
else
  if [[ -n "$DEFAULT_SHA" ]]; then
    step "image_tag = $DEFAULT_SHA"
  else
    step "image_tag = current commit SHA on docs/requirements-r2"
  fi
  step "run_production_smoke = false until smoke secrets exist"
  pause "After you start the workflow (or skip), press Enter"
  dispatched=0
  if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1 && confirm "Dispatch via gh now?"; then
    ask IMAGE_TAG "image_tag SHA"
    IMAGE_TAG="${IMAGE_TAG:-$DEFAULT_SHA}"
    if [[ -n "$IMAGE_TAG" ]] && gh workflow run deploy.yml --repo "$REPO" \
        -f confirm_environment=private-beta \
        -f image_tag="$IMAGE_TAG" \
        -f run_production_smoke=false; then
      say "✓ workflow_dispatch sent"
      dispatched=1
      open_url "https://github.com/$REPO/actions"
    else
      warn "gh workflow run failed — use the Actions UI"
    fi
  fi
  if (( dispatched )) || confirm "Deploy workflow started (or already green)?"; then
    mark deploy Done "workflow_dispatch Deploy private beta"
  else
    mark deploy Blocked "workflow_dispatch Deploy private beta"
  fi
fi

# ── 7. health / ready ─────────────────────────────────────────────────────
stage "Prove live HTTPS (health + ready)"
say "Both must return HTTP 200. Do not claim success without that."
if [[ -z "${BASE_URL:-}" ]]; then
  ask BASE_URL "BASE_URL for curl (https://…):"
  BASE_URL="${BASE_URL%/}"
fi
health_ok=0
ready_ok=0
if [[ -n "${BASE_URL:-}" ]]; then
  say "GET $BASE_URL/api/health"
  say "GET $BASE_URL/api/ready"
  if confirm "Run curl now?"; then
    if curl -fsS "$BASE_URL/api/health"; then health_ok=1; printf '\n  %shealth OK%s\n' "$GREEN" "$RESET"; else warn "health failed"; fi
    if curl -fsS "$BASE_URL/api/ready"; then ready_ok=1; printf '\n  %sready OK%s\n' "$GREEN" "$RESET"; else warn "ready failed"; fi
  else
    confirm "Did /api/health return 200?" && health_ok=1
    confirm "Did /api/ready return 200?" && ready_ok=1
  fi
else
  warn "No BASE_URL — cannot curl."
fi
(( health_ok )) && mark health Done 'curl $BASE_URL/api/health → 200' || mark health Blocked 'curl $BASE_URL/api/health → 200'
(( ready_ok )) && mark ready Done 'curl $BASE_URL/api/ready → 200' || mark ready Blocked 'curl $BASE_URL/api/ready → 200'
if confirm "Browser opens the same host over HTTPS without cert warning?"; then
  mark https_browser Done "Browser HTTPS without cert warning"
else
  mark https_browser Blocked "Browser HTTPS without cert warning"
fi

# ── 8. Optional JPJO ──────────────────────────────────────────────────────
stage "Optional: book JPJO reviewer"
say "Packet (human only — AI must not APPROVE):"
note "  docs/reviews/pierwsze-spotkanie-jpjo-hall-packet.md"
step "Calendar invite to an independent JPJO reviewer"
step "Leave packet status honest (NOT_STARTED until human starts)"
step "No PUBLISHED until packet + DEC-016 gates"
if confirm "JPJO calendar booked (optional)?"; then
  mark jpjo Done "JPJO calendar booked (packet still not PUBLISHED)"
elif confirm "Skip JPJO for now?"; then
  mark jpjo Skipped "JPJO calendar booked (optional)"
else
  mark jpjo Blocked "JPJO calendar booked (optional)"
fi

print_pasteback

#!/usr/bin/env bash
# Create the first closed-beta admin against a DIRECT DATABASE_URL (DEMO_MODE=false).
# Never sets DEMO_MODE=true. Never invents URLs or passwords.
#
# Usage:
#   bash scripts/bootstrap-first-admin.sh --database-url 'postgresql://…' \
#     --email 'you@example.com' --password '…' [--name 'Founder Admin']

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATABASE_URL_ARG=""
EMAIL=""
PASSWORD=""
NAME="Founder Admin"

fail() { echo ""; echo "  [FAIL] $*" >&2; echo ""; exit 1; }
ok() { echo "  [OK]  $*"; }
note() { echo "  [..]  $*"; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    --database-url|-d)
      DATABASE_URL_ARG="${2:-}"
      shift 2
      ;;
    --email|-e)
      EMAIL="${2:-}"
      shift 2
      ;;
    --password|-p)
      PASSWORD="${2:-}"
      shift 2
      ;;
    --name|-n)
      NAME="${2:-}"
      shift 2
      ;;
    -h|--help)
      echo "Usage: bash scripts/bootstrap-first-admin.sh --database-url '…' --email '…' --password '…' [--name '…']"
      exit 0
      ;;
    *)
      fail "Unknown arg: $1"
      ;;
  esac
done

echo ""
echo "  SLOWARIUM - Bootstrap first admin (no DEMO_MODE)"
echo "  Repo: $REPO_ROOT"
echo "  Never sets DEMO_MODE=true. Never invents URLs or passwords."
echo ""

DATABASE_URL_ARG="$(echo -n "$DATABASE_URL_ARG" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
if [[ -z "$DATABASE_URL_ARG" ]]; then
  fail "Database URL is empty. Paste the Neon DIRECT connection string."
fi
if echo "$DATABASE_URL_ARG" | grep -Eqi 'YOUR_|changeme|example\.com'; then
  fail "Database URL looks like a placeholder."
fi
if [[ -z "$EMAIL" || "$EMAIL" != *"@"* ]]; then
  fail "Email is required."
fi
if echo "$EMAIL" | grep -Eqi '@demo\.slowarium\.local$'; then
  fail "Refuse demo.slowarium.local emails — DEMO_MODE seed only."
fi
if [[ ${#PASSWORD} -lt 8 ]]; then
  fail "Password must be at least 8 characters."
fi

if [[ "${DEMO_MODE:-}" == "true" || "${DEMO_MODE:-}" == "1" ]]; then
  fail "Refuse: DEMO_MODE is true in this shell. Unset it and keep Vercel DEMO_MODE=false."
fi
if [[ "${ALLOW_PRODUCTION_DEMO:-}" == "true" || "${ALLOW_PRODUCTION_DEMO:-}" == "1" ]]; then
  fail "Refuse: ALLOW_PRODUCTION_DEMO is set."
fi

PREV_DB="${DATABASE_URL:-}"
PREV_DEMO="${DEMO_MODE:-}"
export DATABASE_URL="$DATABASE_URL_ARG"
export DEMO_MODE=false
unset ALLOW_PRODUCTION_DEMO || true

note "DATABASE_URL set for one shot; DEMO_MODE=false in-process."
(
  cd "$REPO_ROOT"
  pnpm --dir web db:bootstrap-admin -- --email "$EMAIL" --password "$PASSWORD" --name "$NAME"
)
ok "First admin ready. Sign in on live host → /{locale}/admin/beta → create invite."
note "Do NOT set DEMO_MODE=true on Vercel."

if [[ -z "$PREV_DB" ]]; then unset DATABASE_URL || true; else export DATABASE_URL="$PREV_DB"; fi
if [[ -z "$PREV_DEMO" ]]; then unset DEMO_MODE || true; else export DEMO_MODE="$PREV_DEMO"; fi

echo ""

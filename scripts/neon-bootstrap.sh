#!/usr/bin/env bash
# Post-Neon-Create bootstrap — migrate against the DIRECT URL, print Vercel next steps.
# Never invents connection strings. Never enables DEMO_MODE. Does not claim live HTTPS.
#
# Usage:
#   bash scripts/neon-bootstrap.sh --direct-url 'postgresql://…'
#   bash scripts/neon-bootstrap.sh --direct-url 'postgresql://…' --pooled-url 'postgresql://…-pooler…'

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="$REPO_ROOT/web"
DIRECT_URL=""
POOLED_URL=""

fail() { echo ""; echo "  [FAIL] $*" >&2; echo ""; exit 1; }
ok() { echo "  [OK]  $*"; }
note() { echo "  [..]  $*"; }
section() { echo ""; echo "  * $*"; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    --direct-url|-d)
      DIRECT_URL="${2:-}"
      shift 2
      ;;
    --pooled-url|-p)
      POOLED_URL="${2:-}"
      shift 2
      ;;
    -h|--help)
      echo "Usage: bash scripts/neon-bootstrap.sh --direct-url 'postgresql://…' [--pooled-url 'postgresql://…-pooler…']"
      exit 0
      ;;
    *)
      fail "Unknown arg: $1"
      ;;
  esac
done

echo ""
echo "  SLOWARIUM - Neon bootstrap (migrate + next steps)"
echo "  Repo: $REPO_ROOT"
echo "  Never invents URLs. Never enables DEMO_MODE. Does not claim HTTPS."
echo ""

DIRECT_URL="$(echo -n "$DIRECT_URL" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
if [[ -z "$DIRECT_URL" ]]; then
  fail "DirectUrl is empty. Paste the Neon DIRECT connection string (no pooler)."
fi
if echo "$DIRECT_URL" | grep -Eqi 'YOUR_|changeme|example\.com|localhost|127\.0\.0\.1'; then
  fail "DirectUrl looks like a placeholder or local URL. Use the real Neon DIRECT string."
fi

section "Migrate (direct URL)"
note "Using DIRECT URL for pnpm db:migrate (advisory lock)."
if [[ -n "$POOLED_URL" ]]; then
  note "Pooled URL captured for Vercel docs only (not used for migrate)."
fi

export DATABASE_URL="$DIRECT_URL"
(
  cd "$REPO_ROOT"
  echo "  -> pnpm --dir web db:migrate"
  pnpm --dir web db:migrate
)
unset DATABASE_URL
ok "db:migrate completed"

section "Next: Vercel env + redeploy"
if [[ -n "$POOLED_URL" ]]; then
  APP_DB_HINT="<Neon POOLED URL you passed as --pooled-url>"
else
  APP_DB_HINT="<Neon POOLED URL (…-pooler…) — preferred for app>"
fi
echo ""
echo "  1) Vercel → Project → Settings → Environment Variables (Production):"
echo "     DATABASE_URL=$APP_DB_HINT"
echo "     BETTER_AUTH_SECRET / INVITE_TOKEN_PEPPER / PRIVACY_AUDIT_SECRET  (pnpm ops:generate-secret x3)"
echo "     BETTER_AUTH_URL / NEXT_PUBLIC_APP_URL / APP_URL = https://<your>.vercel.app"
echo "     BETA_MODE=true"
echo "     BETA_ALLOW_DRAFT=true"
echo "     DEMO_MODE=false"
echo "     DEMO_PREVIEW=false"
echo "  2) Redeploy (Deployments → … → Redeploy, or push / Deploy Hook)."
echo "  3) Prove HTTPS (no fake claims):"
echo '     BASE_URL="https://YOUR_PROJECT.vercel.app"   # no trailing slash'
echo '     curl -fsS "$BASE_URL/api/health"'
echo '     curl -fsS "$BASE_URL/api/ready"'
echo ""

section "First admin / invite-first (no DEMO_MODE on Vercel)"
note "Prefer invite-first after a one-shot staff seed. Do NOT set DEMO_MODE=true on Vercel."
echo ""
echo "  There is no separate non-demo admin CLI. First staff user comes from db:seed"
echo "  gated by FORCE_SEED (not DEMO_MODE). One-shot from this machine only:"
echo ""
echo "    cd $WEB_DIR"
echo '    export DATABASE_URL="<same DIRECT URL>"'
echo '    export FORCE_SEED=true'
echo "    # Keep DEMO_MODE unset/false — FORCE_SEED alone opens the seed gate."
echo "    pnpm db:seed"
echo "    unset FORCE_SEED DATABASE_URL"
echo ""
echo "  Then on live HTTPS (DEMO_MODE=false, BETA_ALLOW_DRAFT=true):"
echo "    - Sign in as seeded admin (see DEMO_ACCOUNTS.admin in web/src/modules/auth/demo.ts)"
echo "    - Open /{locale}/admin/beta → create invite → share /{locale}/invite/{token}"
echo "    - Invitee registers → onboard → one DRAFT lesson attempt"
echo "  Change the seeded admin password immediately (settings / change-password)."
echo ""

section "Done"
ok "Schema migrated. Finish Vercel env + redeploy + curl health/ready before claiming HTTPS."
note "Docs: docs/operations/FOUNDER-UNBLOCK-NOW.md"
echo ""

#!/usr/bin/env bash
# Builds the site locally (production env) and deploys the standalone
# output to the VPS. Building happens locally because the VPS is low on
# free RAM/swap — running `next build` there risks an OOM.
#
# Usage: scripts/deploy.sh

set -euo pipefail

VPS_HOST="root@161.97.139.109"
VPS_KEY="$HOME/.ssh/safe_road_deploy"
VPS_DIR="/var/www/site_user/data/www/safe-road.biz"
SITE_URL="https://safe-road.biz"
API_URL="https://roads.1ua.com.ua:3000"

cd "$(dirname "$0")/.."

echo "==> Building (production env)"
rm -rf .next .deploy .deploy.tar.gz
NEXT_PUBLIC_SITE_URL="$SITE_URL" NEXT_PUBLIC_API_URL="$API_URL" npm run build

echo "==> Packaging standalone output"
mkdir -p .deploy
cp -r .next/standalone/. .deploy/
mkdir -p .deploy/.next
cp -r .next/static .deploy/.next/static
cp -r public .deploy/public
tar czf .deploy.tar.gz -C .deploy .

echo "==> Uploading"
scp -i "$VPS_KEY" .deploy.tar.gz "$VPS_HOST:/tmp/safe-road-deploy.tar.gz"

echo "==> Extracting and restarting on VPS"
ssh -i "$VPS_KEY" "$VPS_HOST" bash -s <<EOF
set -e
cd "$VPS_DIR"
tar xzf /tmp/safe-road-deploy.tar.gz
rm -f /tmp/safe-road-deploy.tar.gz
pm2 restart safe-road-web --update-env
EOF

echo "==> Cleaning up local artifacts"
rm -rf .deploy .deploy.tar.gz

echo "==> Done. Verifying:"
curl -s -o /dev/null -w "HTTP: %{http_code}\n" "$SITE_URL/uk"

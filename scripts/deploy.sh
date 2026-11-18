#!/usr/bin/env bash
# parthdev.in deploy — pull, build, restart.
#
# Deliberately NOT a standalone build (see /etc/systemd/system/parthdev.service):
# `next start` runs from this directory so the CMS keeps writing to
# data/db_fallback.json here.
#
# THE ONE THING THIS SCRIPT EXISTS FOR: data/db_fallback.json is git-tracked AND
# is the live CMS database. Every admin edit dirties the working tree, so a plain
# `git pull` either refuses to run or discards real content. We snapshot it,
# pull with the file reset, then put the live copy back.
set -euo pipefail
cd "$(dirname "$0")/.."

STAMP=$(date +%Y%m%d-%H%M%S)
DATA=data/db_fallback.json
mkdir -p backups

echo "==> backing up live CMS data -> backups/db_fallback-$STAMP.json"
cp "$DATA" "backups/db_fallback-$STAMP.json"
ls -1t backups/db_fallback-*.json | tail -n +21 | xargs -r rm --   # keep 20

echo "==> pulling"
git checkout -- "$DATA" 2>/dev/null || true
git pull --ff-only

echo "==> restoring live CMS data (upstream's copy is a build-time seed, not the DB)"
cp "backups/db_fallback-$STAMP.json" "$DATA"

echo "==> installing deps"
npm ci

echo "==> building"
npm run build

echo "==> restarting"
systemctl restart parthdev
sleep 4
systemctl is-active --quiet parthdev || { journalctl -u parthdev -n 30 --no-pager; exit 1; }

code=$(curl -s -o /dev/null -w '%{http_code}' -m 20 http://127.0.0.1:3700/)
echo "==> local healthcheck: $code"
[ "$code" = "200" ] || exit 1
echo "==> deployed."

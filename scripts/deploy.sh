#!/bin/sh
# Build the site with the Supabase values from .env.local and publish dist/
# to the gh-pages branch (served at https://romainbarrau.github.io/romainbarrau-site/).
set -e
cd "$(dirname "$0")/.."
npm run build
cp dist/index.html dist/404.html   # SPA fallback for deep links
touch dist/.nojekyll
REMOTE=$(git remote get-url origin)
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name || echo deploy)" -c user.email="$(git -C .. config user.email || echo deploy@localhost)" \
  commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
# Use the gh account (romainbarrau) rather than the macOS keychain login
git -c credential.helper= -c credential.helper='!gh auth git-credential' push -q -f "$REMOTE" gh-pages
rm -rf .git
echo "Publié : https://romainbarrau.github.io/romainbarrau-site/"

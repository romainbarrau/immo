# Romain Barrau — Real Estate

Site vitrine de Romain Barrau, conseiller immobilier à Lisbonne et Bordeaux.

En ligne : https://romainbarrau.github.io/romainbarrau-site/

## Stack
Vite + React 18 + TypeScript + Tailwind + shadcn/ui + React Router + Supabase.

## Développement
```sh
npm install
npm run dev   # http://localhost:8080
```
Les variables Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`,
`VITE_SUPABASE_PROJECT_ID`) vont dans `.env.local` (non versionné).

## Déploiement
```sh
npm run deploy
```
Construit le site avec les valeurs de `.env.local` et publie `dist/` sur la
branche `gh-pages`, servie par GitHub Pages.

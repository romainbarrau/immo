# Romain Barrau — Real Estate

Site vitrine de Romain Barrau, conseiller immobilier à Lisbonne et Bordeaux.

En ligne : https://pierrestang.github.io/romainbarrau-site/

## Stack
Vite + React 18 + TypeScript + Tailwind + shadcn/ui + React Router + Supabase.

## Développement
```sh
npm install
npm run dev   # http://localhost:8080
```
Les variables Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`,
`VITE_SUPABASE_PROJECT_ID`) vont dans `.env.local` (non versionné). En
production, elles sont lues depuis les variables du dépôt GitHub.

## Déploiement
Chaque push sur `main` construit le site et le publie sur GitHub Pages
(`.github/workflows/deploy.yml`).

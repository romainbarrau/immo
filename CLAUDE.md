# Site Romain Barrau — conseiller immobilier

## État
- Ce dépôt (`romainbarrau/romainbarrau-site`, public) reproduit à l'identique le
  site d'origine Lovable (commit `b750dca`), publié sur GitHub Pages :
  https://romainbarrau.github.io/romainbarrau-site/.
- Seules adaptations : sous-chemin `/romainbarrau-site/` (`base` Vite,
  `basename` du routeur, liens `window.location.href`), `404.html` de repli,
  script `npm run deploy` (build local + push de `dist/` sur `gh-pages`).
- Ne pas modifier le design ni les textes sans demande explicite.

## Isolation
- Dépôts Lovable de Romain (`romainbarrau/realestate`,
  `romainbarrau1997-wq/romainbarrau`) : ne jamais y pousser (Lovable synchronise
  ces dépôts avec le site en ligne).
- Base Supabase : `ykwjqlehkvllkgdkenhr` (`.env.local`). La base Lovable de
  Romain (`fuuzkchponqcnuhrpkgv`) ne doit jamais recevoir d'écriture.
- Répondre en français, de façon concise.

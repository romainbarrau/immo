# Site Romain Barrau — conseiller immobilier

## État
- Ce dépôt (`romainbarrau/immo`, public) reproduit à l'identique le
  site d'origine Lovable (commit `b750dca`), publié sur GitHub Pages :
  https://romainbarrau.github.io/immo/.
- Seules adaptations : sous-chemin `/immo/` (`base` Vite,
  `basename` du routeur, liens `window.location.href`), `404.html` de repli,
  script `npm run deploy` (build local + push de `dist/` sur `gh-pages`).
- Correctifs : lien des cartes du carrousel (`/listings/:id`) ; edge function
  `contact-form` envoie les messages par e-mail via Resend (secrets Supabase
  `RESEND_API_KEY`, `CONTACT_TO_EMAIL` = romain.barrau@iadfrance.fr), déployée sur
  `ykwjqlehkvllkgdkenhr` avec `supabase functions deploy contact-form --no-verify-jwt`.
- Ne pas modifier le design ni les textes sans demande explicite.

## Isolation
- Dépôts Lovable de Romain (`romainbarrau/realestate`,
  `romainbarrau1997-wq/romainbarrau`) : ne jamais y pousser (Lovable synchronise
  ces dépôts avec le site en ligne).
- Base Supabase : `ykwjqlehkvllkgdkenhr` (`.env.local`). La base Lovable de
  Romain (`fuuzkchponqcnuhrpkgv`) ne doit jamais recevoir d'écriture.
- Répondre en français, de façon concise.

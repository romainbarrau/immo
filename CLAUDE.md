# Site Romain Barrau — conseiller immobilier

## Contexte
Site vitrine premium d'un conseiller immobilier indépendant. Stack : Vite +
React 18 + TypeScript + Tailwind + shadcn/ui + React Router + Supabase (edge
function `contact-form`). Bilingue FR/EN via
`src/contexts/LanguageContext.tsx` (fonction `t(key)`).
Objectif du site : inspirer confiance et générer des prises de contact
(formulaire, WhatsApp).

## Phase en cours : PHASE 1 — la forme
- Ne modifie AUCUN texte visible, aucune clé ni valeur de traduction, aucun
  avis, bien ou vidéo.
- Ne touche pas au positionnement (agence, ville, email). Phase 2 plus tard.
- Si un changement de structure exige un nouveau texte (ex. titre de
  section), utilise une clé de traduction existante ou ajoute une clé FR/EN
  avec un texte provisoire marqué `TODO-P2`.

## Direction artistique
- Thème clair, chaleureux, premium. Pas de mode sombre (supprimer le bloc
  `.dark`).
- Fond ivoire, texte bleu nuit, un seul accent bleu. Le bleu nuit profond est
  réservé au hero et au footer.
- Typographie : titres en `Instrument Serif` (italique autorisé pour un mot
  clé), corps en `DM Sans`. Chargement via Google Fonts avec `preconnect` +
  `display=swap`.
- Photos authentiques, jamais d'illustrations génériques.
- Micro-interactions subtiles (150–250 ms, easing `cubic-bezier(0.22, 1,
  0.36, 1)`). Aucune animation infinie. Toujours respecter `prefers-reduced-motion`.
- Deux rayons seulement : `--radius-sm` 0.5rem (boutons, inputs, badges) et
  `--radius-lg` 1.5rem (cartes, médias).
- Rythme vertical : sections `py-16 md:py-24`, jamais moins.

## Tokens (src/index.css, :root)
--background: 40 20% 97%;
--foreground: 215 40% 14%;
--card: 0 0% 100%;
--card-foreground: 215 40% 14%;
--primary: 215 60% 12%;
--primary-foreground: 40 20% 97%;
--accent: 215 45% 58%;
--accent-foreground: 0 0% 100%;
--secondary: 40 15% 93%;
--secondary-foreground: 215 40% 14%;
--muted: 40 15% 93%;
--muted-foreground: 215 15% 40%;
--border: 40 10% 85%;
--input: 40 10% 85%;
--ring: 215 45% 58%;
--hero: 215 60% 12%;
--hero-foreground: 40 20% 97%;
--radius-sm: 0.5rem;
--radius-lg: 1.5rem;

Supprimer : --sand, --ivory, les gradients beiges, les tokens `sidebar-*` de
tailwind.config.ts, les keyframes `float-1`, `float-2`, `rotate-border`
(définis en double).

## Règles UX
- Mobile-first, un seul CTA principal par écran.
- Contraste AA minimum (4.5:1 texte, 3:1 UI). Focus visible sur tout élément
  interactif.
- Navigation interne avec `<Link>` de react-router-dom, jamais
  `window.location.href`.
- Toute icône seule porte un `aria-label` ; tout label de formulaire porte
  `htmlFor`.
- Images : `loading="lazy"` sauf hero, `width`/`height` renseignés.

## Façon de travailler
- Avant toute modification multi-fichiers : proposer un plan court, attendre
  validation.
- Un commit par étape, message en anglais, préfixe `design:` / `nav:` /
  `a11y:`.
- Lancer `npm run build` avant de déclarer une étape terminée ; zéro erreur
  TypeScript.
- Répondre en français, de façon concise.

## Dépôt public et isolation du site Lovable
- Ce dépôt (`pierrestang/romainbarrau-site`, public) est la version retravaillée,
  publiée sur GitHub Pages : https://pierrestang.github.io/romainbarrau-site/.
  Chaque push sur `main` redéploie le site.
- Il est indépendant du dépôt Lovable de Romain (`romainbarrau1997-wq/romainbarrau`),
  qui reste intact : ne jamais y pousser (Lovable synchronise ce dépôt avec son
  site en ligne).
- Base Supabase : `ykwjqlehkvllkgdkenhr` (`.env.local` en local, variables du
  dépôt GitHub en production). La base Lovable de Romain
  (`fuuzkchponqcnuhrpkgv`) ne doit jamais recevoir d'écriture.

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Legal notice. Bracketed values are still to be filled in with Romain's details.
const SECTIONS: { title: string; paragraphs: string[] }[] = [
  {
    title: 'Éditeur du site',
    paragraphs: [
      'Romain Barrau, conseiller immobilier indépendant, agent commercial inscrit au RSAC de [ville] sous le numéro [RSAC].',
      'SIRET : [numéro]',
      'E-mail : romain.barrau@iadfrance.fr',
      'Téléphone : +33 6 69 11 93 36',
      'Directeur de la publication : Romain Barrau',
    ],
  },
  {
    title: 'Activité',
    paragraphs: [
      'Agent commercial mandataire indépendant du réseau IAD France, SAS au capital de [montant] €, siège social [adresse], RCS [ville] [numéro], titulaire de la carte professionnelle « Transactions sur immeubles et fonds de commerce » n° [CPI] délivrée par la CCI de [ville]. Garantie financière et assurance responsabilité civile professionnelle souscrites par IAD France auprès de [assureur]. Le conseiller ne reçoit ni ne détient de fonds pour le compte de ses clients.',
    ],
  },
  {
    title: 'Médiation',
    paragraphs: [
      'En cas de litige, le consommateur peut recourir gratuitement au médiateur de la consommation désigné par IAD France : [nom et coordonnées du médiateur].',
    ],
  },
  {
    title: 'Hébergement',
    paragraphs: ['Site hébergé par GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.'],
  },
  {
    title: 'Données personnelles',
    paragraphs: [
      "Ce site ne collecte aucune donnée personnelle et n'utilise pas de cookies de suivi. Les échanges initiés via WhatsApp, e-mail ou téléphone sont régis par les politiques de ces services. Les vidéos intégrées sont hébergées par YouTube, qui peut déposer ses propres cookies lors de la lecture. Conformément au RGPD, vous pouvez exercer vos droits d'accès, de rectification et de suppression en écrivant à romain.barrau@iadfrance.fr.",
    ],
  },
  {
    title: 'Propriété intellectuelle',
    paragraphs: [
      "L'ensemble des contenus de ce site (textes, photographies, vidéos) est la propriété de Romain Barrau, sauf mention contraire, et ne peut être reproduit sans autorisation.",
    ],
  },
];

const MentionsLegales = () => (
  <div className="min-h-screen">
    <Navigation />

    {/* same container as the home page sections */}
    <div className="px-4 md:px-8 lg:px-12">
      <div className="container mx-auto max-w-7xl py-20">
        <div className="max-w-prose">
          <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground mb-12">Mentions légales</h1>
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-display font-medium text-foreground mb-3">{section.title}</h2>
                <div className="space-y-1 font-sans text-base leading-relaxed text-[#6B665E]">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default MentionsLegales;

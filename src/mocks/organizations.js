export const organizationProvenanceOptions = [
  { value: 'PROFESSIONAL_NETWORK', label: 'Réseau professionnel' },
  { value: 'REFERRAL', label: 'Recommandation' },
  { value: 'DIRECT_CONTACT', label: 'Prise de contact directe' },
  { value: 'OUTBOUND_PROSPECTING', label: 'Prospection sortante' },
  { value: 'OTHER', label: 'Autre' },
]

export const organizationCollaborationOptions = [
  { value: 'PROSPECTING', label: 'Prospection' },
  { value: 'PROSPECT', label: 'Premier contact' },
  { value: 'ACTIVE', label: 'En collaboration' },
  { value: 'PAUSED', label: 'En pause' },
]

export const demoOrganizations = [
  {
    id: 'org-horizon',
    name: 'ESN fictive Horizon',
    types: ['ESN', 'PARTNER'],
    contacts: [{ id: 'contact-horizon-1', name: 'Contact Horizon (exemple)', role: 'Relation partenaires' }],
    provenance: 'PROFESSIONAL_NETWORK',
    provenanceDetail: '',
    collaborationStatus: 'ACTIVE',
    agreement: { status: 'ACTIVE', validUntil: '2027-06-30' },
    notes: [],
  },
  {
    id: 'org-atlas',
    name: 'Client direct fictif Atlas',
    types: ['CLIENT', 'PARTNER'],
    contacts: [{ id: 'contact-atlas-1', name: 'Contact Atlas (exemple)', role: 'Référent des besoins' }],
    provenance: 'DIRECT_CONTACT',
    provenanceDetail: '',
    collaborationStatus: 'ACTIVE',
    agreement: { status: 'NONE' },
    notes: [],
  },
  {
    id: 'org-latitude',
    name: 'ESN fictive Latitude',
    types: ['ESN'],
    contacts: [{ id: 'contact-latitude-1', name: 'Contact Latitude (exemple)', role: 'Interlocuteur missions' }],
    provenance: 'REFERRAL',
    provenanceDetail: '',
    collaborationStatus: 'PROSPECT',
    agreement: { status: 'NONE' },
    notes: [],
  },
  {
    id: 'org-rivage',
    name: 'Client direct fictif Rivage',
    types: ['CLIENT'],
    contacts: [{ id: 'contact-rivage-1', name: 'Contact Rivage (exemple)', role: 'Responsable technique' }],
    provenance: 'PROFESSIONAL_NETWORK',
    provenanceDetail: '',
    collaborationStatus: 'PAUSED',
    agreement: { status: 'EXPIRED', validUntil: '2026-06-30' },
    notes: [],
  },
]

export const demoOrganizationServices = [
  { id: 'prestation-horizon-cloud', organizationId: 'org-horizon', title: 'Accompagnement cloud (exemple)', status: 'IN_PROGRESS' },
  { id: 'prestation-atlas-data', organizationId: 'org-atlas', title: 'Cadrage data (exemple)', status: 'PLANNED' },
  { id: 'prestation-rivage-cyber', organizationId: 'org-rivage', title: 'Audit d’architecture cyber (exemple)', status: 'COMPLETED' },
]

export const demoTalent = {
  id: 'demo-freelance',
  source: 'WENOVAT',
  qualificationStatus: 'NOT_EVALUATED',
  firstName: '',
  lastName: '',
  architectTitle: '',
  professionalSummary: '',
  technologies: [],
  linkedinUrl: '',
  cv: null,
  experiences: [{ id: 'experience-1', title: '', description: '', startDate: '', endDate: '' }],
  expertise: [],
  dailyRate: '',
  remotePreference: '',
  location: '',
  availability: '',
  onboardingStep: 1,
  onboardingStatus: 'IN_PROGRESS',
}

export const expertiseOptions = [
  { value: 'CLOUD', label: 'Cloud' },
  { value: 'DATA', label: 'Data' },
  { value: 'IA', label: 'IA' },
  { value: 'CYBER', label: 'Cyber' },
  { value: 'ENTERPRISE_ARCHITECTURE', label: "Architecture d'entreprise" },
]

// Invented examples for the admin directory, not member accounts or real profiles.
export const adminTalentExamples = [
  { id: 'exemple-talent-01', firstName: 'Camille', lastName: 'Moreau', architectTitle: 'Architecte Cloud', expertise: ['CLOUD', 'CYBER'], source: 'WENOVAT', qualificationStatus: 'QUALIFIED', availability: 'IMMEDIATE', location: 'Paris', dailyRate: 850, professionalSummary: 'Exemple fictif de spécialisation en architecture Cloud et sécurité des infrastructures.', technologies: ['AWS', 'Terraform'], remotePreference: 'HYBRID', experiences: [{ id: 'exemple-experience-01', title: 'Architecture de plateformes Cloud (exemple)', startDate: '2022-01', endDate: '', description: 'Scénario fictif : conception de plateformes et bonnes pratiques de sécurité.' }], cv: { name: 'cv-exemple-camille.pdf', size: 2048 }, contact: { email: 'camille@example.invalid' } },
  { id: 'exemple-talent-02', firstName: 'Nora', lastName: 'Laurent', architectTitle: 'Architecte Data', expertise: ['DATA', 'IA'], source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED', availability: 'WITHIN_MONTH', location: 'Lyon', dailyRate: 750, professionalSummary: 'Exemple fictif de profil orienté plateformes de données.', technologies: ['Python', 'Spark'], experiences: [{ id: 'exemple-experience-02', title: 'Architecture de données (exemple)', startDate: '2021-06', endDate: '2024-02', description: 'Scénario fictif : modélisation et gouvernance de données.' }] },
  { id: 'exemple-talent-03', firstName: 'Alex', lastName: 'Bernard', architectTitle: 'Architecte cybersécurité', expertise: ['CYBER'], source: 'EXTERNAL', qualificationStatus: 'NOT_EVALUATED', availability: 'IMMEDIATE', location: 'Lille', dailyRate: 900, externalPresentationException: { status: 'POSSIBLE', description: 'Présentation exceptionnelle envisageable au cas par cas, hors portail premium.' } },
  { id: 'exemple-talent-04', firstName: 'Inès', lastName: 'Petit', architectTitle: 'Architecte d’entreprise', expertise: ['ENTERPRISE_ARCHITECTURE'], source: 'WENOVAT', qualificationStatus: 'SELECTED_FOR_REVIEW', availability: 'LATER', location: 'Bordeaux', dailyRate: 1000 },
  { id: 'exemple-talent-05', firstName: 'Sami', lastName: 'Roux', architectTitle: 'Architecte IA', expertise: ['IA', 'DATA'], source: 'WENOVAT', qualificationStatus: 'INTERVIEW_SCHEDULED', availability: 'WITHIN_MONTH', location: 'Nantes', dailyRate: 820 },
  { id: 'exemple-talent-06', firstName: 'Lou', lastName: 'Garnier', architectTitle: 'Architecte Cloud', expertise: ['CLOUD'], source: 'WENOVAT', qualificationStatus: 'NOT_QUALIFIED', availability: 'LATER', location: 'Toulouse', dailyRate: 680 },
  { id: 'exemple-talent-07', firstName: 'Robin', lastName: 'Faure', architectTitle: 'Architecte Data', expertise: ['DATA'], source: 'EXTERNAL', qualificationStatus: 'NOT_EVALUATED', availability: 'WITHIN_MONTH', location: 'Rennes', dailyRate: null },
  { id: 'exemple-talent-08', firstName: 'Maya', lastName: 'Leclerc', architectTitle: 'Architecte Cloud et IA', expertise: ['CLOUD', 'IA'], source: 'WENOVAT', qualificationStatus: 'QUALIFIED', availability: 'IMMEDIATE', location: 'Marseille', dailyRate: 920 },
  { id: 'exemple-talent-09', firstName: 'Noé', lastName: 'Dubois', architectTitle: 'Architecte sécurité', expertise: ['CYBER', 'CLOUD'], source: 'WENOVAT', qualificationStatus: 'SELECTED_FOR_REVIEW', availability: 'WITHIN_MONTH', location: 'Grenoble', dailyRate: 790 },
  { id: 'exemple-talent-10', firstName: 'Sarah', lastName: 'Mercier', architectTitle: 'Architecte d’entreprise', expertise: ['ENTERPRISE_ARCHITECTURE', 'DATA'], source: 'EXTERNAL', qualificationStatus: 'NOT_EVALUATED', availability: 'LATER', location: 'Strasbourg', dailyRate: 980 },
  { id: 'exemple-talent-11', firstName: 'Eliott', lastName: 'Martin', architectTitle: 'Architecte plateformes Data', expertise: ['DATA', 'CLOUD'], source: 'WENOVAT', qualificationStatus: 'INTERVIEW_SCHEDULED', availability: 'IMMEDIATE', location: 'Montpellier', dailyRate: 870 },
  { id: 'exemple-talent-12', firstName: 'Jade', lastName: 'Girard', architectTitle: 'Architecte IA', expertise: ['IA'], source: 'WENOVAT', qualificationStatus: 'NOT_EVALUATED', availability: 'WITHIN_MONTH', location: 'Nice', dailyRate: 810 },
]

export const demoEngagements = [
  { id: 'exemple-invitation-cloud', talentId: 'demo-freelance', missionId: 'exemple-cloud', type: 'INVITATION', status: 'PENDING', createdAt: '2026-11-15' },
  { id: 'exemple-candidature-data', talentId: 'demo-freelance', missionId: 'exemple-data', type: 'APPLICATION', status: 'IN_PROGRESS', createdAt: '2026-11-14' },
  { id: 'exemple-invitation-cyber', talentId: 'demo-freelance', missionId: 'exemple-cyber-invitation', type: 'INVITATION', status: 'PENDING', createdAt: '2026-11-13' },
  { id: 'exemple-invitation-premium', talentId: 'demo-freelance', missionId: 'exemple-cloud-premium-invitation', type: 'INVITATION', status: 'PENDING', createdAt: '2026-11-12' },
  { id: 'exemple-candidature-ia', talentId: 'demo-freelance', missionId: 'exemple-ia', type: 'APPLICATION', status: 'SHORTLISTED', createdAt: '2026-11-11' },
]

// Admin-only placement examples; separate from member invitations and applications.
export const demoPrestations = [
  {
    id: 'prestation-cloud-horizon', missionId: 'exemple-cloud', talentId: 'exemple-talent-01',
    clientOrganizationId: 'org-horizon', partnerOrganizationId: 'org-horizon',
    commercialOwner: 'Camille Martin', startDate: '2026-11-02', endDate: '2027-04-30', status: 'IN_PROGRESS',
    remuneration: { model: 'FIXED_SUCCESS_FEE', fixedAmount: 1000 },
    firstBillableWorkDate: '2026-11-02', monthlyStatements: [{ month: '2026-11', declaredDays: 8, validatedDays: 5 }],
    commissionStatus: 'ACQUIRED', transfers: [],
  },
  {
    id: 'prestation-data-atlas', missionId: 'exemple-data', talentId: 'exemple-talent-02',
    clientOrganizationId: 'org-atlas', partnerOrganizationId: null,
    commercialOwner: 'Nora Bernard', startDate: '2026-10-01', endDate: '2027-01-31', status: 'IN_PROGRESS',
    remuneration: { model: 'PER_BILLABLE_DAY', negotiatedDailyRate: 75 },
    firstBillableWorkDate: '2026-10-01', monthlyStatements: [
      { month: '2026-10', declaredDays: 18, validatedDays: 16 },
      { month: '2026-11', declaredDays: 12, validatedDays: 9 },
    ],
    commissionStatus: 'INVOICED', transfers: [
      { id: 'transfert-data-01', fromOwner: 'Camille Martin', toOwner: 'Nora Bernard', transferredAt: '2026-10-15T10:00:00.000Z' },
    ],
  },
  {
    id: 'prestation-ia-latitude', missionId: 'exemple-ia', talentId: 'exemple-talent-05',
    clientOrganizationId: 'org-latitude', partnerOrganizationId: null,
    commercialOwner: 'Alex Petit', startDate: '2026-12-01', endDate: '2027-03-31', status: 'PLANNED',
    remuneration: { model: 'FIXED_SUCCESS_FEE', fixedAmount: 1000 },
    firstBillableWorkDate: null, monthlyStatements: [{ month: '2026-12', declaredDays: 2, validatedDays: 0 }],
    commissionStatus: 'TO_CONFIRM', transfers: [],
  },
  {
    id: 'prestation-cyber-rivage', missionId: 'exemple-cyber-invitation', talentId: 'exemple-talent-03',
    clientOrganizationId: 'org-rivage', partnerOrganizationId: null,
    commercialOwner: 'Louise Moreau', startDate: '2026-09-01', endDate: '2026-09-12', status: 'INTERRUPTED',
    remuneration: { model: 'FIXED_SUCCESS_FEE', fixedAmount: 1000 },
    firstBillableWorkDate: '2026-09-01', monthlyStatements: [{ month: '2026-09', declaredDays: 6, validatedDays: 5 }],
    commissionStatus: 'DISPUTED', transfers: [],
  },
  {
    id: 'prestation-architecture-horizon', missionId: 'exemple-architecture-strategique', talentId: 'exemple-talent-08',
    clientOrganizationId: 'org-horizon', partnerOrganizationId: 'org-horizon',
    commercialOwner: 'Camille Martin', startDate: '2026-07-01', endDate: '2026-10-31', status: 'COMPLETED',
    remuneration: { model: 'PER_BILLABLE_DAY', negotiatedDailyRate: 90 },
    firstBillableWorkDate: '2026-07-01', monthlyStatements: [
      { month: '2026-09', declaredDays: 19, validatedDays: 19 },
      { month: '2026-10', declaredDays: 21, validatedDays: 20 },
    ],
    commissionStatus: 'PAID', transfers: [],
  },
]

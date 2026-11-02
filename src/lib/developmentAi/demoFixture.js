// Exemple statique strictement réservé à la revue visuelle locale.
export const demoDevelopmentForm = {
  projectType: 'new_application',
  projectMaturity: 'framing',
  projectDomain: 'business_application',
  estimatedSize: 'medium',
  teamSize: '4_10',
  profiles: ['po', 'dev', 'tech_lead', 'qa'],
  methodology: 'agile_scrum',
  documentation: 'partial',
  aiUsage: 'copilot_ide',
  priority: 'delivery_speed',
  assistedStages: ['development', 'review', 'testing'],
  codeSensitivity: 'internal',
  aiConstraints: 'saas_allowed',
  developmentEnvironment: 'github',
  primaryIde: 'vscode',
  cicd: 'partial',
  languages: ['java', 'python'],
}

export const demoDevelopmentResult = {
  diagnostic: {
    score: 72,
    level: 'Prêt pour un pilote',
    main_recommendation: 'Votre organisation dispose des prérequis pour expérimenter un développement assisté par IA sur un projet pilote. Commencez par un cas d’usage maîtrisé, en vous appuyant sur un framework adapté à votre contexte (BMAD, Speckit, CrewAI, AutoGen, etc.), puis validez les résultats avant toute généralisation aux équipes.',
    dimensions: [
      {
        id: 'organisation', title: 'Organisation', score: 75, status_label: 'Points forts', status_tone: 'positive',
        findings: [
          { text: 'Équipe et rôles clés en place (PO, Dev, Tech Lead)', status_tone: 'positive' },
          { text: 'Méthodologie Agile bien définie', status_tone: 'positive' },
          { text: 'Bonne sensibilisation à l’IA dans l’équipe', status_tone: 'positive' },
          { text: 'Documentation existante partielle', status_tone: 'warning' },
        ],
      },
      {
        id: 'processus', title: 'Processus', score: 65, status_label: 'À renforcer', status_tone: 'warning',
        findings: [
          { text: 'Cycle de développement structuré', status_tone: 'positive' },
          { text: 'Utilisation d’outils de gestion (GitHub, CI/CD)', status_tone: 'positive' },
          { text: 'Spécifications et PRD à standardiser', status_tone: 'warning' },
          { text: 'Tests automatisés à renforcer', status_tone: 'warning' },
        ],
      },
      {
        id: 'outils-environnement', title: 'Outils & Environnement', score: 70, status_label: 'Points forts', status_tone: 'positive',
        findings: [
          { text: 'Socle technique adapté (IDE, Git, CI/CD)', status_tone: 'positive' },
          { text: 'Accès à des outils IA (Copilot, IDE IA)', status_tone: 'positive' },
          { text: 'Environnement de développement hétérogène', status_tone: 'warning' },
          { text: 'Intégration des agents à industrialiser', status_tone: 'warning' },
        ],
      },
      {
        id: 'gouvernance-securite', title: 'Gouvernance & Sécurité', score: 80, status_label: 'Points forts', status_tone: 'positive',
        findings: [
          { text: 'Prise en compte des enjeux de sécurité', status_tone: 'positive' },
          { text: 'Contraintes IA et sensibilité des données définies', status_tone: 'positive' },
          { text: 'Bon niveau de gouvernance des accès', status_tone: 'positive' },
          { text: 'Guidelines d’usage de l’IA à formaliser', status_tone: 'warning' },
        ],
      },
    ],
  },
  scenarios: [
    {
      id: 'assess', name: 'Assess', description: 'Évaluer la maturité de l’équipe, repérer les usages prometteurs et préparer une feuille de route adaptée au projet.', duration: '1 à 2 semaines',
      actions: ['Analyser les pratiques de développement actuelles', 'Repérer les cas d’usage et les premiers gains possibles', 'Comparer les frameworks adaptés', 'Prioriser une feuille de route d’adoption'],
      deliverables: ['Rapport de diagnostic', 'Liste de cas d’usage prioritaires', 'Feuille de route détaillée'],
      comparison: { duration: '1 à 2 semaines', scope: 'Diagnostic et plan', objective: 'Évaluer et prioriser', teams: 'Direction et équipe projet', investment: 'Faible', outcome: 'Feuille de route d’adoption' },
    },
    {
      id: 'pilot', name: 'Pilot', description: 'Tester l’assistance IA sur un projet concret, mesurer les résultats et ajuster les pratiques avant un déploiement plus large.', duration: '4 à 6 semaines', recommendation_status: 'Recommandé',
      actions: ['Cadrer le cas d’usage et choisir un framework', 'Accompagner l’équipe du projet pilote', 'Développer un premier cas d’usage avec l’IA', 'Mesurer les gains et ajuster l’approche'],
      deliverables: ['Environnement et outils configurés', 'Application ou cas d’usage développé', 'Retour d’expérience et recommandations', 'Plan de généralisation'],
      comparison: { duration: '4 à 6 semaines', scope: 'Un projet pilote', objective: 'Valider et mesurer', teams: 'Une équipe projet', investment: 'Moyen', outcome: 'Cas d’usage fonctionnel et gains mesurés' },
    },
    {
      id: 'scale', name: 'Scale', description: 'Étendre le développement assisté par IA à plusieurs équipes en établissant un cadre commun et un suivi des usages.', duration: '2 à 3 mois',
      actions: ['Définir les standards et bonnes pratiques', 'Créer des modèles et agents réutilisables', 'Former et accompagner les équipes', 'Mettre en place la gouvernance et le suivi des usages'],
      deliverables: ['Framework et agents standardisés', 'Guidelines et bonnes pratiques', 'Plan de formation', 'Tableau de suivi des usages et des gains'],
      comparison: { duration: '2 à 3 mois', scope: 'Plusieurs équipes et projets', objective: 'Industrialiser et déployer', teams: 'Plusieurs équipes', investment: 'Plus important', outcome: 'Déploiement à l’échelle et gouvernance' },
    },
  ],
  frameworks: [
    { id: 'bmad', name: 'BMAD', description: 'Méthode structurée pour organiser la conception et la réalisation avec des agents IA.', status_label: 'Recommandé', status_tone: 'recommended', relevance_score: 85, strengths: ['Cadrage détaillé', 'Rôles et livrables structurés', 'Suivi du développement'], positioning: 'Pilotage du cycle de développement assisté par IA', ideal_use_case: 'Projet nécessitant un cadrage et des livrables explicites', setup_level: 'Intermédiaire' },
    { id: 'spec-kit', name: 'Spec Kit', description: 'Approche guidée par les spécifications pour passer du besoin à l’implémentation.', status_label: 'Pertinent', relevance_score: 80, strengths: ['Spécifications traçables', 'Étapes de planification', 'Guidage de l’implémentation'], positioning: 'Développement piloté par les spécifications', ideal_use_case: 'Équipe souhaitant formaliser ses exigences avant de coder', setup_level: 'Modéré' },
    { id: 'crewai', name: 'CrewAI', description: 'Orchestration d’agents spécialisés collaborant sur des tâches définies.', status_label: 'Pertinent', relevance_score: 75, strengths: ['Agents aux rôles distincts', 'Coordination des tâches', 'Flux de travail configurables'], positioning: 'Orchestration de systèmes multi-agents', ideal_use_case: 'Automatisation de tâches réparties entre plusieurs agents', setup_level: 'Intermédiaire' },
    { id: 'microsoft-agent-framework', name: 'Microsoft Agent Framework', description: 'Outils pour concevoir et orchestrer des agents dans un environnement Microsoft.', status_label: 'À considérer', relevance_score: 65, strengths: ['Intégration à l’écosystème Microsoft', 'Orchestration d’agents', 'Déploiement extensible'], positioning: 'Construction et orchestration d’agents IA', ideal_use_case: 'Projet déjà intégré aux outils Microsoft', setup_level: 'Avancé' },
  ],
  journey: {
    steps: [
      { id: 'business-need', title: 'Business Need', description: 'Cadrage du besoin et identification des cas d’usage.', status_label: 'Prêt', status_tone: 'positive' },
      { id: 'specifications', title: 'Spécifications (PRD)', description: 'Formalisation des exigences et des critères d’acceptation.', status_label: 'Prêt', status_tone: 'positive' },
      { id: 'architecture', title: 'Architecture', description: 'Conception technique et choix des outils et frameworks.', status_label: 'À renforcer', status_tone: 'warning' },
      { id: 'epics-stories', title: 'Epics & Stories', description: 'Découpage en epics et stories exploitables par l’IA.', status_label: 'Prêt', status_tone: 'positive' },
      { id: 'developpement-ia', title: 'Développement assisté par IA', description: 'Implémentation avec BMAD, Speckit ou un framework adapté.', status_label: 'Prêt', status_tone: 'positive' },
      { id: 'tests-review', title: 'Tests & Review', description: 'Tests automatisés et revue de code assistée par IA.', status_label: 'À renforcer', status_tone: 'warning' },
      { id: 'documentation', title: 'Documentation', description: 'Documentation technique et utilisateur générée ou assistée.', status_label: 'Prêt', status_tone: 'positive' },
      { id: 'cicd', title: 'CI/CD', description: 'Intégration dans la chaîne CI/CD et monitoring.', status_label: 'Prêt', status_tone: 'positive' },
    ],
    strengths: [
      { title: 'Équipe et outils déjà en place', description: 'Vous disposez d’une équipe avec des rôles bien définis et d’un environnement de développement stable (IDE, Git, CI/CD).' },
      { title: 'Volonté d’accélérer le delivery', description: 'L’IA est déjà utilisée (Copilot / IDE) et l’équipe est motivée pour aller plus loin.' },
      { title: 'Bonne structuration des projets', description: 'La méthodologie Agile est en place et les projets sont bien organisés.' },
      { title: 'Environnement adapté', description: 'Le socle technique et la gouvernance permettent d’expérimenter les frameworks dans de bonnes conditions.' },
      { title: 'Cas d’usage clairement identifié', description: 'Le projet pilote est pertinent et maîtrisé.' },
    ],
    improvements: [
      { title: 'Formaliser davantage les spécifications (PRD)', description: 'Les exigences fonctionnelles et non fonctionnelles doivent être plus détaillées pour optimiser la génération des artefacts par l’IA.' },
      { title: 'Renforcer l’architecture et les standards', description: 'Définir des guidelines d’architecture et des patterns réutilisables pour les agents et le code généré.' },
      { title: 'Mettre en place des tests automatisés', description: 'Les tests unitaires et d’intégration doivent être systématisés pour garantir la qualité du code généré.' },
      { title: 'Sécuriser l’usage de l’IA', description: 'Renforcer la gouvernance, la gestion des accès et la confidentialité des données.' },
      { title: 'Améliorer la documentation', description: 'Standardiser la documentation technique et utilisateur, idéalement générée et maintenue avec l’aide de l’IA.' },
    ],
  },
  recommendations: [{ id: 'a', title: 'Recommandation illustrative', web_message: 'Exemple de message.', reason: 'Exemple de contexte.' }],
}

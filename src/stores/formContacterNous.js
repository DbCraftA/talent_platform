import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
    state: () => ({
        type: 'company',
        nom : '',
        prenom : '',
        raison: '',
        taille_entreprise: '',
        role: '',
        temps_par_semaine: '',
        description_poste: '',
        motif_projet: '',
        duree_mission: '',
        date_debut: '',
        email: '',
        linkedin: '',
        profession: '',
        domaine: '',
        champ_libre: '',
        experience: '',
        tjm: '',
        location: '',
        contexte: '',
        description_besoin: '',
        priorite: '',
    }),
    actions: {
        resetForm() {
                this.type = 'company',
                this.nom  = '',
                this.prenom  = '',
                this.raison = '',
                this.email = '',
                this.linkedin = '',
                this.taille_entreprise = '',
                this.role = '',
                this.temps_par_semaine = '',
                this.description_poste = '',
                this.duree_mission = '',
                this.motif_projet = '',
                this.date_debut = '',
                this.profession = '',
                this.domaine = '',
                this.champ_libre = ''
                this.experience = ''
                this.tjm = ''
                this.location = ''
                this.contexte = ''
                this.description_besoin = ''
                this.priorite = ''
        },
    }
})

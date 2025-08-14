import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
    state: () => ({
        type: 'company',
        nom : '',
        prenom : '',
        raison: '',
        email: '',
        linkedin: '',
        code_postal: '',
        adresse: '',
        ville: '',
        pays: '',
        profession: '',
        domaine: '',
        champ_libre: '',
    }),
    actions: {
        resetForm() {
                this.type = 'company',
                this.nom  = '',
                this.prenom  = '',
                this.raison = '',
                this.email = '',
                this.linkedin = '',
                this.code_postal = '',
                this.adresse = '',
                this.ville = '',
                this.pays = '',
                this.profession = '',
                this.domaine = '',
                this.champ_libre = ''
        },
    }
})

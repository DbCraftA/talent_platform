import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
    state: () => ({
        type: 'company',
        raison: '',
        code_postal: '',
        adresse: '',
        ville: '',
        pays: ''
    }),
    actions: {
        resetForm() {
            this.code_postal = ''
            this.raison = ''
            this.adresse = ''
            this.ville = ''
            this.pays = ''
            localStorage.removeItem('formData')
        },
        loadFromStorage() {
            const saved = localStorage.getItem('formData')
            if (saved) {
                Object.assign(this, JSON.parse(saved))
            }
        }
    }
})

<script setup>
import PortalShell from '../components/PortalShell.vue'

const items = [
  { to: '/espace', label: 'Tableau de bord', icon: 'dashboard' },
  { to: '/espace/profil', label: 'Mon profil', icon: 'profile' },
  { to: '/espace/missions', label: 'Missions', icon: 'missions' },
  { to: '/espace/candidatures', label: 'Mes candidatures', icon: 'applications' }
  ]
</script>

<template>
  <PortalShell title="Espace freelance" sidebar-id="menu-freelance" :items="items">
    <router-view />
  </PortalShell>
</template>

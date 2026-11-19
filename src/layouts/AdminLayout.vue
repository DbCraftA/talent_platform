<script setup>
import PortalShell from '../components/PortalShell.vue'

const items = [
  { to: '/admin', label: "Vue d'ensemble", icon: 'dashboard' },
  { to: '/admin/talents', label: 'Talents', icon: 'talents' },
  { to: '/admin/missions', label: 'Missions', icon: 'missions' },
  { to: '/admin/entreprises', label: 'Entreprises', icon: 'companies' },
  { to: '/admin/prestations', label: 'Prestations & revenus', icon: 'revenue' },
]
</script>

<template>
  <PortalShell title="Administration" sidebar-id="menu-admin" :items="items">
    <router-view />
  </PortalShell>
</template>

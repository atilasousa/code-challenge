<template>
    <router-view />
    <ToastComponent />
</template>

<script setup lang="ts">
import { usePropertyStore } from '@/stores/property'

import ToastComponent from './components/ToastComponent.vue'
import { onMounted } from 'vue'
import '@/scss/app.scss'

const store = usePropertyStore()

onMounted(() => {
    store.loadProperties()
})
</script>

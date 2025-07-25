<template>
    <Transition name="fade">
        <div
            v-if="toast.visible"
            :class="toastClasses"
            class="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-5 py-3 shadow-lg"
        >
            <span class="text-sm font-medium text-white">{{ toast.message }}</span>
            <button class="ml-2 text-white/80 hover:text-white" @click="toast.closeToast">✕</button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

const toastClasses = computed(() => {
    switch (toast.type) {
        case 'success':
            return 'bg-green-600'
        case 'error':
            return 'bg-red-600'
        default:
            return 'bg-blue-600'
    }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

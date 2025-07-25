<template>
    <BaseModal :visible="visible" @close="emit('cancel')">
        <template #title>
            <h2 class="text-xl font-semibold text-gray-800">
                {{ title }}
            </h2>
        </template>

        <p class="leading-relaxed text-gray-600">
            {{ message }}
        </p>

        <template #footer>
            <div class="flex justify-end gap-3 pt-6">
                <button
                    class="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    @click="emit('cancel')"
                >
                    Cancel
                </button>
                <button
                    class="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    @click="emit('confirm')"
                >
                    Confirm
                </button>
            </div>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'

defineProps<{
    visible: boolean
    title?: string
    message: string
}>()

const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()
</script>

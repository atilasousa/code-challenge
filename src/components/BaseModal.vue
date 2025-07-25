<template>
    <div
        v-if="props.visible"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        @click="handleBackgroundClick"
    >
        <div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg" @click.stop>
            <div class="mb-4 flex items-center justify-between">
                <div v-if="$slots.title" class="text-lg font-semibold text-gray-800">
                    <slot name="title" />
                </div>
                <button
                    class="rounded-md bg-red-500 px-2 py-1 text-white shadow transition-all duration-300 hover:bg-red-600"
                    title="Fechar"
                    @click="emit('close')"
                >
                    ✕
                </button>
            </div>
            <div class="text-gray-700">
                <slot />
            </div>
            <div v-if="$slots.footer" class="mt-6 flex justify-end gap-3">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted, watch } from 'vue'

const props = defineProps<{
    visible: boolean
}>()

const handleBackgroundClick = () => {
    emit('close')
}

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close')
}

watch(
    () => props.visible,
    (val) => {
        if (val) {
            window.addEventListener('keydown', handleKeyDown)
        } else {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }
)

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
})

const emit = defineEmits<{
    (e: 'close'): void
}>()
</script>

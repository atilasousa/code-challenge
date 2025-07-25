<template>
    <div class="mt-6 flex flex-wrap justify-center gap-2 text-sm">
        <button
            :disabled="currentPage === 1"
            class="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            @click="emitChange(currentPage - 1)"
        >
            ‹ Prev
        </button>

        <button
            v-for="page in totalPages"
            :key="page"
            :class="[
                'h-9 w-9 rounded-full border text-sm font-semibold transition',
                page === currentPage
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
            ]"
            @click="emitChange(page)"
        >
            {{ page }}
        </button>

        <button
            :disabled="currentPage === totalPages"
            class="rounded-full border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            @click="emitChange(currentPage + 1)"
        >
            Next ›
        </button>
    </div>
</template>

<script setup lang="ts">
const { currentPage, totalPages } = defineProps<{
    currentPage: number
    totalPages: number
}>()

const emit = defineEmits<{
    (e: 'page-change', page: number): void
}>()

function emitChange(page: number) {
    if (page >= 1 && page <= totalPages) {
        emit('page-change', page)
    }
}
</script>

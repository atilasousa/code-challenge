<template>
    <div class="relative w-full max-w-md">
        <SearchSVG />
        <input
            v-model="modelValue"
            type="text"
            placeholder="Search by address or description..."
            class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
    </div>
</template>

<script setup lang="ts">
import SearchSVG from '@/assets/svg/searchSVG.vue'

const modelValue = defineModel<string>()
</script>

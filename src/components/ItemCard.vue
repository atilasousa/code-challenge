<template>
    <div
        class="card group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
        @click="$emit('click')"
    >
        <button
            class="absolute right-2 top-2 z-10 scale-90 rounded-full bg-red-500 p-2 text-white opacity-0 shadow transition-all duration-300 hover:bg-red-600 group-hover:scale-100 group-hover:opacity-100"
            title="Remover"
            @click.stop="$emit('delete')"
        >
            <TrashSVG />
        </button>
        <div class="px-4 pt-4">
            <img :src="imageToShow" :alt="address" class="h-48 w-full object-cover" />
        </div>
        <div class="p-4">
            <h2 class="mb-1 text-lg font-semibold text-gray-800">{{ address }}</h2>
            <p class="text-md mb-1 font-bold text-green-600">${{ price.toLocaleString() }}</p>
            <span
                class="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                :class="{
                    'bg-blue-100 text-blue-700': status === 'Available',
                    'bg-yellow-100 text-yellow-800': status === 'Under Contract',
                    'bg-red-100 text-red-700': status === 'Sold'
                }"
            >
                {{ status }}
            </span>
            <p class="text-sm text-gray-600">{{ description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import TrashSVG from '@/assets/svg/trashSVG.vue'
import noImage from '@/assets/images/placeholder.webp'

const props = defineProps<{
    address: string
    price: number
    description: string
    status: 'Available' | 'Sold' | 'Under Contract'
    image?: string
}>()

defineEmits<{
    (e: 'delete'): void
    (e: 'click'): void
}>()

const imageToShow = props.image?.trim() ? props.image : noImage
</script>

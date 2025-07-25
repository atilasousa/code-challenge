<template>
    <div class="flex min-h-screen w-full flex-col items-center gap-6 p-4">
        <div class="flex w-full max-w-6xl items-center justify-between pb-5">
            <SearchBar v-model="store.searchTerm" />
            <button
                class="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700 active:scale-95"
                @click="openAdd"
            >
                <AddSVG />
                <span class="font-medium">Add</span>
            </button>
        </div>
        <div v-if="store.loading" class="flex flex-col items-center justify-center py-10">
            <div class="mb-2 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p class="text-gray-500">Loading properties...</p>
        </div>

        <div v-else class="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ItemCard
                v-for="property in paginatedProperties"
                :key="property.id"
                v-bind="property"
                @delete="requestDelete(property.id)"
                @click="openEdit(property)"
            />
        </div>
        <div v-if="!store.loading && filteredProperties.length === 0" class="text-gray-500">No properties found.</div>
        <ItemPagination
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
        />
        <AddEditPropertyModal :visible="modalVisible" :property="selected" @close="modalVisible = false" />
        <ConfirmModal
            :visible="showConfirm"
            title="Delete Property"
            message="Are you sure you want to delete this property?"
            @cancel="showConfirm = false"
            @confirm="confirmDelete"
        />
    </div>
</template>

<script setup lang="ts">
import AddEditPropertyModal from '@/components/AddEditPropertyModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import ItemCard from '@/components/ItemCard.vue'
import ItemPagination from '@/components/ItemPagination.vue'
import SearchBar from '@/components/SearchBar.vue'

import AddSVG from '@/assets/svg/addSVG.vue'
import { Property } from '@/interface'
import { computed, ref, watch } from 'vue'
import { usePropertyStore, useToastStore } from '@/stores'

defineOptions({ name: 'Home' })

const toast = useToastStore()

const store = usePropertyStore()

const currentPage = ref(1)
const modalVisible = ref(false)
const itemsPerPage = 6
const selected = ref({} as Property | null)
const showConfirm = ref(false)
const pendingDeleteId = ref<number | null>(null)

watch(
    () => store.searchTerm,
    () => {
        currentPage.value = 1
    }
)

const filteredProperties = computed(() => {
    const term = store.searchTerm.toLowerCase()

    return store.properties.filter((p) => p.address.toLowerCase().includes(term) || p.description.toLowerCase().includes(term))
})

const totalPages = computed(() => Math.ceil(filteredProperties.value.length / itemsPerPage))

const paginatedProperties = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage

    return filteredProperties.value.slice(start, start + itemsPerPage)
})

const handlePageChange = (page: number) => {
    currentPage.value = page
}

const openEdit = (property: Property) => {
    selected.value = property
    modalVisible.value = true
}

const openAdd = () => {
    selected.value = null
    modalVisible.value = true
}

const requestDelete = (id: number) => {
    pendingDeleteId.value = id
    showConfirm.value = true
}

const confirmDelete = () => {
    if (pendingDeleteId.value !== null) {
        store.removeProperty(pendingDeleteId.value)
        pendingDeleteId.value = null
        showConfirm.value = false
        toast.showToast('Property deleted!', 'success')
    }
}
</script>

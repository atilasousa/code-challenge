import { type Property } from '@/interface'
import { defineStore } from 'pinia'
import { fetchProperties } from '@/services/mockApi'
import { ref } from 'vue'

export const usePropertyStore = defineStore('property', () => {
    const properties = ref<Property[]>([])
    const loading = ref(true)
    const searchTerm = ref('')

    function setSearchTerm(term: string) {
        searchTerm.value = term
    }

    async function loadProperties() {
        loading.value = true
        properties.value = await fetchProperties()
        loading.value = false
    }

    function addProperty(data: Omit<Property, 'id'>) {
        const newId = Math.max(0, ...properties.value.map((p) => p.id)) + 1
        const newProperty: Property = { ...data, id: newId }

        properties.value.push(newProperty)
    }

    function updateProperty(updated: Property) {
        const index = properties.value.findIndex((p) => p.id === updated.id)

        if (index !== -1) {
            properties.value[index] = updated
        }
    }

    function removeProperty(id: number) {
        properties.value = properties.value.filter((p) => p.id !== id)
    }

    return {
        properties,
        loading,
        searchTerm,
        setSearchTerm,
        loadProperties,
        addProperty,
        updateProperty,
        removeProperty
    }
})

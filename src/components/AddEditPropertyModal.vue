<template>
    <BaseModal :visible="visible" @close="emit('close')">
        <template #title>
            {{ isEdit ? 'Edit Property' : 'Add New Property' }}
        </template>
        <form class="space-y-4 text-sm text-gray-700">
            <div class="flex flex-col gap-1">
                <label class="font-medium">Image (URL)</label>
                <input
                    v-model="form.image"
                    type="text"
                    class="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="https://example.com/image.jpg"
                />
                <p v-if="errors.image" class="text-sm text-red-600">{{ errors.image }}</p>
            </div>

            <div class="flex flex-col gap-1">
                <label class="font-medium">Address</label>
                <input
                    v-model="form.address"
                    type="text"
                    class="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="123 Example Street"
                />
                <p v-if="errors.address" class="text-sm text-red-600">{{ errors.address }}</p>
            </div>

            <div class="flex flex-col gap-1">
                <label class="font-medium">Price</label>
                <input
                    v-model.number="form.price"
                    type="number"
                    class="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="100000"
                />
                <p v-if="errors.price" class="text-sm text-red-600">{{ errors.price }}</p>
            </div>

            <div class="flex flex-col gap-1">
                <label class="font-medium">State</label>
                <select
                    v-model="form.status"
                    class="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                    <option disabled value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Under Contract">Under Contract</option>
                    <option value="Sold">Sold</option>
                </select>
                <p v-if="errors.status" class="text-sm text-red-600">{{ errors.status }}</p>
            </div>

            <div class="flex flex-col gap-1">
                <label class="font-medium">Description</label>
                <textarea
                    v-model="form.description"
                    rows="3"
                    class="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="Property description"
                />
                <p v-if="errors.description" class="text-sm text-red-600">{{ errors.description }}</p>
            </div>
        </form>

        <template #footer>
            <div class="flex justify-end gap-3 pt-4">
                <button
                    class="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    @click="emit('close')"
                >
                    Cancel
                </button>
                <button
                    class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    @click="submit"
                >
                    {{ isEdit ? 'Save Changes' : 'Add Property' }}
                </button>
            </div>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { Property } from '@/interface'
import { computed, ref, watch } from 'vue'
import { usePropertyStore, useToastStore } from '@/stores'
import { validatePropertyForm } from '@/utils/validatePropertyForm'
import type { PropertyFormErrors } from '@/utils/validatePropertyForm'

const errors = ref<PropertyFormErrors>({})

defineOptions({ name: 'UpsertPropertyModal' })

const props = defineProps<{
    visible: boolean
    property?: Property | null
}>()

const toast = useToastStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const store = usePropertyStore()

const isEdit = computed(() => !!props.property)

const form = ref<Omit<Property, 'id'>>({
    address: '',
    price: 0,
    status: 'Available',
    description: '',
    image: ''
})

watch(
    () => props.property,
    (val) => {
        if (val) {
            const { ...rest } = val

            form.value = { ...rest }
        } else {
            resetForm()
            errors.value = {}
        }
    },
    { immediate: true }
)

watch(
    () => props.visible,
    (visible) => {
        if (!visible) {
            resetForm()
            errors.value = {}
        }
    }
)

// Clear field errors on change..............
Object.keys(form.value).forEach((key) => {
    watch(
        () => form.value[key as keyof typeof form.value],
        () => {
            const field = key as keyof PropertyFormErrors

            if (errors.value[field]) {
                errors.value[field] = ''
            }
        }
    )
})

function resetForm() {
    form.value = {
        address: '',
        price: 0,
        status: 'Available',
        description: '',
        image: ''
    }
    errors.value = {}
}

function submit() {
    errors.value = validatePropertyForm(form.value)

    if (Object.keys(errors.value).length > 0) return

    if (isEdit.value && props.property?.id !== undefined) {
        store.updateProperty({ id: props.property.id, ...form.value })
    } else {
        store.addProperty(form.value)
        toast.showToast('Property added!', 'success')
    }

    resetForm()
    emit('close')
}
</script>

import type { Property } from '@/interface'

export type PropertyForm = Omit<Property, 'id'>
export type PropertyFormErrors = Partial<Record<keyof PropertyForm, string>>

export function validatePropertyForm(form: PropertyForm): PropertyFormErrors {
    const errors: PropertyFormErrors = {}

    if (!form.address.trim()) {
        errors.address = 'Address is required.'
    }

    if (!form.price || form.price <= 0) {
        errors.price = 'Price must be greater than zero.'
    }

    if (!form.status) {
        errors.status = 'Status is required.'
    }

    if (!form.description.trim()) {
        errors.description = 'Description is required.'
    }

    return errors
}

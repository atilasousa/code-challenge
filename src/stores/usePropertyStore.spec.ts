import * as api from '@/services/mockApi'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePropertyStore } from '@/stores/property'
import type { Property } from '@/interface'

describe('usePropertyStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('initializes with correct default state', () => {
        const store = usePropertyStore()

        expect(store.properties).toEqual([])
        expect(store.loading).toBe(true)
        expect(store.searchTerm).toBe('')
    })

    it('sets search term correctly', () => {
        const store = usePropertyStore()

        store.setSearchTerm('house')
        expect(store.searchTerm).toBe('house')
    })

    it('loads properties from mock API', async () => {
        const mockProperties: Property[] = [
            {
                id: 1,
                address: '123 Main Street',
                price: 100000,
                description: 'Test description',
                status: 'Available',
                image: 'test.jpg'
            }
        ]

        vi.spyOn(api, 'fetchProperties').mockResolvedValue(mockProperties)

        const store = usePropertyStore()

        await store.loadProperties()

        expect(store.properties).toEqual(mockProperties)
        expect(store.loading).toBe(false)
    })

    it('adds a new property correctly', () => {
        const store = usePropertyStore()

        store.addProperty({
            address: '456 New Ave',
            price: 150000,
            description: 'New property',
            status: 'Available',
            image: 'image.jpg'
        })

        expect(store.properties.length).toBe(1)
        expect(store.properties[0]).toMatchObject({
            id: 1,
            address: '456 New Ave',
            price: 150000
        })
    })

    it('updates an existing property', () => {
        const store = usePropertyStore()

        store.properties = [
            {
                id: 1,
                address: 'Test',
                price: 100000,
                description: 'Desc',
                status: 'Available',
                image: 'old.jpg'
            }
        ]

        store.updateProperty({
            id: 1,
            address: 'Test1',
            price: 200000,
            description: 'Desc1',
            status: 'Sold',
            image: 'new.jpg'
        })

        expect(store.properties[0]).toMatchObject({
            id: 1,
            address: 'Test1',
            price: 200000,
            status: 'Sold'
        })
    })

    it('removes a property by ID', () => {
        const store = usePropertyStore()

        store.properties = [
            {
                id: 1,
                address: 'To Delete',
                price: 100000,
                description: 'Test',
                status: 'Sold',
                image: ''
            },
            {
                id: 2,
                address: 'To Keep',
                price: 200000,
                description: 'Keep this one',
                status: 'Available',
                image: ''
            }
        ]

        store.removeProperty(1)

        expect(store.properties.length).toBe(1)
        expect(store.properties[0].id).toBe(2)
    })
})

import { Property } from '@/interface'

const propertyListings: Property[] = [
    {
        id: 1,
        address: '123 Maple Street, Springfield, IL',
        price: 285000,
        description: 'Charming 3-bedroom, 2-bathroom home with a spacious backyard and updated kitchen.',
        status: 'Available',
        image: ''
    },
    {
        id: 2,
        address: '456 Oak Avenue, Denver, CO',
        price: 520000,
        description: 'Modern 4-bedroom house with open floor plan, finished basement, and mountain views.',
        status: 'Under Contract',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        address: '789 Pine Lane, Austin, TX',
        price: 399999,
        description: 'Cozy 2-bedroom bungalow in a quiet neighborhood, close to downtown.',
        status: 'Sold',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        address: '101 Elm Drive, Seattle, WA',
        price: 875000,
        description: 'Spacious 5-bedroom home with home office, garden, and two-car garage.',
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        address: '202 Birch Boulevard, Miami, FL',
        price: 650000,
        description: 'Luxury condo with ocean view, 3 bedrooms, pool access, and 24/7 security.',
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        address: '305 Cedar Court, Portland, OR',
        price: 470000,
        description: 'Renovated 3-bedroom craftsman-style home with eco-friendly upgrades.',
        status: 'Under Contract',
        image: ''
    },
    {
        id: 7,
        address: '88 Palm Tree Way, San Diego, CA',
        price: 1150000,
        description: 'Beachfront villa with 4 bedrooms, panoramic ocean views, and private pool.',
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 8,
        address: '920 Sunset Blvd, Los Angeles, CA',
        price: 2200000,
        description: 'Luxurious estate with 6 bedrooms, home theatre, and smart home automation.',
        status: 'Sold',
        image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 9,
        address: '12 Pineapple Road, Honolulu, HI',
        price: 980000,
        description: 'Tropical 3-bedroom retreat with large lanai, ocean breeze, and mountain views.',
        status: 'Available',
        image: ''
    }
]

export function fetchProperties(): Promise<Property[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(propertyListings)
        }, 2000)
    })
}

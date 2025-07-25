export interface Property {
    id: number
    address: string
    price: number
    description: string
    status: 'Available' | 'Sold' | 'Under Contract'
    image: string
}

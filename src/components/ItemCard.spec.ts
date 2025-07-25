import ItemCard from '@/components/ItemCard.vue'
import noImage from '@/assets/images/placeholder.webp'
import { Property } from '@/interface'
import { mount } from '@vue/test-utils'

describe('ItemCard.vue', () => {
    const defaultProps: Omit<Property, 'id'> = {
        address: '123 Maple Street',
        price: 285000,
        description: 'Beautiful house with backyard',
        status: 'Available',
        image: ''
    }

    it('renders all the provided props correctly', () => {
        const wrapper = mount(ItemCard, {
            props: defaultProps
        })

        expect(wrapper.text()).toContain(defaultProps.address)
        expect(wrapper.text()).toContain('$285,000')
        expect(wrapper.text()).toContain(defaultProps.description)
        expect(wrapper.text()).toContain(defaultProps.status)
    })

    it('uses fallback image when image prop is empty', () => {
        const wrapper = mount(ItemCard, {
            props: defaultProps
        })

        const img = wrapper.find('img')

        expect(img.attributes('src')).toBe(noImage)
    })

    it('uses provided image when image prop is not empty', () => {
        const imageUrl = 'https://example.com/image.jpg'
        const wrapper = mount(ItemCard, {
            props: {
                ...defaultProps,
                image: imageUrl
            }
        })

        const img = wrapper.find('img')

        expect(img.attributes('src')).toBe(imageUrl)
    })

    it('emits click event when the card is clicked', async () => {
        const wrapper = mount(ItemCard, {
            props: defaultProps
        })

        await wrapper.trigger('click')

        expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('emits delete event when the delete button is clicked', async () => {
        const wrapper = mount(ItemCard, {
            props: defaultProps
        })

        const deleteBtn = wrapper.find('button[title="Remover"]')

        await deleteBtn.trigger('click')

        expect(wrapper.emitted('delete')).toBeTruthy()
    })
})

import BaseModal from './BaseModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('ConfirmModal.vue', () => {
    const factory = (props = {}, options = {}) => {
        return mount(ConfirmModal, {
            props: {
                visible: true,
                message: 'Are you sure you want to delete this item?',
                title: 'Delete Confirmation',
                ...props
            },
            ...options
        })
    }

    it('renders the modal with title and message', () => {
        const wrapper = factory()

        expect(wrapper.text()).toContain('Delete Confirmation')
        expect(wrapper.text()).toContain('Are you sure you want to delete this item?')
    })

    it('emits "cancel" when Cancel button is clicked', async () => {
        const wrapper = factory()
        const cancelBtn = wrapper.find('button:nth-of-type(1)')

        await cancelBtn.trigger('click')
        expect(wrapper.emitted('cancel')).toBeTruthy()
    })

    it('emits "confirm" when Confirm button is clicked', async () => {
        const wrapper = factory()
        const confirmBtn = wrapper.find('button:nth-of-type(2)')

        await confirmBtn.trigger('click')
        expect(wrapper.emitted('confirm')).toBeTruthy()
    })

    it('emits "cancel" when modal is closed via BaseModal', async () => {
        const wrapper = factory()

        wrapper.findComponent(BaseModal).vm.$emit('close')
        await nextTick()

        expect(wrapper.emitted('cancel')).toBeTruthy()
    })

    it('does not render if visible is false', () => {
        const wrapper = factory({ visible: false })

        expect(wrapper.findComponent({ name: 'BaseModal' }).props('visible')).toBe(false)
    })
})

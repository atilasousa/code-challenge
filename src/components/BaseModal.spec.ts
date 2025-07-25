import BaseModal from '@/components/BaseModal.vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

describe('BaseModal.vue', () => {
    let wrapper: ReturnType<typeof mount>

    const factory = (visible = true) =>
        mount(BaseModal, {
            props: { visible },
            slots: {
                default: '<p>Modal content</p>',
                title: '<h1>Modal Title</h1>',
                footer: '<button>Footer Button</button>'
            }
        })

    afterEach(() => {
        wrapper?.unmount()
    })

    it('renders when visible is true', () => {
        wrapper = factory(true)
        expect(wrapper.text()).toContain('Modal content')
        expect(wrapper.find('[title="Fechar"]').exists()).toBe(true)
    })

    it('emits close when clicking on background', async () => {
        wrapper = factory(true)
        await wrapper.trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('does not emit close when clicking inside modal content', async () => {
        wrapper = factory(true)
        await wrapper.find('.shadow-lg').trigger('click')
        expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('emits close when clicking close button', async () => {
        wrapper = factory(true)
        await wrapper.find('[title="Fechar"]').trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('emits close when pressing Escape key', async () => {
        wrapper = mount(BaseModal, {
            props: { visible: false }
        })

        await wrapper.setProps({ visible: true })
        await wrapper.vm.$nextTick()

        const event = new KeyboardEvent('keydown', { key: 'Escape' })

        window.dispatchEvent(event)
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('removes event listener on unmount', () => {
        const removeSpy = vi.spyOn(window, 'removeEventListener')

        wrapper = factory(true)
        wrapper.unmount()
        expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    })
})

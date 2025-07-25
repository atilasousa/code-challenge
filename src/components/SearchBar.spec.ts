import SearchBar from './SearchBar.vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('SearchInput.vue', () => {
    it('renders correctly', () => {
        const wrapper = mount(SearchBar, {
            props: {
                modelValue: ''
            }
        })

        const input = wrapper.find('input')

        expect(input.exists()).toBe(true)
        expect(input.attributes('placeholder')).toBe('Search by address or description...')
    })

    it('renders the SearchSVG icon', () => {
        const wrapper = mount(SearchBar, {
            props: {
                modelValue: ''
            },
            global: {
                stubs: {
                    SearchSVG: true
                }
            }
        })

        expect(wrapper.findComponent({ name: 'SearchSVG' }).exists()).toBe(true)
    })

    it('emits update:modelValue on input', async () => {
        const wrapper = mount(SearchBar, {
            props: {
                modelValue: ''
            }
        })

        const input = wrapper.find('input')

        await input.setValue('text')

        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue']?.[0]).toEqual(['text'])
    })

    it('accepts and displays initial modelValue', () => {
        const wrapper = mount(SearchBar, {
            props: {
                modelValue: 'initial search'
            }
        })

        const input = wrapper.find('input')

        expect((input.element as HTMLInputElement).value).toBe('initial search')
    })
})

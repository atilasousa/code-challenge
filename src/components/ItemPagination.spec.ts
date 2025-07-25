import ItemPagination from '@/components/ItemPagination.vue'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

describe('ItemPagination.vue', () => {
    it('renders the correct number of page buttons', () => {
        const wrapper = mount(ItemPagination, {
            props: {
                currentPage: 2,
                totalPages: 5
            }
        })

        const pageButtons = wrapper.findAll('button').filter((btn) => btn.text().match(/^\d+$/))

        expect(pageButtons.length).toBe(5)
        expect(pageButtons[1].text()).toBe('2')
    })

    it('emits page-change when clicking on a page button', async () => {
        const wrapper = mount(ItemPagination, {
            props: {
                currentPage: 1,
                totalPages: 3
            }
        })

        const button = wrapper.findAll('button').find((btn) => btn.text() === '2')

        await button?.trigger('click')

        expect(wrapper.emitted()['page-change']).toBeTruthy()
        expect(wrapper.emitted()['page-change']?.[0]).toEqual([2])
    })

    it('emits page-change when clicking Next and Prev', async () => {
        const wrapper = mount(ItemPagination, {
            props: {
                currentPage: 2,
                totalPages: 3
            }
        })

        const buttons = wrapper.findAll('button')
        const prevButton = buttons.find((btn) => btn.text().includes('Prev'))
        const nextButton = buttons.find((btn) => btn.text().includes('Next'))

        await prevButton?.trigger('click')
        await nextButton?.trigger('click')

        expect(wrapper.emitted()['page-change']?.[0]).toEqual([1])
        expect(wrapper.emitted()['page-change']?.[1]).toEqual([3])
    })

    it('disables Prev on first page and Next on last page', () => {
        const wrapperFirst = mount(ItemPagination, {
            props: {
                currentPage: 1,
                totalPages: 5
            }
        })

        const wrapperLast = mount(ItemPagination, {
            props: {
                currentPage: 5,
                totalPages: 5
            }
        })

        const prevDisabled = wrapperFirst.find('button').element as HTMLButtonElement
        const nextDisabled = wrapperLast.findAll('button').at(-1)?.element as HTMLButtonElement

        expect(prevDisabled.disabled).toBe(true)
        expect(nextDisabled.disabled).toBe(true)
    })
})

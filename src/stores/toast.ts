import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
    const visible = ref(false)
    const message = ref('')
    const type = ref<'success' | 'error' | 'info'>('success')
    const duration = ref(3000)

    function showToast(msg: string, t: typeof type.value = 'success', time = 3000) {
        message.value = msg
        type.value = t
        duration.value = time
        visible.value = true

        setTimeout(() => {
            visible.value = false
        }, time)
    }

    function closeToast() {
        visible.value = false
    }

    return {
        visible,
        message,
        type,
        duration,
        showToast,
        closeToast
    }
})

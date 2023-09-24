import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const setting = useLocalStorage('setting', {
    isChatMode: true,
    temperature: 0.5,
    apiKey: '',
  })

  const toggleMode = () => {
    setting.value.isChatMode = !setting.value.isChatMode
  }

  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return {
    setting,
    toggleMode,
    toggleDark,
  }
})

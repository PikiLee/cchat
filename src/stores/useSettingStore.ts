import { defineStore } from 'pinia'

export const models = [
  {
    value: 'gpt-3.5-turbo',
    label: 'GPT-3.5 Turbo',
  },
  {
    value: 'gpt-3.5-turbo-16k',
    label: 'GPT-3.5 Turbo 16K',
  },
  {
    value: 'gpt-4',
    label: 'GPT-4',
  },
  {
    value: 'gpt-4-32k',
    label: 'GPT-4 32K',
  },
  {
    value: 'gpt-4-turbo-preview',
    label: 'GPT-4 Turbo',
  },
]

export const useSettingStore = defineStore('setting', () => {
  const isChatMode = useLocalStorage('isChatMode', true)
  const temperature = useLocalStorage('temperature', 0.5)
  const apiKey = useLocalStorage('apiKey', '')
  const model = useLocalStorage<'gpt-3.5-turbo' | 'gpt-3.5-turbo-16k' | 'gpt-4' | 'gpt-4-32k'>('model', 'gpt-3.5-turbo')

  const toggleMode = () => {
    isChatMode.value = !isChatMode.value
  }

  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return {
    isChatMode,
    temperature,
    apiKey,
    model,
    toggleMode,
    toggleDark,
  }
})

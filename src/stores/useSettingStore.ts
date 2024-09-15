import type { ChatModel } from 'openai/resources'
import { defineStore } from 'pinia'

export const models: { value: ChatModel; label: string }[] = [
  {
    value: 'gpt-3.5-turbo',
    label: 'GPT-3.5 Turbo',
  },
  {
    value: 'gpt-4-vision-preview',
    label: 'GPT-4',
  },
  {
    value: 'gpt-4-turbo',
    label: 'GPT-4 Turbo',
  },
  {
    value: 'gpt-4o',
    label: 'GPT-4o',
  },
  {
    value: 'gpt-4o-mini',
    label: 'GPT-4o-mini',
  },
  {
    value: 'o1-mini',
    label: 'o1-mini',
  },
  {
    value: 'o1-preview',
    label: 'o1-preview',
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

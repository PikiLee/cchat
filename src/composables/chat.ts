import type { ChatCompletionRequestMessage } from 'openai'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '~/stores/useSettingStore'

export function useChat() {
  const settingStore = useSettingStore()
  const { setting } = storeToRefs(settingStore)
  const input = ref('')
  const messages = useStorage<ChatCompletionRequestMessage[]>('messages', [])
  const loading = ref(false)
  const error = ref('')

  function sendMessage() {
    if (!input.value) {
      error.value = 'Please enter a message.'
      return
    }
    if (!setting.value.apiKey) {
      error.value = 'Please enter an API key.'
      return
    }

    if (loading.value)
      return
    loading.value = true
    error.value = ''

    messages.value.push({ role: 'user', content: input.value })
    input.value = ''

    doSendMessage(messages.value)
      .then((res) => {
        if (res.data.choices.length === 0 || !res.data.choices[0].message)
          throw new Error('No response from OpenAI')
        messages.value.push(res.data.choices[0].message)
      })
      .catch((err) => {
        if (err.response.status === 401)
          error.value = 'Invalid API key. Please check your API key and try again.'
        else
          error.value = err.message
        console.error(err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  function clearHistory() {
    messages.value = []
  }

  function doSendMessage(messages: ChatCompletionRequestMessage[]) {
    return axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: setting.value.temperature,
    }, {
      headers: {
        'Authorization': `Bearer ${setting.value.apiKey}`,
        'Content-Type': 'application/json',
      },
    })
  }

  return { apiKey: setting.value.apiKey, input, messages, loading, error, sendMessage, temperature: setting.value.temperature, clearHistory }
}

import type { ChatCompletionRequestMessage } from 'openai'
import axios from 'axios'

export function useChat() {
  const apiKey = useStorage('api-key', '')
  const input = ref('')
  const messages = useStorage<ChatCompletionRequestMessage[]>('messages', [])
  const temperature = ref(0.6)
  const loading = ref(false)
  const error = ref('')

  function sendMessage() {
    if (!input.value) {
      error.value = 'Please enter a message.'
      return
    }
    if (!apiKey.value) {
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
      temperature: temperature.value,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey.value}`,
        'Content-Type': 'application/json',
      },
    })
  }

  return { apiKey, input, messages, loading, error, sendMessage, temperature, clearHistory }
}

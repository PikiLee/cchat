import axios from 'axios'
import type { ChatCompletionRequestMessage } from 'openai'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '~/stores/useSettingStore'

export const useOpenAI = () => {
  const settingStore = useSettingStore()
  const { setting } = storeToRefs(settingStore)
  const loading = ref(false)
  const error = ref('')

  function sendMessage(messages: ChatCompletionRequestMessage[]) {
    if (!setting.value.apiKey) {
      error.value = 'Please enter an API key.'
      return
    }

    if (loading.value)
      return
    loading.value = true
    error.value = ''

    return doSendMessage(messages)
      .then((res) => {
        if (res.data.choices.length === 0 || !res.data.choices[0].message)
          throw new Error('No response from OpenAI')
        return res.data.choices[0].message
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

  return {
    sendMessage,
    loading,
    error,
  }
}

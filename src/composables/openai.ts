import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '~/stores/useSettingStore'

export const useOpenAI = () => {
  const settingStore = useSettingStore()
  const { apiKey, temperature, model } = storeToRefs(settingStore)
  const loading = ref(false)
  const error = ref('')

  async function sendMessage(messages: ChatCompletionMessageParam[]) {
    if (!apiKey.value) {
      error.value = 'Please enter an API key.'
      return
    }

    if (loading.value)
      return
    loading.value = true
    error.value = ''

    try {
      const openai = new OpenAI({
        apiKey: apiKey.value,
        dangerouslyAllowBrowser: true,
      })

      const stream = await openai.chat.completions.create({
        messages,
        model: model.value,
        temperature: temperature.value,
        stream: true,
      })

      return stream
    }
    catch (err) {
      error.value = JSON.stringify(err)
      console.error(err)
    }
    finally {
      loading.value = false
    }
  }

  return {
    sendMessage,
    loading,
    error,
  }
}

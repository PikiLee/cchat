import type { ChatCompletionRequestMessage } from 'openai'

export function useChat() {
  const input = ref('')
  const messages = useStorage<ChatCompletionRequestMessage[]>('messages', [])

  const { sendMessage: _sendMessage, loading, error } = useOpenAI()

  async function sendMessage() {
    if (!input.value) {
      error.value = 'Please enter a message.'
      return
    }
    messages.value.push({ role: 'user', content: input.value })
    input.value = ''

    const response = await _sendMessage(messages.value)

    messages.value.push(response)
  }

  function clearHistory() {
    messages.value = []
  }

  return { input, messages, loading, error, sendMessage, clearHistory }
}

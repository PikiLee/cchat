import type { ChatCompletionMessageParam } from 'openai/resources/chat'

export function useChat() {
  const input = ref('')
  const messages = useLocalStorage<ChatCompletionMessageParam[]>('messages', [])

  const { sendMessage: _sendMessage, loading, error } = useOpenAI()

  async function sendMessage() {
    if (!input.value) {
      error.value = 'Please enter a message.'
      return
    }
    messages.value.push({ role: 'user', content: input.value })
    input.value = ''

    const stream = await _sendMessage(messages.value)

    if (stream) {
      messages.value.push({
        role: 'assistant',
        content: '',
      })
      for await (const part of stream)
        messages.value[messages.value.length - 1].content! += (part.choices[0]?.delta?.content || '')
    }
  }

  function clearHistory() {
    messages.value = []
  }

  return { input, messages, loading, error, sendMessage, clearHistory }
}

import type { ChatCompletionRequestMessage } from 'openai'
import axios from 'axios'

export function useChat() {
  const apiKey = useStorage('api-key', '')
  const input = ref('')
  const messages = useStorage<ChatCompletionRequestMessage[]>('messages', [{
    role: 'assistant',
    content: 'interactions. Here are the steps to use MSW with Cypress: 1. Install MSW by running the following command in your project directory: ``` npm install msw --save-dev ``` 2. Create a file named `src/mocks.js` and define your mock server handlers using MSW: ```javascript import { rest } from \'msw\'; export const handlers = [ rest.get(\'/api/users\', (req, res, ctx) => { return res( ctx.status(200), ctx.json([ { id: 1, name: \'John Smith\' }, { id: 2, name: \'Jane Doe\' }, ]), ); }), ]; ``` 3. In your Cypress test file, import `setupWorker` and `handlers` from your `src/mocks.js` file: ```javascript import { setupWorker } from \'msw\'; import { handlers } from \'../src/mocks\'; const worker = setupWorker(...handlers); before(() => { worker.start(); }); after(() => { worker.stop(); }); ``` 4. Now you can write your Cypress tests as usual, and MSW will intercept any HTTP requests and respond with the corresponding mock response defined in your `src/mocks.js` file: ```javascript describe(\'User list\', () => { it(\'should display a list of users\', () => { cy.visit(\'/users\'); cy.get(\'.user\').should(\'have.length\', 2); cy.get(\'.user\').first().should(\'contain\', \'John Smith\'); cy.get(\'.user\').last().should(\'contain\', \'Jane Doe\'); }); }); ``` That\'s it! With MSW and Cypress, you can easily test your client-server interactions without relying on a real server.',
  }])
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
      temperature: 0.6,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey.value}`,
        'Content-Type': 'application/json',
      },
    })
  }

  return { apiKey, input, messages, loading, error, sendMessage, clearHistory }
}

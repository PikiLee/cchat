<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

interface Message {
  type: 'user' | 'bot' | 'error'
  value: string
}

const input = useStorage('api-key', '')
const message: Message = reactive({
  type: 'user',
  value: '',
})
const historyMessages = ref<Message[]>([])
const loading = ref(false)

function handleSendMessage() {
  if (!message.value || loading.value)
    return
  loading.value = true

  historyMessages.value.push({ ...message })
  message.value = ''
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

function clearHistory() {
  historyMessages.value = []
}

function getClasses(message: Message) {
  switch (message.type) {
    case 'user':
      return ['justify-self-end', 'bg-lime-400']
    case 'bot':
      return ['justify-self-start', 'bg-blue-400']
    case 'error':
      return ['justify-self-start', 'bg-red-400']
  }
}
</script>

<template>
  <div class="grid-rows-[10%_1fr_10%]" grid h-screen>
    <p>
      <label for="api-key">API KEY</label>
      <el-input id="api-key" v-model="input" placeholder="Please input api key." />
    </p>

    <div class="overflow-y-auto">
      <ul grid gap-3>
        <li v-for="m, index in historyMessages" :key="index" :class="getClasses(m)" list-none p-3 rounded>
          {{ m.value }}
        </li>
      </ul>
    </div>
    <div grid class="grid-cols-[1fr_15%_15%]" gap-2 items-center>
      <el-input v-model="message.value" placeholder="Please input message." @keydown.enter="handleSendMessage" />
      <el-button type="primary" :loading="loading" @click="handleSendMessage">
        {{ loading ? '' : 'Send' }}
      </el-button>
      <el-button type="danger" @click="clearHistory">
        Clear
      </el-button>
    </div>
  </div>
</template>

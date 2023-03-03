<script setup lang="ts" generic="T extends any, O extends any">
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

defineOptions({
  name: 'IndexPage',
})

const { apiKey, input, messages, loading, error, sendMessage, clearHistory } = useChat()

watch(error, (_error) => {
  if (_error) {
    ElMessage({
      message: _error,
      type: 'error',
    })
  }
})
</script>

<template>
  <div class="grid-rows-[8%_77%_15%]" grid items-center h-screen p-2>
    <TheHeader>
      <ApiKeyButton v-model="apiKey" />
    </TheHeader>

    <ChatContainer :messages="messages" self-end />

    <div grid class="grid-cols-[1fr_15%_15%]" gap-2 items-center pa-2>
      <el-input v-model="input" type="textarea" autosize placeholder="Please input message." autofocus @keydown.enter="sendMessage" />
      <el-button type="primary" :loading="loading" @click="sendMessage">
        {{ loading ? '' : 'Send' }}
      </el-button>
      <el-button type="danger" @click="clearHistory">
        Clear
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'IndexPage',
})

const { apiKey, input, messages, loading, error, sendMessage, temperature, clearHistory } = useChat()

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
  <div class="grid-rows-[8%_50%_42%]" grid items-center h-full p-2 gap-2>
    <TheHeader>
      <SettingApiKey v-model="apiKey" />
      <SettingTemperature v-model="temperature" />
    </TheHeader>
    <ChatContainer :messages="messages" self-end />

    <MessageInput v-model="input" :loading="loading" @send="sendMessage" @clear="clearHistory" />
  </div>
</template>

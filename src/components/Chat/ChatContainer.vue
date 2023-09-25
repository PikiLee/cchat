<script setup lang='ts'>
import { ElMessage } from 'element-plus'

const { input, messages, loading, error, sendMessage, clearHistory } = useChat()

watch(error, (_error) => {
  if (_error) {
    ElMessage({
      message: _error,
      type: 'error',
    })
  }
})

// scroll
const wrapperEl = ref<HTMLElement>()
const { y } = useScroll(wrapperEl, { behavior: 'smooth' })
watch(() => messages, () => {
  if (wrapperEl.value) {
    setTimeout(() => {
      y.value = wrapperEl.value!.scrollHeight
    }, 100)
  }
}, { immediate: true, deep: true })
</script>

<template>
  <section class="grid-rows-[1fr_max-content]" gap-3 h-full grid overflow-y-hidden>
    <ul ref="wrapperEl" class="wrapper" grid auto-rows-max gap-3 px-2 ma-0 items-end overflow-y-auto overflow-x-hidden>
      <ChatMessageCard v-for="m, index in messages" :key="`${m.content?.slice(0, 10)}+++${index}`" :message="m" />
    </ul>

    <MessageInput v-model="input" :loading="loading" @send="sendMessage" @clear="clearHistory" />
  </section>
</template>

<style scoped>
.wrapper :deep(img) {
  width: 100%;
  object-fit: contain;
}
</style>

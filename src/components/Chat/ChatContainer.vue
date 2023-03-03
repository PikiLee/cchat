<script setup lang='ts'>
import type { ChatCompletionRequestMessage } from 'openai'

const props = defineProps<{
  messages: ChatCompletionRequestMessage[]
}>()

// scroll
const wrapperEl = ref<HTMLElement>()
const { y } = useScroll(wrapperEl, { behavior: 'smooth' })
watch(() => props.messages, () => {
  if (wrapperEl.value) {
    setTimeout(() => {
      y.value = wrapperEl.value!.scrollHeight
    }, 100)
  }
}, { immediate: true, deep: true })
</script>

<template>
  <ul ref="wrapperEl" class="wrapper" max-h-full grid gap-3 overflow-y-auto px-2 ma-0 items-end overflow-x-hidden>
    <ChatMessageCard v-for="m, index in messages" :key="index" :message="m" />
  </ul>
</template>

<style scoped>
.wrapper :deep(img) {
  width: 100%;
  object-fit: contain;
}
</style>

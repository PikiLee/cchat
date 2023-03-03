<script setup lang='ts'>
import type { ChatCompletionRequestMessage } from 'openai'

const props = defineProps<{
  messages: ChatCompletionRequestMessage[]
}>()

function getClasses(message: ChatCompletionRequestMessage) {
  switch (message.role) {
    case 'user':
      return ['justify-self-end', 'bg-lime-400']
    case 'assistant':
      return ['justify-self-start', 'bg-slate-100']
    default:
      return []
  }
}

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
  <ul ref="wrapperEl" grid gap-3 overflow-y-auto pa-2 ma-0 items-end overflow-x-hidden>
    <li v-for="m, index in messages" :key="index" :class="getClasses(m)" class="max-w-[60%]" text-left list-none p-3 rounded>
      {{ m.content }}
    </li>
  </ul>
</template>

<style scoped lang='scss'>
</style>

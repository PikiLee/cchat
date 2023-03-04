<script setup lang='ts'>
import type { ChatCompletionRequestMessage } from 'openai'
import { useMarkdown } from '~/composables/markdown'
const props = defineProps<{
  message: ChatCompletionRequestMessage
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

const wrapperEl = ref<HTMLElement>()
useMarkdown(props.message.content, wrapperEl)
</script>

<template>
  <li ref="wrapperEl" overflow-hidden :class="getClasses(message)" class="max-w-[80%]" break-words text-left list-none px-3 rounded />
</template>

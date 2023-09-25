<script setup lang='ts'>
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import { useMarkdown } from '~/composables/markdown'
const props = defineProps<{
  message: ChatCompletionMessageParam
}>()

function getClasses(message: ChatCompletionMessageParam) {
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
const content = computed(() => props.message.content || '')
useMarkdown(content, wrapperEl)
</script>

<template>
  <li ref="wrapperEl" overflow-hidden :class="getClasses(message)" class="max-w-[80%]" break-words text-left list-none px-3 rounded />
</template>

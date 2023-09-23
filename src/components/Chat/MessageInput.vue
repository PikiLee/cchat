<script setup lang='ts'>
const props = defineProps<{
  modelValue: string
  loading: boolean
}>()

const emit = defineEmits(['update:modelValue', 'send', 'clear'])

const input = useVModel(props, 'modelValue', emit)

function sendMessage() {
  emit('send')
}

function clearHistory() {
  emit('clear')
}
</script>

<template>
  <div grid class="grid-cols-[1fr_15%_15%]" gap-2 items-center pa-2>
    <el-input v-model="input" type="textarea" autosize placeholder="Please input message." autofocus @keydown.enter.prevent="sendMessage" />
    <el-button bg-lime-400 :loading="loading" @click="sendMessage">
      {{ loading ? '' : 'Send' }}
    </el-button>
    <el-button type="danger" @click="clearHistory">
      Clear
    </el-button>
  </div>
</template>

<style scoped lang='scss'>
</style>

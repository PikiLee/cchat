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
  <div flex flex-col gap-2 pa-2>
    <div flex gap-2 justify-center>
      <el-button bg-lime-400 :loading="loading" @click="sendMessage">
        {{ loading ? '' : 'Send' }}
      </el-button>
      <el-button type="danger" @click="clearHistory">
        Clear
      </el-button>
    </div>
    <el-input v-model="input" :rows="8" type="textarea" placeholder="Please input message." autofocus @keydown.enter.prevent="sendMessage" />
  </div>
</template>

<style scoped lang='scss'>
</style>

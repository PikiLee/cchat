<script setup lang='ts'>
import { templates } from '~/template'

const history = useLocalStorage<string[]>('history', [''])
const currentIndex = useLocalStorage('currentIndex', history.value.length - 1)
const currentText = computed(() => history.value[currentIndex.value])

const canUndo = computed(() => currentIndex.value > 0)
const undo = () => {
  if (canUndo.value)
    currentIndex.value--
}
const canRedo = computed(() => currentIndex.value < history.value.length - 1)
const redo = () => {
  if (canRedo.value)
    currentIndex.value++
}
const canClearEditHistory = computed(() => history.value.length > 1)
const clearEditHistory = () => {
  history.value = ['']
  currentIndex.value = 0
}

const addEntryToHistory = (value: string) => {
  history.value = history.value.slice(0, currentIndex.value + 1)
  history.value.push(value)
  currentIndex.value++
}

useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.metaKey) {
    if (event.key === 'z' || event.key === 'Z') {
      if (event.shiftKey) {
        event.preventDefault()
        redo()
      }
      else {
        event.preventDefault()
        undo()
      }
    }
  }
  else if (event.ctrlKey) {
    if (event.key === 'z' || event.key === 'Z') {
      event.preventDefault()
      undo()
    }
    else if (event.key === 'r' || event.key === 'R') {
      event.preventDefault()
      redo()
    }
  }
})

const response = ref<string>('')
const lastInput = ref<string>('')
const { sendMessage: _sendMessage, loading, error } = useOpenAI()
const sendMessage = async (input: string) => {
  lastInput.value = input
  response.value = (await _sendMessage([
    {
      role: 'user',
      content: input,
    },
  ])).content
}
const canConfirm = computed(() => !!response.value)
const confirm = () => {
  if (response.value)
    addEntryToHistory(response.value)
}
const canRetry = computed(() => !!lastInput.value)
const retry = async () => {
  if (lastInput.value) {
    response.value = (await _sendMessage([
      {
        role: 'user',
        content: lastInput.value,
      },
    ])).content
  }
}

const responseRef = ref<HTMLDivElement>()
useMarkdown(response, responseRef)
</script>

<template>
  <section flex flex-col gap-5>
    <!-- <div>{{ history }}</div> -->
    <div text-red-4>
      {{ error }}
    </div>
    <ul flex gap-3 items-end list-none flex-wrap>
      <li>
        <el-button-group>
          <el-button type="primary" :disabled="!canUndo" :loading="loading" @click="undo()">
            Undo
          </el-button>
          <el-button type="primary" :disabled="!canRedo" :loading="loading" @click="redo()">
            Redo
          </el-button>
          <el-button type="danger" :disabled="!canClearEditHistory" :loading="loading" @click="clearEditHistory()">
            ClearEditHistory
          </el-button>
        </el-button-group>
      </li>
      <EditButtonGroup v-for="(t, index) in templates" :key="index" :input="currentText" :disabled="!currentText" :loading="loading" :template="t" @click="sendMessage" />
      <li>
        <el-button-group>
          <el-button type="primary" :disabled="!canRetry" :loading="loading" @click="retry">
            Retry
          </el-button>
          <el-button type="primary" :disabled="!canConfirm" :loading="loading" @click="confirm()">
            Confirm
          </el-button>
        </el-button-group>
      </li>
    </ul>
    <section grid grid-cols-2 gap-3>
      <el-input :model-value="currentText" type="textarea" rows="20" @update:model-value="addEntryToHistory($event)" />
      <div ref="responseRef" border-1 border-warmGray-3 border-solid rounded-lg />
    </section>
  </section>
</template>

<style scoped lang='scss'>
</style>

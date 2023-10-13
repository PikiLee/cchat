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

const addEntryToHistory = (value: string) => {
  history.value = history.value.slice(0, currentIndex.value + 1)
  history.value.push(value)
  currentIndex.value++

  if (history.value.length > 100) {
    history.value = history.value.slice(history.value.length - 100)
    currentIndex.value = history.value.length - 1
  }
}
const canClear = computed(() => currentText.value !== '')
const clear = () => {
  addEntryToHistory('')
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

const responseHistory = useLocalStorage<string[]>('responseHistory', [''])
const responseCurrentIndex = useLocalStorage('responseCurrentIndex', 0)
const response = computed({
  get() {
    return responseHistory.value[responseCurrentIndex.value]
  },
  set(value) {
    responseHistory.value[responseCurrentIndex.value] = value
  },
})

const lastInput = ref<string>('')
const { sendMessage: _sendMessage, loading, error } = useOpenAI()
const sendMessage = async (input: string) => {
  lastInput.value = input
  responseHistory.value.push('')
  responseCurrentIndex.value++
  const stream = await _sendMessage([
    {
      role: 'user',
      content: input,
    },
  ])
  if (stream) {
    for await (const part of stream)
      response.value += (part.choices[0]?.delta?.content || '')
  }
}
const canConfirm = computed(() => !!response.value)
const confirm = () => {
  if (response.value)
    addEntryToHistory(response.value)
}
const canRetry = computed(() => !!lastInput.value)
const retry = async () => {
  if (lastInput.value) {
    responseHistory.value.push('')
    responseCurrentIndex.value++
    const stream = await _sendMessage([
      {
        role: 'user',
        content: lastInput.value,
      },
    ])
    if (stream) {
      for await (const part of stream)
        response.value += (part.choices[0]?.delta?.content || '')
    }
  }
}

const canGoToPreviousResponse = computed(() => responseCurrentIndex.value > 0)
const canGoToNextResponse = computed(() => responseCurrentIndex.value < responseHistory.value.length - 1)
const goToPreviousResponse = () => {
  if (canGoToPreviousResponse.value)
    responseCurrentIndex.value--
}
const goToNextResponse = () => {
  if (canGoToNextResponse.value)
    responseCurrentIndex.value++
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
          <el-button type="danger" :disabled="!canClear" :loading="loading" @click="clear()">
            Clear
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
      <li>
        <el-button-group>
          <el-button type="primary" :disabled="!canGoToPreviousResponse" :loading="loading" @click="goToPreviousResponse">
            Previous Response
          </el-button>
          <el-button type="primary" :disabled="!goToNextResponse" :loading="loading" @click="goToNextResponse()">
            Next Response
          </el-button>
        </el-button-group>
      </li>
    </ul>
    <section grid sm:grid-cols-2 gap-3>
      <div order-2 sm:order-1>
        <el-input text-lg :model-value="currentText" type="textarea" rows="15" @update:model-value="addEntryToHistory($event)" />
      </div>
      <div ref="responseRef" order-1 sm:order-2 border-1 border-warmGray-3 border-solid rounded-lg text-left pa-4 />
    </section>
  </section>
</template>

<style scoped lang='scss'>
</style>

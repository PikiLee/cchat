<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { models, useSettingStore } from '~/stores/useSettingStore'

const settingStore = useSettingStore()
const {
  isChatMode,
  temperature,
  apiKey,
  model,
} = storeToRefs(settingStore)
const { toggleMode, toggleDark } = settingStore
</script>

<template>
  <nav text-xl mt-6 flex flex-wrap justify-center items-center gap-2>
    <el-button link @click="toggleDark()">
      <div i-carbon-moon dark:i-carbon-sun />
    </el-button>

    <a
      icon-btn i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/PikiLee/cchat"
      target="_blank"
      title="GitHub"
    />

    <SettingApiKey v-model="apiKey" />
    <SettingTemperature v-model="temperature" />
    <el-tooltip :content="isChatMode ? 'Open Edit Mode' : 'Open Chat Mode'" effect="light">
      <el-button link @click="toggleMode()">
        <div v-if="!isChatMode" i-carbon-chat text-lg />
        <div v-else i-carbon-book text-lg />
      </el-button>
    </el-tooltip>
    <el-select v-model="model" class="m-2" placeholder="Select Model" size="large">
      <el-option
        v-for="item in models"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </nav>
</template>

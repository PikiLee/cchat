<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSettingStore } from '~/stores/useSettingStore'

const settingStore = useSettingStore()
const { setting } = storeToRefs(settingStore)
const { toggleMode, toggleDark } = settingStore
</script>

<template>
  <nav text-xl mt-6 inline-flex justify-center items-center gap-2>
    <el-button link @click="toggleDark()">
      <div dark:i-carbon-moon i-carbon-sun />
    </el-button>

    <a
      icon-btn i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/PikiLee/cchat"
      target="_blank"
      title="GitHub"
    />

    <SettingApiKey v-model="setting.apiKey" />
    <SettingTemperature v-model="setting.temperature" />
    <el-button link @click="toggleMode()">
      <div v-if="setting.isChatMode" i-carbon-chat text-lg />
      <div v-else i-carbon-book text-lg />
    </el-button>
  </nav>
</template>

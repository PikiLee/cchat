<script setup lang="ts" generic="T extends any, O extends any">
import { storeToRefs } from 'pinia'
import { useSettingStore } from '~/stores/useSettingStore'

const settingStore = useSettingStore()
const { isChatMode } = storeToRefs(settingStore)
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div :class="`grid-rows-[max-content_1fr] ${isChatMode && 'h-screen overflow-y-hidden'}`" grid items-center p-4 gap-4>
    <TheHeader />
    <ChatContainer v-if="isChatMode" self-end />
    <EditContainer v-else />
  </div>
</template>

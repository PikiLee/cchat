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
  <div class="grid-rows-[8%_92%]" grid items-center h-full p-4 gap-2>
    <TheHeader />
    <ChatContainer v-if="isChatMode" self-end />
    <EditContainer v-else h-full />
  </div>
</template>

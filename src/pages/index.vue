<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="grid-rows-[8%_92%]" grid items-center h-full p-4 gap-2>
    <TheHeader />
    <ChatContainer self-end />
  </div>
</template>

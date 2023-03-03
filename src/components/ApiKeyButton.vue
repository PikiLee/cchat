<script setup lang='ts'>
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const apiKey = useVModel(props, 'modelValue', emit)
</script>

<template>
  <el-popover
    placement="bottom"
    :width="400"
    trigger="hover"
    :popper-style="{ 'text-align': 'left', 'max-width': '90%' }"
  >
    <template #reference>
      <el-button plain link>
        <span i-material-symbols-vpn-key-rounded text-lg />
      </el-button>
    </template>
    <p>
      <label for="api-key">API KEY</label>
      <el-input id="api-key" v-model="apiKey" placeholder="Please input api key" />
    </p>
    <div text-center>
      It will be stored locally and never sent to the server.
    </div>
  </el-popover>
</template>

<style scoped lang='scss'>
</style>

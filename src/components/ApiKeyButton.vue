<script setup lang='ts'>
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const apiKey = useVModel(props, 'modelValue', emit)
</script>

<template>
  <el-popover
    placement="top-end"
    :width="400"
    trigger="hover"
    :popper-style="{ 'text-align': 'left' }"
  >
    <template #reference>
      <el-button plain link>
        <span i-material-symbols-vpn-key-rounded text-lg />
      </el-button>
    </template>
    <p>
      <label for="api-key">API KEY</label>
      <el-input id="api-key" v-model="apiKey" placeholder="Please input api key." />
    </p>
  </el-popover>
</template>

<style scoped lang='scss'>
</style>

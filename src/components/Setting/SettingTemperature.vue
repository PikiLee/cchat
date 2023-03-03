<script setup lang='ts'>
const props = defineProps<{
  modelValue: number
}>()
const emit = defineEmits(['update:modelValue'])
const temperature = useVModel(props, 'modelValue', emit)
</script>

<template>
  <el-popover
    placement="bottom"
    :width="400"
    trigger="hover"
    :popper-style="{ 'text-align': 'left', 'max-width': '90%' }"
  >
    <template #reference>
      <el-button link ml-0>
        <span i-carbon-temperature-hot text-lg />
      </el-button>
    </template>
    <p>
      <label for="temperature">Temperature</label>
      <el-slider id="temperature" v-model="temperature" :min="0" :max="1" :step="0.01" />
    </p>
    <div text-center>
      Lowering temperature means chatgpt will take fewer risks, and completions will be more accurate and deterministic. Increasing temperature will result in more diverse completions.
    </div>
  </el-popover>
</template>

<style scoped lang='scss'>
</style>

<script setup lang='ts'>
import type { Template } from '~/template/type'

defineProps<{
  input: string
  disabled: boolean
  loading: boolean
  template: Template
}>()

defineEmits(['click'])
</script>

<template>
  <li v-if="template.type === 'group'">
    <h3>{{ template.title }}</h3>
    <el-button-group>
      <el-tooltip v-for="option in template.options" :key="option.title" popper-class="max-w-xs whitespace-pre-wrap" effect="light" :content="template.applyTemplate(input, option.value)">
        <el-button type="primary" :disabled="disabled" :loading="loading" @click="$emit('click', template.applyTemplate(input, option.value))">
          {{ option.title }}
        </el-button>
      </el-tooltip>
    </el-button-group>
  </li>
  <li v-else>
    <el-tooltip popper-class="max-w-xs whitespace-pre-wrap" effect="light" :content="template.applyTemplate(input)">
      <el-button type="primary" :disabled="disabled" :loading="loading" @click="$emit('click', template.applyTemplate(input))">
        {{ template.title }}
      </el-button>
    </el-tooltip>
  </li>
</template>

<style scoped lang='scss'>
</style>

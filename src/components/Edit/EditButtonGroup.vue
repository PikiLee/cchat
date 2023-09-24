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
      <el-button v-for="option in template.options" :key="option.title" type="primary" :disabled="disabled" :loading="loading" @click="$emit('click', template.applyTemplate(input, option.value))">
        {{ option.title }}
      </el-button>
    </el-button-group>
  </li>
  <li v-else>
    <el-button type="primary" :disabled="disabled" :loading="loading" @click="$emit('click', template.applyTemplate(input))">
      {{ template.title }}
    </el-button>
  </li>
</template>

<style scoped lang='scss'>
</style>

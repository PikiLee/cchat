<template>
  <nav text-xl mt-6 inline-flex justify-center items-center gap-2>
    <el-button link @click="toggleDark()">
      <div dark:i-carbon-moon i-carbon-sun />
    </el-button>

    <a
      icon-btn i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    />

    <slot />
  </nav>
</template>

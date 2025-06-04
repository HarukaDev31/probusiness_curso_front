<script setup lang="ts">
defineProps<{
  progress: number
}>()
</script>

<template>
  <div class="relative pt-1">
    <div class="overflow-hidden h-2 mb-1 text-xs flex rounded-full bg-primary-100">
      <div
        :style="{ width: `${progress}%` }"
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-1000 ease-out"
      ></div>
    </div>
  </div>
</template>
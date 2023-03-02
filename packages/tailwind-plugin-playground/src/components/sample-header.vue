<template>
  <h2
    class="text-3xl text-blue-[25] font-bold sticky top-16 py-4 bg-black/80 -mx-6 px-6 backdrop-blur-sm"
  >
    {{ label }}
  </h2>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

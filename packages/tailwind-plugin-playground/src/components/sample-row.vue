<template>
  <section class="space-y-2">
    <h3 class="text-2xl">{{ title }}</h3>
    <div class="flex flex-wrap gap-4"><slot /></div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

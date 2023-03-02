<template>
  <section class="space-y-2">
    <h3 class="text-2xl">{{ title }}</h3>
    <div class="grid items-stretch sm:grid-cols-2 lg:grid-cols-3 gap-4"><slot /></div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <p>other docs?</p>
</template>

<script setup lang="ts">
const router = useRouter()
onMounted(() => {
  router.push('/tailwind-plugin/accent')
})
</script>

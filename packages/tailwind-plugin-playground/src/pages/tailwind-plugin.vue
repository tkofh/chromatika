<template>
  <div class="px-4 md:px-12">
    <header
      class="h-16 border-b-2 border-neutral-800 flex items-center justify-between bg-black/80 w-full z-10 fixed top-0 backdrop-blur-sm -mx-4 px-4 md:-mx-12 md:px-12"
    >
      <h1
        class="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-pink-500 to-purple-500"
      >
        Chromatika Tailwind Plugin
      </h1>
      <button class="block text-white md:hidden w-10 h-10 p-2" @click="() => (menuOpen = true)">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          ></path>
        </svg>
      </button>
    </header>
    <div class="relative mt-8 grid gap-12 md:grid-cols-[minmax(0px,1fr),auto]">
      <main class="space-y-12 pb-16">
        <NuxtPage></NuxtPage>
      </main>
      <aside
        class="hidden md:block w-[200px] pl-6 lg:w-[320px] lg:pl-20 h-[calc(100dvh-6rem)] overflow-auto sticky top-24"
      >
        <NavMenu></NavMenu>
      </aside>
    </div>
    <div
      class="fixed inset-0 bg-black/20 md:hidden z-20"
      @click="() => (menuOpen = false)"
      v-if="menuOpen"
    ></div>
    <aside
      class="fixed inset-y-0 left-0 w-2/3 md:hidden bg-neutral-800 shadow-xl z-40 p-8"
      v-if="menuOpen"
    >
      <NavMenu></NavMenu>
    </aside>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
</script>

<style>
html,
body,
#__nuxt {
  min-height: 100%;
  height: max(auto, 100%);
  background-color: black;
  color: white;
}
</style>

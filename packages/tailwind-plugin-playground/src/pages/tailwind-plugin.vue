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
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/tkofh/chromatika"
          class="w-10 h-10 p-2 block text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
            />
          </svg>
        </a>
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
      </div>
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

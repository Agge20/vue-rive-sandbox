<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Menubar from 'primevue/menubar';
import { vConfetti } from '@neoconfetti/vue';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const dialogVisible = ref<boolean>(false)
</script>

<template>
  <header class="w-full fixed top-5 px-5 z-50">
    <Menubar class="mx-auto max-w-8xl">
      <template #start>
        <strong>Vue rive sandbox</strong>
      </template>

      <template #end>
        <Button label="Show dialog with links 🧐" severity="info" @click="dialogVisible = true" />
        <Dialog v-model:visible="(dialogVisible)" header="Links and stuff 🤓"
          :style="{ width: '100%', 'max-width': '32rem' }">
          <div class="flex items-center gap-4 mb-4 w-full">
            <ul>
              <li>
                <Button variant="link" as="a" label="Rive documentation web-js" class="!px-0"
                  href="https://rive.app/community/doc/web-js/docvlgbnS1mp" target="_blank" rel="noopener" />
              </li>
              <li>
                <Button variant="link" as="a" label="PrimeVue Dialog component" class="!px-0"
                  href="https://primevue.org/dialog/" target="_blank" rel="noopener" />
              </li>
            </ul>
          </div>
        </Dialog>
      </template>
    </Menubar>
  </header>
  <main class="mx-auto max-w-8xl pt-32 px-5">
    <div class="absolute left-0 top-0 w-screen h-screen">
      <div v-confetti class="mx-auto w-full h-full"></div>
    </div>
    <RouterView />
  </main>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

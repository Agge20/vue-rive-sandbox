<script setup lang="ts">

import VRive from '@/components/VRive.vue';

import { useTemplateRef } from 'vue';

import type { Rive } from '@rive-app/canvas';


import useStateMachineInput from '@/composables/useStateMachinesInput';

const changeHairRef = useTemplateRef<HTMLButtonElement>("change-hair")
const changeEyesRef = useTemplateRef<HTMLButtonElement>("change-eyes")

function onLoadFelixAvatarCreator(riveInstance: Rive) {

  riveInstance.resizeDrawingSurfaceToCanvas();
  const eyesNextInput = useStateMachineInput(riveInstance, 'State Machine 1', 'Eyes next');
  const hairNextInput = useStateMachineInput(riveInstance, 'State Machine 1', 'Hair next');

  if (changeHairRef.value) {
    changeHairRef.value.onclick = () => {
      if (hairNextInput) {
        hairNextInput.fire();
      }
    };
  }

  if (changeEyesRef.value) {
    changeEyesRef.value.onclick = () => {
      if (eyesNextInput) {
        eyesNextInput.fire();
      }
    };
  }
}

const rives = {
  felixAvatarCreator: {
    params: {
      src: "/assets/riv/felix_avatar_creator.riv",
      autoplay: true,
      stateMachines: "State Machine 1",
      animations: [],
    },
    options: {},

  },
  randomAvatarCreator: {
    params: {
      src: "/assets/riv/random_avatar_creator.riv",
      autoplay: true,
      stateMachines: "State Machine 1",
      animations: [],
    },
    options: {}
  }
}

</script>

<template>
  <div class="flex items-center justify-center flex-col gap-y-5">
    <div class="gap-20 min-w-44">
      <div class="flex flex-col gap-y-5">
        <h2 class="text-lg sm:text-4xl text-white mb-5 text-center">Felix's avatar creator</h2>
        <button ref="change-hair" class="p-button w-full">
          Change hair 👱‍♀️
        </button>

        <button ref="change-eyes" class="p-button w-full">
          Change eyes 👀
        </button>
      </div>
    </div>
    <div class="h-[800px] w-full">
      <VRive id="felix-avatar-creator" :rive-params="rives.felixAvatarCreator.params"
        :options="rives.felixAvatarCreator.options" @riveLoaded="onLoadFelixAvatarCreator" />
    </div>
  </div>

  <div class="flex items-center justify-center flex-col gap-y-5 mt-20">
    <h2 class="text-lg sm:text-4xl text-white">Random avatar creator</h2>
    <div class="h-[800px] w-full">
      <VRive id="random-avatar-creator" :rive-params="rives.randomAvatarCreator.params"
        :options="rives.randomAvatarCreator.options" />
    </div>
  </div>
</template>

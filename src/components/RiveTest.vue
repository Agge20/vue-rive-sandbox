<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import * as rive from "@rive-app/canvas";
import type { Rive } from '@rive-app/canvas';

let riveInstance: Rive;

const input = useTemplateRef('fire-input')

onMounted(() => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  riveInstance = new rive.Rive({
    src: "/src/assets/avatar.riv",
    // OR the path to a discoverable and public Rive asset
    // src: '/public/example.riv',
    canvas,
    autoplay: true,
    stateMachines: ['State Machine 1'],
    onStateChange: (event) => {
      console.log("event: ", event);
    },
    // artboard: "Arboard", // Optional. If not supplied the default is selected
    onLoad: () => {
      riveInstance.resizeDrawingSurfaceToCanvas();

      console.log("all state machines: ", riveInstance.stateMachineNames);

      // Get the inputs via the name of the state machine
      const inputs = riveInstance.stateMachineInputs('State Machine 1');
      // Find the input you want to set a value for, or trigger
      const stateMachineValue = inputs.find(i => i.name === '%');

      console.log("here be stateMachineTrigger: ", stateMachineValue);

      if (input.value && stateMachineValue) {
        input.value.onclick = () => {
          if (typeof stateMachineValue.value === 'number') {
            stateMachineValue.value++;
          }
        };
      }
    },
  });

  function resizeListener(): void {
    riveInstance.resizeDrawingSurfaceToCanvas();
  };

  window.addEventListener("resize", resizeListener);

  onUnmounted(() => {
    console.log("onUnmounted ran...");
    window.removeEventListener("resize", resizeListener);

    riveInstance.cleanup();
  });
});
</script>

<template>
  <div class="greetings">
    <button ref="fire-input">Fire state machine input</button>

    <canvas id="canvas" width="500" height="500"></canvas>

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

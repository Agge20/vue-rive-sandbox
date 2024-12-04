<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from "vue";
import { EventType, Rive } from "@rive-app/canvas";
import { useWindowSize } from "@/composables/useWindowSize";
import type { Dimensions } from "@/types";

interface UseRiveParameters {
  animations: string[];
}

interface UseRiveOptions {
  useDevicePixelRatio?: boolean;
  fitCanvasToArtboardHeight?: boolean;
  useOffscreenRenderer?: boolean;
}

const props = defineProps<{
  riveParams: UseRiveParameters;
  options: UseRiveOptions;

}>();

const emit = defineEmits(['riveLoaded']);

/**
 * Template Refs
 */
const canvas = ref<HTMLCanvasElement | null>(null);
const container = ref<HTMLElement | null>(null);

/**
 * Reactive variables
 */
const { width, height } = useWindowSize();
const RiveInstance = ref<Rive | null>(null);
const dimensions = ref<Dimensions>({
  width: 0,
  height: 0,
});

/**
 * Default Rive options will be overwritten if options are passed in
 */
const defaultOptions: UseRiveOptions = {
  useDevicePixelRatio: true,
  fitCanvasToArtboardHeight: false,
  useOffscreenRenderer: true,
};

/**
 * Computed Rive Options
 */
const options = computed(() => ({
  ...defaultOptions,
  ...props.options,
}));

const animations = computed(() => props.riveParams.animations);

/**
 * Updates the canvas dimensions and Rive instance
 */
function updateCanvasDimensions() {
  if (canvas.value && container.value) {
    const { width, height } = getCanvasDimensions();
    const boundsChanged =
      width !== dimensions.value.width || height !== dimensions.value.height;

    if (boundsChanged) {
      if (options.value.fitCanvasToArtboardHeight) {
        container.value.style.height = `${height}px`;
      }
      if (options.value.useDevicePixelRatio) {
        const dpr = window.devicePixelRatio || 1;
        canvas.value.width = dpr * width;
        canvas.value.height = dpr * height;
        canvas.value.style.width = width + "px";
        canvas.value.style.height = height + "px";
      } else {
        canvas.value.width = width;
        canvas.value.height = height;
      }
      dimensions.value = { width, height };
      RiveInstance.value?.startRendering();
    }
    RiveInstance.value?.resizeToCanvas();
  }
}

/**
 * Gets dimensions of container and returns width and height
 */
function getCanvasDimensions(): Dimensions {
  const { width, height } =
    container.value?.getBoundingClientRect() || new DOMRect(0, 0, 0, 0);

  if (RiveInstance.value && options.value.fitCanvasToArtboardHeight) {
    const { maxY, maxX } = RiveInstance.value.bounds;
    return { width, height: width * (maxY / maxX) };
  }
  return { width, height };
}

/**
 * Watches for changes in window size
 */
watch([width, height], updateCanvasDimensions);

/**
 * Watches for changes in animations and updates the Rive instance
 */
watch(animations, () => {
  if (RiveInstance.value && animations.value) {
    RiveInstance.value.stop(RiveInstance.value.animationNames);
    RiveInstance.value.play(animations.value);
  }
});

/**
 * Initializes the Rive instance on mount
 */
onMounted(() => {
  if (canvas.value) {
    const { useOffscreenRenderer } = options.value;
    const r = new Rive({
      useOffscreenRenderer,
      ...props.riveParams,
      canvas: canvas.value,
    });
    r.on(EventType.Load, () => {
      r.resizeDrawingSurfaceToCanvas();
      RiveInstance.value = r;
      emit('riveLoaded', r);
    });
  }
});

/**
 * Cleans up the Rive instance on unmount
 */
onUnmounted(() => {
  RiveInstance.value?.stopRendering();
  RiveInstance.value = null;
});
</script>

<template>
  <div ref="container">
    <canvas ref="canvas" style="vertical-align: top"></canvas>
  </div>
</template>

<style scoped>
div {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

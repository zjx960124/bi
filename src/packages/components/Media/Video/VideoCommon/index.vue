<template>
  <div>
    <video
      :src="src"
      :autoplay="autoplay"
      :muted="muted"
      :loop="loop"
      class="video"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

let { src, autoplay, muted, loop } = toRefs(props.chartConfig.option);

watch(props.chartConfig, (val) => {
  console.log(val);
});
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  height: 100%;
}
</style>

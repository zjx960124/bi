<template>
  <div :style="`background-color: ${backgroundColor}`">
    <img
      class="img"
      :src="backgroundImageType === 'image' ? backgroundImage : url"
      :style="`object-fit: ${objectFit}`"
    />
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

let {
  src,
  url,
  backgroundColor,
  backgroundImage,
  backgroundImageType,
  objectFit,
} = toRefs(props.chartConfig.option);

console.log(props.chartConfig);
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
}
</style>

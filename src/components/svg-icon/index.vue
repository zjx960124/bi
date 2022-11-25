<script lang="ts">
export default {
  name: "svgIcon",
};
</script>

<template>
  <div
    v-if="isOnlineSvg"
    :style="{ '--svg-icon-url': `url(${icon})` }"
    class="svg-icon svg-icon-online"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    icon?: string;
    className?: string;
  }>(),
  {
    icon: "",
    className: "",
  }
);

const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon));
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>

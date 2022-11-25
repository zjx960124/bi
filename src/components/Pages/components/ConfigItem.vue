<script setup lang="ts">
import { ref, PropType } from 'vue';

const props = defineProps({
  name: {
    type: String,
    requeired: true,
  },
});
</script>
<template>
  <div class="common-item">
    <slot name="space"></slot>
    <div class="common-sub-title">{{ props.name }}</div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped></style>

<template>
  <BaseSetting :attr="attr" :optionData="optionData">
    <template #target>
      <ImageSetting :optionData="optionData"></ImageSetting>
    </template>
  </BaseSetting>
</template>

<script setup lang="ts">
import { BaseSetting } from '@/components/Pages/ChartItemSetting';
import { ImageSetting } from '@/components/Pages/components/index';
const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss" scoped></style>

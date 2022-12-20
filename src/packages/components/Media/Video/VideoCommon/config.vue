<template>
  <BaseSetting :attr="attr" :optionData="optionData">
    <template #target>
      <VideoSetting :optionData="optionData"></VideoSetting>
    </template>
  </BaseSetting>
</template>

<script setup lang="ts">
import { BaseSetting } from '@/components/Pages/ChartItemSetting';
import { VideoSetting } from '@/components/Pages/components';
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

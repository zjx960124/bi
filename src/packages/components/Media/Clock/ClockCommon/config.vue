<template>
  <BaseSetting :attr="attr" :optionData="optionData">
    <template #target>
      <TextSetting type="Clock" :optionData="optionData"></TextSetting>
    </template>
    <template #process>
      <ClockSetting :optionData="optionData"> </ClockSetting>
    </template>
  </BaseSetting>
</template>

<script setup lang="ts">
import { BaseSetting } from '@/components/Pages/ChartItemSetting';
import { TextSetting, ClockSetting } from '@/components/Pages/components';
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

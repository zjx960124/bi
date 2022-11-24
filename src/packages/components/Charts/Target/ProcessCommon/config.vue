<template>
  <BaseSetting :attr="attr" :optionData="optionData">
    <template #process>
      <ProcessSetting :optionData="optionData"></ProcessSetting>
    </template>
    <template #label>
      <LabelSetting :optionData="optionData"></LabelSetting>
    </template>
    <template #default>
      <AnimationSetting :optionData="optionData"></AnimationSetting>
    </template>
  </BaseSetting>
</template>

<script setup lang="ts">
import { PropType, toRefs, markRaw } from 'vue';
import { option, types, indicatorPlacements } from './config';
import { BaseSetting } from '@/components/Pages/ChartItemSetting';
import {
  ProcessSetting,
  LabelSetting,
  AnimationSetting,
} from '@/components/Pages/components';

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
});
</script>

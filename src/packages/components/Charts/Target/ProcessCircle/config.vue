<template>
  <BaseSetting :attr="attr" :optionData="optionData">
    <template #process>
      <ProcessSetting :optionData="optionData"></ProcessSetting>
    </template>
  </BaseSetting>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { option, types, indicatorPlacements } from './config';
import { BaseSetting } from '@/components/Pages/ChartItemSetting';
import { ProcessSetting } from '@/components/Pages/components';

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

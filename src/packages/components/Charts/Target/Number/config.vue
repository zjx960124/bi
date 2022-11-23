<template>
  <BaseSetting :attr="attr" :optionData="optionData">
    <template #target>
      <NumberSetting :optionData="optionData"></NumberSetting>
    </template>
  </BaseSetting>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BaseSetting } from '@/components/Pages/ChartItemSetting';
import { NumberSetting } from '@/components/Pages/components';
import { GlobalThemeJsonType } from '@/settings/chartThemes/index';

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
});
</script>

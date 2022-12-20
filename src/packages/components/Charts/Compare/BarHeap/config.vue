<template>
  <common-setting
    :attr="attr"
    :optionData="optionData"
    :themeColor="themeColor"
    type="barCommon"
  >
    <template #series>
      <bar-common-setting :optionData="optionData"></bar-common-setting>
    </template>
  </common-setting>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import {
  CommonSetting,
  BarCommonSetting,
} from '@/components/Pages/ChartItemSetting';
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
  themeColor: {
    type: Object,
    required: true,
  },
});
</script>

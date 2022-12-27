<template>
  <pie-common-setting
    :attr="attr"
    :optionData="optionData"
    :themeColor="themeColor"
    :layout="layout"
    :card="card"
    type="barCommon"
  >
    <template #series>
      <progress-component
        label="半径占比"
        :target="props.optionData.series.radius"
      ></progress-component>
      <pie-label-common :series="optionData.series"></pie-label-common>
    </template>
  </pie-common-setting>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { PieCommonSetting } from "@/components/Pages/ChartItemSetting";
import {
  ProgressComponent,
  PieLabelCommon,
} from "@/components/Pages/components";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";
import { option } from "@/packages/components/Charts/Distribution/PieCommon/config";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType & typeof option>,
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
  layout: {
    type: Object,
    required: true,
  },
  card: {
    type: Object,
    required: true,
  },
});
</script>

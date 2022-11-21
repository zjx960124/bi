<script setup lang="ts">
import { PropType, ref, } from "vue";
import {
  chartColorsList,
  ChartColorsNameType,
} from "@/settings/chartThemes/index";
import { GlobalThemeJsonType } from "@/settings/chartThemes";
const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
  themeColor: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    requeire: true,
  },
});
const value = ref<string | number | boolean>("vertical");
const changeBarDirection = (val: string | number | boolean): void => {
  value.value = val;
  if (val === "level") {
    props.optionData.xAxis.type = "value";
    props.optionData.yAxis.type = "category";
  }
  if (val === "vertical") {
    props.optionData.xAxis.type = "category";
    props.optionData.yAxis.type = "value";
  }
  if (props.type === "barCommon") {
    const radius = props.optionData.series.itemStyle.borderRadius;
    if (Math.max(...radius) > 0) {
      const max = Math.max(...radius);
      if (val === "level") {
        props.optionData.series.itemStyle.borderRadius = [0, max, max, 0];
      }
      if (val === "vertical") {
        props.optionData.series.itemStyle.borderRadius = [max, max, 0, 0];
      }
    }
  }
  if (props.optionData.series.label.show) {
    if (val === "level") {
      props.optionData.series.label.position = "right";
    }
    if (val === "vertical") {
      props.optionData.series.label.position = "top";
    }
  }
};
const selectTheme = (theme: ChartColorsNameType) => {
  props.themeColor.color = theme;
};
</script>
<template>
  <div class="common-item">
    <div class="common-sub-title">色系选择</div>
    <n-select class="common-select" v-model:value="themeColor.color" round size="small" :options="chartColorsList"
      :on-update:value="selectTheme" />
  </div>
  <div class="common-item">
    <div class="common-sub-title">展示方向</div>
    <n-radio-group class="common-radio-group" v-model:value="value" name="radiogroup"
      :on-update:value="changeBarDirection">
      <n-space>
        <n-radio key="1" value="level"> 水平 </n-radio>
        <n-radio key="2" value="vertical"> 垂直 </n-radio>
      </n-space>
    </n-radio-group>
  </div>
</template>
<style lang='scss' scoped>

</style>

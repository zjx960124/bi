<script setup lang="ts">
import { computed, watch } from "vue";
import { chartColors } from "@/settings/chartThemes/index";
import { getSizeStyle, getComponentAttrStyle } from "@/utils/hooks/useStyle";
import { componentInstall } from "@/utils";

const props = defineProps({
  componentList: {
    type: Object as PropType<ChartEditStorageType>,
    required: true,
  },
});

// 主题色
const themeSetting = computed(() => {
  const chartThemeSetting =
    props.componentList.editCanvasConfig.chartThemeSetting;
  return chartThemeSetting;
});

// 配置项
const themeColor = computed(() => {
  const chartThemeColor = props.componentList.editCanvasConfig.chartThemeColor;
  return chartColors[chartThemeColor];
});
</script>
<template>
  <div
    class="chart-item"
    v-for="(item, index) in componentList.componentList"
    :key="item.id"
    :style="{
      ...getComponentAttrStyle(item.attr, index),
    }"
  >
    <component
      :is="item.chartConfig.chartKey"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="item.themeColor"
      :style="{ ...getSizeStyle(item.attr) }"
    ></component>
  </div>
</template>
<style lang='scss' scoped>
.chart-item {
  position: absolute;
}
</style>

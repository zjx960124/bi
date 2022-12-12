<script setup lang="ts">
import { computed, watch } from 'vue';
import { chartColors } from '@/settings/chartThemes/index';
import { getSizeStyle, getComponentAttrStyle } from '@/utils/hooks/useStyle';

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
  <template v-for="(item, index) in componentList.componentList" :key="item.id">
    <div
      class="chart-item"
      :style="{
        ...getComponentAttrStyle(item.attr, index),
      }"
    >
      <component
        v-show="item.chartConfig.chartKey"
        :is="item.chartConfig.chartKey"
        :chartConfig="item"
        :themeSetting="themeSetting"
        :themeColor="item.themeColor"
        :style="{ ...getSizeStyle(item.attr) }"
      ></component>
    </div>
  </template>
</template>
<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>

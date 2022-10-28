<script setup lang="ts">
import { computed } from "vue";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
const chartEditStore = useChartEditStore();

const selectTarget = computed(() => {
  const selectId = chartEditStore.getTargetChart.selectId;
  // 排除多个
  if (selectId.length !== 1) return undefined;
  const target =
    chartEditStore.componentList[chartEditStore.fetchTargetIndex()];
  if (target?.isGroup) {
    tabsSelect.value = "chartSetting";
  }
  return target;
});
</script>
<template>
  <div>
    配置区域111
    <div v-if="!selectTarget">通用配置</div>
    <div v-if="selectTarget">组件配置</div>
  </div>
</template>
<style lang='scss' scoped>
</style>

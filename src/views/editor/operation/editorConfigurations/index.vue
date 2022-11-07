<script setup lang="ts">
import { computed, ref } from "vue";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { CommonConfiguration } from "./common";
import { ComponentConfiguration } from "./componentConfiguration";
const chartEditStore = useChartEditStore();

enum TabsEnum {
  PAGE_SETTING = "pageSetting",
  CHART_SETTING = "chartSetting",
  CHART_ANIMATION = "chartAnimation",
  CHART_DATA = "chartData",
}

const tabsSelect = ref<TabsEnum>(TabsEnum.CHART_SETTING);

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
  <div class="editor-configuration-view">
    <div v-if="!selectTarget" class="common-configuration">
      <common-configuration></common-configuration>
    </div>
    <div v-if="selectTarget" class="component-configuration">
      <component-configuration></component-configuration>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.editor-configuration-view {
  width: fit-content;
  height: 100%;
  .common-configuration {
    width: 270px;
    height: 100%;
  }
  .component-configuration {
    width: 430px;
    height: 100%;
  }
}
</style>

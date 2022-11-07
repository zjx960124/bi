<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Draggable from "vuedraggable";
import cloneDeep from "lodash/cloneDeep";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { useContextMenu } from "@/views/editor/charts/hooks/useContextMenu.hook";
import { MenuOptionsItemType } from "@/views/editor/charts/hooks/useContextMenu.hook.d";

const chartEditStore = useChartEditStore();
const { handleContextMenu } = useContextMenu();
const layerList = ref<any>([]);

// 逆序展示
const reverseList = computed(() => {
  const list = cloneDeep(chartEditStore.getComponentList);
  return list.reverse();
});

watch(
  () => reverseList.value,
  (newValue) => {
    layerList.value = newValue;
  }
);
// 移动结束处理
const onMoveCallback = (val: any) => {
  const { oldIndex, newIndex } = val.moved;
  if (newIndex - oldIndex > 0) {
    // 从上往下
    const moveTarget = chartEditStore.getComponentList.splice(
      -(oldIndex + 1),
      1
    )[0];
    chartEditStore.getComponentList.splice(-newIndex, 0, moveTarget);
  } else {
    // 从下往上
    const moveTarget = chartEditStore.getComponentList.splice(
      -(oldIndex + 1),
      1
    )[0];
    if (newIndex === 0) {
      chartEditStore.getComponentList.push(moveTarget);
    } else {
      chartEditStore.getComponentList.splice(-newIndex, 0, moveTarget);
    }
  }
};
// 点击事件
const mousedownHandle = (e: MouseEvent, item: CreateComponentType) => {
  onClickOutSide();
  // 若此时按下了 CTRL, 表示多选
  const id = item.id;
  if (
    e.buttons === MouseEventButton.LEFT &&
    (window.$KeyboardActive?.has(WinKeyboard.CTRL_SOURCE_KEY) ||
      window.$KeyboardActive?.has(MacKeyboard.CTRL_SOURCE_KEY))
  ) {
    // 若已选中，则去除
    if (chartEditStore.targetChart.selectId.includes(id)) {
      const exList = chartEditStore.targetChart.selectId.filter(
        (e) => e !== id
      );
      chartEditStore.setTargetSelectChart(exList);
    } else {
      chartEditStore.setTargetSelectChart(id, true);
    }
    return;
  }
  chartEditStore.setTargetSelectChart(id);
};

// 进入事件
const mouseenterHandle = (item: CreateComponentType) => {
  chartEditStore.setTargetHoverChart(item.id);
};

// 移出事件
const mouseleaveHandle = (item: CreateComponentType) => {
  chartEditStore.setTargetHoverChart(undefined);
};
</script>
<template>
  <div>
    <draggable item-key="id" v-model="layerList" @change="onMoveCallback">
      <template #item="{ element }">
        <div class="go-content-layer-box">
          <div
            @mousedown="mousedownHandle($event, element)"
            @mouseenter="mouseenterHandle(element)"
            @mouseleave="mouseleaveHandle(element)"
            @contextmenu="handleContextMenu($event, element, optionsHandle)"
          >
            <div class="element-item">
              <n-icon></n-icon>
              <span>{{ element.chartConfig.title }}</span>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
<style lang='scss' scoped>
.go-content-layer-box {
  .element-item {
    width: calc(100% - 20px);
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
    background: #f3f5ff;
    color: #6b797f;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
  }
}
.go-content-layer-box + .go-content-layer-box {
  margin-top: 11px;
}
</style>

<template>
  <div class="go-shape-box">
    <slot></slot>
    <!-- 锚点 -->
    <template v-if="!hiddenPoint">
      <div
        :class="`shape-point ${point}`"
        v-for="(point, index) in select ? pointList : []"
        :key="index"
        :style="usePointStyle(point, index, item.attr, cursorResize)"
        @mousedown="useMousePointHandle($event, point, item.attr)"
      ></div>
    </template>

    <!-- 选中 -->
    <div class="shape-modal" :style="useSizeStyle(item.attr)">
      <div class="shape-modal-select" :class="{ active: select }"></div>
      <div
        class="shape-modal-change"
        :class="{ selectActive: select, hoverActive: hover }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { useDesignStore } from "@/store/designStore/designStore";
import {
  CreateComponentType,
  CreateComponentGroupType,
} from "@/packages/index.d";
import { useSizeStyle, usePointStyle } from "@/utils/hooks/useStyle";
import { useMousePointHandle } from "@/utils/hooks/useDrag";

const props = defineProps({
  item: {
    type: Object as PropType<CreateComponentType | CreateComponentGroupType>,
    required: true,
  },
  hiddenPoint: {
    type: Boolean,
    required: false,
  },
});

const designStore = useDesignStore();
const chartEditStore = useChartEditStore();

// 锚点
const pointList = ["t", "r", "b", "l", "lt", "rt", "lb", "rb"];

// 光标朝向
const cursorResize = ["n", "e", "s", "w", "nw", "ne", "sw", "se"];

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme;
});

// 计算当前选中目标
const hover = computed(() => {
  return props.item.id === chartEditStore.getTargetChart.hoverId;
});

// 兼容多值场景
const select = computed(() => {
  const id = props.item.id;
  return chartEditStore.getTargetChart.selectId.find((e: string) => e === id);
});
</script>

<style lang="scss" scoped>
@include go(shape-box) {
  position: absolute;
  cursor: move;
  /* 锚点 */
  .shape-point {
    z-index: 1;
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 3px solid v-bind("themeColor");
    background-color: #fff;
    transform: translate(-40%, -30%);
    &.t {
      transform: translate(-50%, -50%);
    }
    &.b {
      transform: translate(-50%, -30%);
    }
    &.l,
    &.r {
    }
    &.r {
      transform: translate(-20%, -50%);
    }
    &.l {
      transform: translate(-45%, -50%);
    }
    &.rt,
    &.rb {
      transform: translate(-30%, -30%);
    }
  }
  /* 选中 */
  .shape-modal {
    position: absolute;
    top: 0;
    left: 0;

    .shape-modal-select,
    .shape-modal-change {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }

    .shape-modal-select {
      opacity: 0.1;
      top: 2px;
      left: 2px;
      &.active {
        background-color: #ffffff;
      }
    }
    .shape-modal-change {
      border: 2px dashed rgba(0, 0, 0, 0);
      &.selectActive,
      &.hoverActive {
        border-color: v-bind("themeColor");
        border-width: 2px;
      }
      &.hoverActive {
        border-style: dotted;
      }
      &.selectActive {
        border-style: dashed;
      }
    }
  }
}
</style>

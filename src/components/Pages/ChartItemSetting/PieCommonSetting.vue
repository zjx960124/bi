<script setup lang="ts">
import {
  ChevronUp,
} from "@vicons/ionicons5";
import { PropType } from "vue";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";
import { Coordinates, PaintingCommon, Shaft, LegendCommon } from "../components";
import {
  chartColorsList,
  ChartColorsNameType,
} from "@/settings/chartThemes/index";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    requeire: true,
  },
  themeColor: {
    type: Object,
    required: true,
  },
});

const selectTheme = (theme: ChartColorsNameType) => {
  props.themeColor.color = theme;
};
</script>
<template>
  <n-collapse :default-expanded-names="['1', '2']">
    <coordinates :attr="props.attr"></coordinates>
    <n-collapse-item title="绘色区域" name="1">
      <div class="common-item">
        <div class="common-sub-title">色系选择</div>
        <n-select class="common-select" v-model:value="themeColor.color" round size="small" :options="chartColorsList"
          :on-update:value="selectTheme" />
      </div>
      <slot name="series"></slot>
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
    <n-collapse-item title="图例" name="2">
      <legend-common :optionData="props.optionData"></legend-common>
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
  </n-collapse>
</template>
<style lang='scss' scoped>
.n-collapse {
  height: 100%;
  display: flex;
  flex-direction: column;

  .n-collapse-item {
    width: 100%;
    background: #ffffff;
    border-radius: 15px;

    :deep .n-collapse-item__header {
      color: #293270;
      font-family: "PingFang-SC-Bold";
      font-weight: bold;
      font-size: 14px;
      height: 33px;
      margin: 0 10px;
      position: relative;
      padding: 0 0 0 16px;
      background-color: #f3f5ff;
      border-radius: 6px;

      .n-collapse-item__header-main {
        .n-collapse-item-arrow {
          position: absolute;
          right: 22px;
          top: 8px;
        }
      }
    }

    :deep .n-collapse-item__content-inner {
      padding: 0 25px 18px 25px;
    }
  }

  :deep .n-collapse-item.n-collapse-item--active {
    .n-collapse-item__header.n-collapse-item__header--active {
      .n-collapse-item-arrow {
        transform: rotate(180deg);
      }
    }
  }

  .n-collapse-item:not(:first-child) {
    border-top: 0px;
  }
}
</style>

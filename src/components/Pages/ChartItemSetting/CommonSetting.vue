<script setup lang="ts">
import {
  ChevronUp,
  CaretUp,
  CaretBack,
  CaretForward,
  CaretDown,
  ChevronDown,
} from "@vicons/ionicons5";
import { PropType, computed, ref, watch } from "vue";
import { GlobalThemeJsonType } from "@/settings/chartThemes/index";
import { LegendConfiguration } from "@/enums/chartConfiguration";
import merge from "lodash/merge";
import pick from "lodash/pick";
import omit from "lodash/omit";
import { menuItemGroupProps } from "element-plus";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { isObject } from "@/utils";

import { Coordinates, PaintingCommon, Shaft } from "../components/index.ts";

const chartEditStore = useChartEditStore();

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

const title = computed(() => {
  return props.optionData.title;
});

const legend = computed(() => {
  return props.optionData.legend;
});

const visualMap = computed(() => {
  return props.optionData.visualMap;
});

const legendFontWeightFlag = ref({ type: false });
const legendFontStyleFlag = ref({ type: false });

const legendCurrentPosition = computed(() => {
  return props.optionData.legend.legendPosition || "";
});

const legendPosition = (position: string) => {
  props.optionData.legend = merge(
    {},
    omit(props.optionData.legend, LegendConfiguration[position]["except"]),
    LegendConfiguration[position]
  );
};
const switchCommon = (target: Proxy, key: string, form: any, depend: Proxy) => {
  target[key] = form;
  depend.type = !depend.type;
};
</script>
<template>
  <n-collapse :default-expanded-names="['1', '2', '3', '4', '5']">
    <coordinates :attr="props.attr"></coordinates>
    <n-collapse-item title="绘色区域" name="1">
      <painting-common
        :optionData="props.optionData"
        :themeColor="props.themeColor"
      ></painting-common>
      <slot name="series"></slot>
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
    <n-collapse-item title="图例" name="2">
      <div class="common-item">
        <n-checkbox v-model:checked="legend.show">显示图例</n-checkbox>
      </div>
      <div class="common-item">
        <div class="common-sub-title">位置</div>
        <br />
        <div class="common-space"></div>
        <n-button
          @click="legendPosition('top')"
          round
          size="tiny"
          :class="{ 'common-active': legendCurrentPosition === 'top' }"
          type="tertiary"
          :disabled="!legend.show"
        >
          <n-icon :component="CaretUp"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('bottom')"
          round
          size="tiny"
          :class="{ 'common-active': legendCurrentPosition === 'bottom' }"
          type="tertiary"
          :disabled="!legend.show"
        >
          <n-icon :component="CaretDown"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('left')"
          round
          size="tiny"
          :class="{ 'common-active': legendCurrentPosition === 'left' }"
          type="tertiary"
          :disabled="!legend.show"
        >
          <n-icon :component="CaretBack"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('right')"
          round
          size="tiny"
          :class="{ 'common-active': legendCurrentPosition === 'right' }"
          type="tertiary"
          :disabled="!legend.show"
        >
          <n-icon :component="CaretForward"></n-icon>
        </n-button>
      </div>
      <div class="common-item">
        <div class="common-sub-title">文本</div>
        <el-input-number
          v-model="legend.textStyle.fontSize"
          class="common-number-input"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
          :disabled="!legend.show"
        />
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="legend.textStyle.color"
          :disabled="!legend.show"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
      <div class="common-item">
        <div class="common-sub-title"></div>
        <div class="common-space"></div>
        <div
          class="commmon-switch-self"
          @click="
            switchCommon(
              legend.textStyle,
              'fontWeight',
              legendFontWeightFlag.type ? 'normal' : 'bold',
              legendFontWeightFlag
            )
          "
          :class="{ commonActive: legendFontWeightFlag.type }"
        >
          B
        </div>
        <div
          class="commmon-switch-self"
          :class="{ commonActive: legendFontStyleFlag.type }"
          @click="
            switchCommon(
              legend.textStyle,
              'fontStyle',
              legendFontStyleFlag.type ? 'normal' : 'oblique',
              legendFontStyleFlag
            )
          "
        >
          I
        </div>
      </div>
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
    <n-collapse-item title="X轴" name="3">
      <shaft :axis="props.optionData.xAxis" type="X"></shaft>
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
    <n-collapse-item title="Y轴" name="4">
      <shaft :axis="props.optionData.yAxis" type="Y"></shaft>
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

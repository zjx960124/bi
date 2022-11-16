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

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
  inChart: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const title = computed(() => {
  return props.optionData.title;
});

const xAxis = computed(() => {
  return props.optionData.xAxis;
});

const yAxis = computed(() => {
  return props.optionData.yAxis;
});

const legend = computed(() => {
  return props.optionData.legend;
});

const visualMap = computed(() => {
  return props.optionData.visualMap;
});

const series = computed(() => {
  return props.optionData.series;
});

console.log(series.value);

const legendFontWeightFlag = ref({ type: false });
const legendFontStyleFlag = ref({ type: false });
const xAxisFontWeightFlag = ref({ type: false });
const xAxisFontStyleFlag = ref({ type: false });
const seriesItemFontWeightFlag = ref({ type: false });
const seriesItemFontStyleFlag = ref({ type: false });
const lineTypeOptions = ref([
  {
    label: "·········",
    value: "dashed",
  },
  {
    label: "——",
    value: "solid",
  },
]);
const value = ref("vertical");

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
};
</script>
<template>
  <n-collapse :default-expanded-names="['1', '2', '3']">
    <n-collapse-item title="绘色区域" name="1">
      <div class="common-item">
        <div class="common-sub-title">柱体展示方向</div>
        <n-radio-group
          v-model:value="value"
          name="radiogroup"
          :on-update:value="changeBarDirection"
        >
          <n-space>
            <n-radio key="1" value="level"> 水平 </n-radio>
            <n-radio key="2" value="vertical"> 垂直 </n-radio>
          </n-space>
        </n-radio-group>
      </div>

      <div class="common-title">背景样式</div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">柱宽</div>
        <el-input-number
          v-model="series.barWidth"
          class="common-number-input"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
        />
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">圆角半径</div>
        <el-input-number
          v-model="series.itemStyle.borderRadius"
          class="common-number-input"
          :min="0"
          :max="44"
          controls-position="right"
          size="small"
        />
      </div>

      <div class="common-item">
        <n-checkbox v-model:checked="series.label.show">
          <div>显示数据标签</div>
        </n-checkbox>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">文本</div>
        <el-input-number
          v-model="series.label.fontSize"
          class="common-number-input"
          :disabled="!series.label.show"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
        />
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="series.label.color"
          :disabled="!series.label.show"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-double-space"></div>
        <div class="common-double-space"></div>
        <div
          class="commmon-switch-self"
          @click="
            switchCommon(
              series.label,
              'fontWeight',
              seriesItemFontWeightFlag.type ? 'normal' : 'bold',
              seriesItemFontWeightFlag
            )
          "
          :class="{ commonActive: seriesItemFontWeightFlag.type }"
        >
          B
        </div>
        <div
          class="commmon-switch-self"
          :class="{ commonActive: seriesItemFontStyleFlag.type }"
          @click="
            switchCommon(
              series.label,
              'fontStyle',
              seriesItemFontStyleFlag.type ? 'normal' : 'oblique',
              seriesItemFontStyleFlag
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
          type="tertiary"
          :disabled="!legend.show"
        >
          <n-icon :component="CaretUp"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('bottom')"
          round
          size="tiny"
          type="tertiary"
          :disabled="!legend.show"
        >
          <n-icon :component="CaretDown"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('left')"
          round
          size="tiny"
          type="tertiary"
          :disabled="!legend.show"
        >
          <n-icon :component="CaretBack"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('right')"
          round
          size="tiny"
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
      <div class="common-item">
        <n-checkbox v-model:checked="xAxis.show">显示X轴</n-checkbox>
      </div>
      <div class="common-item">
        <div class="common-sub-title">轴标题(单位)</div>
        <n-input
          class="common-input"
          placeholder="标题名称(单位)"
          round
          v-model:value="xAxis.name"
        >
        </n-input>
      </div>
      <div class="common-item">
        <div class="common-sub-title">文本</div>
        <el-input-number
          v-model="xAxis.nameTextStyle.fontSize"
          class="common-number-input"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
        />
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="xAxis.nameTextStyle.color"
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
              xAxis.nameTextStyle,
              'fontWeight',
              xAxisFontWeightFlag.type ? 'normal' : 'bold',
              xAxisFontWeightFlag
            )
          "
          :class="{ commonActive: xAxisFontWeightFlag.type }"
        >
          B
        </div>
        <div
          class="commmon-switch-self"
          :class="{ active: xAxisFontStyleFlag.type }"
          @click="
            switchCommon(
              xAxis.nameTextStyle,
              'fontStyle',
              xAxisFontStyleFlag.type ? 'normal' : 'oblique',
              xAxisFontStyleFlag
            )
          "
        >
          I
        </div>
      </div>
      <div class="common-item">
        <div class="common-sub-title">轴线</div>
        <n-select
          class="common-small-select"
          :options="lineTypeOptions"
          size="small"
          v-model:value="xAxis.axisLine.lineStyle.type"
        />
        <el-input-number
          v-model="xAxis.axisLine.lineStyle.width"
          class="common-number-input"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
        />
      </div>
      <div class="common-item">
        <div class="common-sub-title"></div>
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="xAxis.axisLine.lineStyle.color"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
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
    .common-title {
      color: #6b797f;
      font-family: "PingFang-SC-Medium";
      font-size: 12px;
      text-align: left;
      margin: 18px 0 12px 0;
      font-weight: 400;
    }
    .common-item {
      display: flex;
      align-items: center;
      color: #6b797f;
      font-family: "PingFang-SC-Medium";
      font-size: 12px;
      .common-input {
        width: 160px;
        margin-left: 10px;
      }
      .common-select {
        width: 160px;
        margin-left: 10px;
      }
      .common-small-select {
        width: 76px;
        margin-left: 10px;
      }
      .common-number {
        width: 56px;
        margin-left: 10px;
      }
      .common-color-picker {
        margin-left: 10px;
      }
      .common-sub-title {
        min-width: 25px;
        flex-shrink: 0;
      }
      .common-number-input {
        width: 75px;
        margin-left: 9px;
      }
      .common-space {
        width: 10px;
      }
      .common-double-space {
        width: 20px;
      }
      .commmon-switch-self {
        width: 33px;
        height: 21px;
        color: #6b797f;
        border: 1px solid #dcdde0;
        text-align: center;
        line-height: 21px;
        border-radius: 11px;
        cursor: pointer;
      }
      .commonActive {
        border: 1px solid #6d79ff;
        background: #6d79ff;
        color: #ffffff;
      }
      .commmon-switch-self + .commmon-switch-self {
        margin-left: 23px;
      }
    }
    .common-item {
      margin-top: 12px;
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

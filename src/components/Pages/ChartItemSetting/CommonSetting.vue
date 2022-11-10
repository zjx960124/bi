<script setup lang="ts">
import {
  ChevronUp,
  CaretUp,
  CaretBack,
  CaretForward,
  CaretDown,
  ChevronDown,
} from "@vicons/ionicons5";
import { PropType, computed, ref } from "vue";
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
  console.log(props.optionData.legend);
  return props.optionData.legend;
});

const visualMap = computed(() => {
  return props.optionData.visualMap;
});

const fontWeightFlag = ref<boolean>(false);
const fontFamilyFlag = ref<boolean>(false);

const legendPosition = (position: string) => {
  props.optionData.legend = merge(
    {},
    omit(props.optionData.legend, LegendConfiguration[position]["except"]),
    LegendConfiguration[position]
  );
};

const switchCommon = (target: Proxy, key: string, form: any, depend: Proxy) => {
  target[key] = form;
  depend.value = !depend.value;
};
</script>
<template>
  <n-collapse :default-expanded-names="['1', '2', '3']">
    <n-collapse-item title="绘色区域" name="1">
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
    <n-collapse-item title="图例" name="2">
      <div class="common-item">
        <n-radio v-model:checked="legend.show">显示图例</n-radio>
      </div>
      <div class="common-item">
        <div class="common-sub-title">位置</div>
        <br />
        <div class="common-space"></div>
        <n-button
          @click="legendPosition('top')"
          round
          size="small"
          type="tertiary"
        >
          <n-icon :component="CaretUp"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('bottom')"
          round
          size="small"
          type="tertiary"
        >
          <n-icon :component="CaretDown"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('left')"
          round
          size="small"
          type="tertiary"
        >
          <n-icon :component="CaretBack"></n-icon>
        </n-button>
        <n-button
          @click="legendPosition('right')"
          round
          size="small"
          type="tertiary"
        >
          <n-icon :component="CaretForward"></n-icon>
        </n-button>
      </div>
      <div class="common-item">
        <div class="common-sub-title">文字</div>
        <!-- <el-input-number
          v-model="legend.textStyle.fontSize"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
        /> -->
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="legend.textStyle.color"
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
              fontWeightFlag ? 'normal' : 'bold',
              fontWeightFlag
            )
          "
          :class="{ commonActive: fontWeightFlag }"
        >
          B
        </div>
        <div
          class="commmon-switch-self"
          :class="{ active: fontFamilyFlag }"
          @click="
            switchCommon(
              legend.textStyle,
              'fontFamily',
              fontFamilyFlag ? 'sans-serif' : 'Courier New',
              fontFamilyFlag
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
      .common-number {
        width: 56px;
        margin-left: 10px;
      }
      .common-color-picker {
        margin-left: 10px;
      }
      .common-sub-title {
        min-width: 25px;
      }
      .common-space {
        width: 10px;
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

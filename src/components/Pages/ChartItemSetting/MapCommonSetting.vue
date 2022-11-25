<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { ChevronUp, ChevronDown } from '@vicons/ionicons5';
import { Coordinates } from '../components';
import { LegendCommon } from '../components';
import { GlobalThemeJsonType } from '@/settings/chartThemes/index';
import { option } from '@/packages/components/Charts/Space/MapChina/config';

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
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
});

const title = computed(() => {
  return props.optionData.title;
});
const series = computed(() => {
  return props.optionData.series;
});
const visualMap = computed(() => {
  return props.optionData.visualMap;
});

const titleFontWeightFlag = ref({ type: false });
const titleFontStyleFlag = ref({ type: false });
const labelFontWeightFlag = ref({ type: false });
const labelFontStyleFlag = ref({ type: false });
const visualMapType = ref<string>('continuous');
const visualColor = ref<number>(2);
const visualColorOption = ref([
  {
    label: '最大值',
    value: 2,
  },
  {
    label: '最小值',
    value: 0,
  },
  {
    label: '中间值',
    value: 1,
  },
]);

const switchCommon = (
  target: any,
  key: string,
  form: string,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type! = !depend.type!;
};
const selectVisualColor = (val: number) => {
  visualColor.value = val;
};
const changeVisualMapType = (val: string) => {
  visualMapType.value = val;
};
</script>
<template>
  <n-collapse :default-expanded-names="['1', '2', '3', '4', '5', '6']">
    <coordinates :attr="props.attr"></coordinates>
    <n-collapse-item title="标题与卡片" name="1">
      <div class="common-item">
        <n-checkbox v-model:checked="title.show">显示主标题</n-checkbox>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">主标题</div>
        <n-input
          class="common-input"
          placeholder=""
          round
          v-model:value="title.text"
        ></n-input>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">文本</div>
        <el-input-number
          v-model="title.textStyle.fontSize"
          class="common-number-input"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
          :disabled="!title.show"
        />
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="title.textStyle.color"
          :disabled="!title.show"
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
              title.textStyle,
              'fontWeight',
              titleFontWeightFlag.type ? 'normal' : 'bold',
              titleFontWeightFlag
            )
          "
          :class="{ commonActive: titleFontWeightFlag.type }"
        >
          B
        </div>
        <div
          class="commmon-switch-self"
          :class="{ commonActive: titleFontStyleFlag.type }"
          @click="
            switchCommon(
              title.textStyle,
              'fontStyle',
              titleFontStyleFlag.type ? 'normal' : 'oblique',
              titleFontStyleFlag
            )
          "
        >
          I
        </div>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">副标题</div>
        <n-input
          class="common-input"
          placeholder=""
          round
          v-model:value="title.subtext"
        ></n-input>
      </div>
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
    <n-collapse-item title="地理区域" name="2">
      <div class="common-item">
        <n-checkbox v-model:checked="series[1].itemStyle.showHainanIsLands"
          >显示海南群岛</n-checkbox
        >
      </div>
      <div class="common-item">
        <div class="common-sub-title">区块底色</div>
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="series[1].itemStyle.areaColor"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
      <div class="common-item">
        <div class="common-sub-title">轮廓线</div>
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="series[1].itemStyle.borderColor"
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
    <n-collapse-item title="区块样式" name="3">
      <div class="common-item">
        <div class="common-sub-title">数据映射区间</div>
      </div>
      <div class="common-item">
        <n-radio-group
          class="common-radio-group"
          v-model:value="props.optionData.visualMapType"
          name="radiogroup"
        >
          <n-space>
            <n-radio key="1" value="continuous"> 连续型区间 </n-radio>
            <n-radio key="2" value="piecewise"> 分段型区间 </n-radio>
          </n-space>
        </n-radio-group>
      </div>
      <div class="common-item">
        <div class="common-sub-title">颜色配置</div>
      </div>
      <div class="common-item">
        <n-select
          class="common-select"
          v-model:value="visualColor"
          round
          size="small"
          :options="visualColorOption"
          :on-update:value="selectVisualColor"
        />
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="visualMap.inRange.color[visualColor]"
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
    <n-collapse-item title="数据显示" name="4">
      <div class="common-item">
        <div class="common-sub-title">显示内容</div>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <n-checkbox-group v-model:value="series[1].label.formatterOption">
          <n-checkbox value="name" label="区域名称" />
          <n-checkbox value="value" label="度量" />
        </n-checkbox-group>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">文本</div>
        <el-input-number
          v-model="series[1].label.fontSize"
          class="common-number-input"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
        />
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="series[1].label.color"
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
              series[1].label,
              'fontWeight',
              labelFontWeightFlag.type ? 'normal' : 'bold',
              labelFontWeightFlag
            )
          "
          :class="{ commonActive: labelFontWeightFlag.type }"
        >
          B
        </div>
        <div
          class="commmon-switch-self"
          :class="{ commonActive: labelFontStyleFlag.type }"
          @click="
            switchCommon(
              series[1].label,
              'fontStyle',
              labelFontStyleFlag.type ? 'normal' : 'oblique',
              labelFontStyleFlag
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
    <n-collapse-item title="图例" name="6">
      <legend-common :optionData="props.optionData"></legend-common>
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
    <slot></slot>
  </n-collapse>
</template>
<style lang="scss" scoped>
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
      font-family: 'PingFang-SC-Bold';
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
      padding: 0 25px 2px 25px;
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

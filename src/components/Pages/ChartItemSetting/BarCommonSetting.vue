<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { ChevronDown } from '@vicons/ionicons5';
import { GlobalThemeJsonType } from '@/settings/chartThemes';
import { isArray } from '@/utils';

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
});

const series = computed(() => {
  return props.optionData.series;
});

const borderRadius = computed(() => {
  const radius = props.optionData.series.itemStyle.borderRadius;
  return Math.max(...radius);
});

const seriesItemFontWeightFlag = ref({ type: false });
const seriesItemFontStyleFlag = ref({ type: false });

const changeBarRadius = (val: number) => {
  if (props.optionData.xAxis.type === 'category')
    props.optionData.series.itemStyle.borderRadius = [val, val, 0, 0];
  else props.optionData.series.itemStyle.borderRadius = [0, val, val, 0];
};

const checkSeriesLabel = (val: boolean) => {
  console.log(val);
  props.optionData.series.label.show = val;
  if (props.optionData.xAxis.type === 'category')
    props.optionData.series.label.position = 'top';
  else props.optionData.series.label.position = 'right';
};

const switchCommon = (
  target: any,
  key: string,
  form: string,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type = !depend.type;
};
</script>
<template>
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
  <div class="common-item" v-show="!series.stack">
    <div class="common-double-space"></div>
    <div class="common-sub-title">圆角半径</div>
    <el-input-number
      v-model="borderRadius"
      class="common-number-input"
      :min="0"
      :max="44"
      controls-position="right"
      @input="changeBarRadius"
      size="small"
    />
  </div>

  <div class="common-item">
    <n-checkbox
      v-model:checked="series.label.show"
      :on-update:checked="checkSeriesLabel"
    >
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
      :class="{ commonActive: series.label.fontWeight === 'bold' }"
    >
      B
    </div>
    <div
      class="commmon-switch-self"
      :class="{ commonActive: series.label.fontStyle === 'oblique' }"
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
</template>
<style lang="scss" scoped></style>

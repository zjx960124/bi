<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { ChevronDown } from '@vicons/ionicons5';
import { GlobalThemeJsonType } from '@/settings/chartThemes';

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
});

const series = computed(() => {
  return props.optionData.series;
});
const seriesItemFontWeightFlag = ref({ type: false });
const seriesItemFontStyleFlag = ref({ type: false });
const lineTypeOptions = ref([
  {
    label: '·········',
    value: 'dashed',
  },
  {
    label: '——',
    value: 'solid',
  },
]);
const symbolTypeOption = ref([
  {
    label: '空心圆',
    value: 'emptyCircle',
  },
  {
    label: '实心圆',
    value: 'circle',
  },
  {
    label: '矩形',
    value: 'rect',
  },
  {
    label: '圆角矩形',
    value: 'roundRect',
  },
  {
    label: '菱形',
    value: 'diamond',
  },
]);

const changeLineSmooth = (val: boolean) => {
  series.value.smooth = val;
};
const switchCommon = (
  target: any,
  key: string,
  form: string,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type! = !depend.type!;
};
</script>
<template>
  <div class="common-item">
    <div class="common-sub-title">曲线线条</div>
    <n-radio-group
      class="common-radio-group"
      v-model:value="series.smooth"
      name="radiogroup"
      :on-update:value="changeLineSmooth"
    >
      <n-space>
        <n-radio key="1" :value="false"> 直线 </n-radio>
        <n-radio key="2" :value="true"> 曲线 </n-radio>
      </n-space>
    </n-radio-group>
  </div>
  <div class="common-item">
    <div class="common-sub-title"></div>
    <div class="common-double-space"></div>
    <n-select
      class="common-small-select"
      :options="lineTypeOptions"
      size="small"
      v-model:value="series.lineStyle.type"
    />
    <el-input-number
      v-model="series.lineStyle.width"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
  </div>
  <div class="common-item">
    <n-checkbox v-model:checked="series.showSymbol">
      <div>显示标记点</div>
    </n-checkbox>
    <n-select
      class="common-medium-select"
      :options="symbolTypeOption"
      :disabled="!series.showSymbol"
      size="small"
      v-model:value="series.symbol"
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
</template>
<style lang="scss" scoped></style>

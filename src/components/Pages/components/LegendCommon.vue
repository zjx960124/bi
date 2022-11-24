<script setup lang="ts">
import { computed, ref, PropType } from 'vue';
import {
  CaretUp,
  CaretDown,
  CaretBack,
  CaretForward,
  ChevronDown,
} from '@vicons/ionicons5';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import { LegendConfiguration } from '@/enums/chartConfiguration';
import { GlobalThemeJsonType } from '@/settings/chartThemes/index';

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});
const legend = computed(() => {
  return props.optionData.legend;
});
const legendCurrentPosition = computed(() => {
  return props.optionData.legend.legendPosition || '';
});
const legendFontWeightFlag = ref({ type: false });
const legendFontStyleFlag = ref({ type: false });

const legendPosition = (position: string) => {
  //@ts-ignore
  props.optionData.legend = merge(
    {},
    omit(props.optionData.legend, LegendConfiguration[position]['except']),
    LegendConfiguration[position]
  );
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
</template>
<style lang="scss" scoped></style>

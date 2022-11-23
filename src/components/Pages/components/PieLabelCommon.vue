<script setup lang="ts">
import { ref } from "vue";
import {
  CaretUp,
  CaretDown,
  CaretBack,
  CaretForward,
  ChevronDown,
} from "@vicons/ionicons5";
const props = defineProps({
  series: {
    type: Object,
    required: true,
  },
});
const labelFontWeightFlag = ref({ type: false });
const labelFontStyleFlag = ref({ type: false });
const switchCommon = (target: any, key: string, form: string, depend: { type: boolean }) => {
  target[key] = form;
  depend.type! = !depend.type!;
};
const changePieArrange = () => { }
</script>
<template>
  <div class="common-item">
    <n-checkbox v-model:checked="series.label.show">显示数据标签</n-checkbox>
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <n-checkbox-group v-model:value="series.label.formatterOption">
      <n-checkbox value="seriesName" label="维度" />
      <n-checkbox value="name" label="度量" />
      <n-checkbox value="percent" label="百分比" />
    </n-checkbox-group>
  </div>
  <div class="common-item">
    <div class="common-sub-title">位置</div>
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <n-radio-group v-model:value="series.labelLayout.align" name="radiogroup">
      <n-radio value="right">居左</n-radio>
      <n-radio value="center">居中</n-radio>
      <n-radio value="left">居右</n-radio>
    </n-radio-group>
  </div>
  <div class="common-item">
    <div class="common-sub-title">排列方式</div>
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <n-radio-group v-model:value="series.label.formatterArrange" name="radiogroups">
      <n-radio value="left">左右排列</n-radio>
      <n-radio value="top">上下排列</n-radio>
    </n-radio-group>
  </div>
  <div class="common-item">
    <div class="common-sub-title">文本</div>
    <el-input-number v-model="series.label.fontSize" class="common-number-input" :min="1" :max="44"
      controls-position="right" size="small" :disabled="!series.label.show" />
    <n-color-picker class="common-color-picker" style="display: inline-block" v-model:value="series.label.color"
      :disabled="!series.label.show">
      <template #label>
        <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
      </template>
    </n-color-picker>
  </div>
  <div class="common-item">
    <div class="common-sub-title"></div>
    <div class="common-space"></div>
    <div class="commmon-switch-self" @click="
      switchCommon(
        series.label,
        'fontWeight',
        labelFontWeightFlag.type ? 'normal' : 'bold',
        labelFontWeightFlag
      )
    " :class="{ commonActive: labelFontWeightFlag.type }">
      B
    </div>
    <div class="commmon-switch-self" :class="{ commonActive: labelFontStyleFlag.type }" @click="
  switchCommon(
    series.label,
    'fontStyle',
    labelFontStyleFlag.type ? 'normal' : 'oblique',
    labelFontStyleFlag
  )
    ">
      I
    </div>
  </div>
</template>
<style lang='scss' scoped>

</style>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ChevronDown } from '@vicons/carbon';
const props = defineProps({
  axis: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const axis = computed(() => {
  return props.axis;
});

const axisFontWeightFlag = ref({ type: false });
const axisFontStyleFlag = ref({ type: false });
const axisLabelFontWeightFlag = ref({ type: false });
const axisLabelFontStyleFlag = ref({ type: false });
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

const switchCommon = (
  target: any,
  key: string,
  form: any,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type = !depend.type;
};
</script>
<template>
  <div class="common-item">
    <n-checkbox v-model:checked="axis.show">显示{{ props.type }}轴</n-checkbox>
  </div>
  <div class="common-item">
    <div class="common-sub-title">轴标签</div>
    <el-input-number
      v-model="axis.axisLabel.fontSize"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
    <n-color-picker
      class="common-color-picker"
      style="display: inline-block"
      v-model:value="axis.axisLabel.color"
    >
      <template #label>
        <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
      </template>
    </n-color-picker>
  </div>
  <div class="common-item">
    <div class="common-sub-title"></div>
    <div class="common-double-space"></div>
    <div
      class="commmon-switch-self"
      @click="
        switchCommon(
          axis.axisLabel,
          'fontWeight',
          axisLabelFontWeightFlag.type ? 'normal' : 'bold',
          axisLabelFontWeightFlag
        )
      "
      :class="{ commonActive: axisLabelFontWeightFlag.type }"
    >
      B
    </div>
    <div
      class="commmon-switch-self"
      :class="{ commonActive: axisLabelFontStyleFlag.type }"
      @click="
        switchCommon(
          axis.axisLabel,
          'fontStyle',
          axisLabelFontStyleFlag.type ? 'normal' : 'oblique',
          axisLabelFontStyleFlag
        )
      "
    >
      I
    </div>
  </div>
  <div class="common-item">
    <div class="common-sub-title">轴标题(单位)</div>
    <n-input
      class="common-input"
      placeholder="标题名称(单位)"
      round
      v-model:value="axis.name"
    >
    </n-input>
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <div class="common-sub-title">文本</div>
    <el-input-number
      v-model="axis.nameTextStyle.fontSize"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
    <n-color-picker
      class="common-color-picker"
      style="display: inline-block"
      v-model:value="axis.nameTextStyle.color"
    >
      <template #label>
        <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
      </template>
    </n-color-picker>
  </div>
  <div class="common-item">
    <div class="common-sub-title"></div>
    <div class="common-space"></div>
    <div class="common-double-space"></div>
    <div
      class="commmon-switch-self"
      @click="
        switchCommon(
          axis.nameTextStyle,
          'fontWeight',
          axisFontWeightFlag.type ? 'normal' : 'bold',
          axisFontWeightFlag
        )
      "
      :class="{ commonActive: axisFontWeightFlag.type }"
    >
      B
    </div>
    <div
      class="commmon-switch-self"
      :class="{ commonActive: axisFontStyleFlag.type }"
      @click="
        switchCommon(
          axis.nameTextStyle,
          'fontStyle',
          axisFontStyleFlag.type ? 'normal' : 'oblique',
          axisFontStyleFlag
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
      v-model:value="axis.axisLine.lineStyle.type"
    />
    <el-input-number
      v-model="axis.axisLine.lineStyle.width"
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
      v-model:value="axis.axisLine.lineStyle.color"
    >
      <template #label>
        <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
      </template>
    </n-color-picker>
  </div>
</template>
<style lang="scss" scoped></style>

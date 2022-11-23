<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from '@vicons/ionicons5';

const switchCommon = (
  target: any,
  key: string,
  form: string,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type = !depend.type;
};

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="common-item">
    <div class="common-sub-title">轨道颜色</div>
    <n-color-picker
      class="common-color-picker"
      style="display: inline-block"
      v-model:value="optionData.railColor"
    >
      <template #label>
        <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
      </template>
    </n-color-picker>
  </div>
  <div class="common-item">
    <div class="common-sub-title">背景颜色</div>
    <n-color-picker
      class="common-color-picker"
      style="display: inline-block"
      v-model:value="optionData.color"
    >
      <template #label>
        <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
      </template>
    </n-color-picker>
  </div>
  <div class="common-item">
    <div class="common-sub-title">圆角半径</div>
    <el-input-number
      v-model="optionData.fillBorderRadius"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
  </div>
</template>
<style lang="scss" scoped></style>

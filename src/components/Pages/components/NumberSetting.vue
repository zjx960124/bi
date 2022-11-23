<template>
  <div class="common-item">
    <div class="common-sub-title">文本样式</div>
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <div class="common-sub-title">文本</div>
    <el-input-number
      v-model="optionData.numberSize"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
    <n-color-picker
      class="common-color-picker"
      style="display: inline-block"
      v-model:value="optionData.numberColor"
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
          optionData,
          'numberFontWeight',
          numberFontWeightFlag.type ? 'normal' : 'bold',
          numberFontWeightFlag
        )
      "
      :class="{ commonActive: numberFontWeightFlag.type }"
    >
      B
    </div>
    <div
      class="commmon-switch-self"
      :class="{ commonActive: numberFontStyleFlag.type }"
      @click="
        switchCommon(
          optionData,
          'numberFontStyle',
          numberFontStyleFlag.type ? 'normal' : 'oblique',
          numberFontStyleFlag
        )
      "
    >
      I
    </div>
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <div class="common-sub-title">间距</div>
    <el-input-number
      v-model="optionData.letterSpacing"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
  </div>
  <div class="common-item">
    <n-checkbox v-model:checked="optionData.showSlot">显示图例</n-checkbox>
  </div>
  <div class="common-item">
    <div class="common-sub-title">前缀</div>
    <n-input
      class="common-input"
      placeholder=""
      round
      v-model:value="optionData.prefixText"
    >
    </n-input>
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <div class="common-sub-title">间距</div>
    <el-input-number
      v-model="optionData.prefixMargin"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
  </div>
  <div class="common-item">
    <div class="common-sub-title">后缀</div>
    <n-input
      class="common-input"
      placeholder=""
      round
      v-model:value="optionData.suffixText"
    >
    </n-input>
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <div class="common-sub-title">间距</div>
    <el-input-number
      v-model="optionData.suffixMargin"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
  </div>
  <div class="common-item">
    <div class="common-double-space"></div>
    <div class="common-sub-title">文本</div>
    <el-input-number
      v-model="optionData.slotSize"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
    <n-color-picker
      class="common-color-picker"
      style="display: inline-block"
      v-model:value="optionData.slotColor"
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
          optionData,
          'slotFontWeight',
          slotFontWeightFlag.type ? 'normal' : 'bold',
          slotFontWeightFlag
        )
      "
      :class="{ commonActive: slotFontWeightFlag.type }"
    >
      B
    </div>
    <div
      class="commmon-switch-self"
      :class="{ commonActive: slotFontStyleFlag.type }"
      @click="
        switchCommon(
          optionData,
          'slotFontStyle',
          slotFontStyleFlag.type ? 'normal' : 'oblique',
          slotFontStyleFlag
        )
      "
    >
      I
    </div>
  </div>
  <div class="common-item">
    <div class="common-sub-title">动画时间</div>
    <el-input-number
      v-model="optionData.dur"
      class="common-number-input"
      :min="1"
      :max="44"
      controls-position="right"
      size="small"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from '@vicons/ionicons5';

const numberFontStyleFlag = ref({ type: false });
const numberFontWeightFlag = ref({ type: false });
const slotFontStyleFlag = ref({ type: false });
const slotFontWeightFlag = ref({ type: false });

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

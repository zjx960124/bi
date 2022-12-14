<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, ChevronUp } from '@vicons/ionicons5';

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});

const indicatorPlacement = ref<string>('inside');
const precisionOpitons = ref([
  {
    label: 0,
    value: 0,
  },
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
]);
const labelFontStyleFlag = ref({ type: false });
const labelFontWeightFlag = ref({ type: false });
const customFontWeightFlag = ref({ type: false });
const customFontStyleFlag = ref({ type: false });

const changeDirection = (val: string) => {
  indicatorPlacement.value = val;
  props.optionData.indicatorPlacement = val;
};
const selectPrecision = (value: number) => {
  props.optionData.precision = value;
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

const changeCustomDirection = (val: string) => {
  props.optionData.exhibition = val;
};
</script>
<template>
  <n-collapse-item title="数据标签" name="4">
    <div class="common-item">
      <div class="common-sub-title">小数位</div>
      <n-select
        class="common-select"
        v-model:value="optionData.precision"
        round
        size="small"
        :options="precisionOpitons"
        :on-update:value="selectPrecision"
      />
    </div>
    <div class="common-item" v-show="optionData.type === 'line'">
      <div class="common-sub-title">显示位置</div>
      <n-radio-group
        class="common-radio-group"
        v-model:value="indicatorPlacement"
        name="radiogroup"
        :on-update:value="changeDirection"
      >
        <n-space>
          <n-radio key="1" value="inside"> 跟随进度 </n-radio>
          <n-radio key="2" value="outside"> 进度条外 </n-radio>
        </n-space>
      </n-radio-group>
    </div>
    <div class="common-item">
      <div class="common-sub-title">文本</div>
      <el-input-number
        v-model="optionData.indicatorTextSize"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
      />
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="optionData.indicatorTextColor"
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
            optionData,
            'indicatorFontWeight',
            labelFontWeightFlag.type ? 'normal' : 'bold',
            labelFontWeightFlag
          )
        "
        :class="{ commonActive: optionData.indicatorFontWeight === 'bold' }"
      >
        B
      </div>
      <div
        class="commmon-switch-self"
        :class="{ commonActive: optionData.indicatorFontStyle === 'oblique' }"
        @click="
          switchCommon(
            optionData,
            'indicatorFontStyle',
            labelFontStyleFlag.type ? 'normal' : 'oblique',
            labelFontStyleFlag
          )
        "
      >
        I
      </div>
    </div>
    <div class="common-item">
      <n-checkbox v-model:checked="optionData.customType"
        >显示之前值/目标值</n-checkbox
      >
    </div>
    <div class="common-item">
      <div class="common-space"></div>
      <div>当前值—展示名称</div>
      <n-input
        small
        class="common-input"
        style="width: 75px"
        placeholder=""
        v-model:value="optionData.customCurrentLabel"
      ></n-input>
    </div>
    <div class="common-item">
      <div class="common-space"></div>
      <div>目标值—展示名称</div>
      <n-input
        small
        class="common-input"
        style="width: 75px"
        placeholder=""
        v-model:value="optionData.customTargetLabel"
      ></n-input>
    </div>
    <div class="common-item">
      <div class="common-space"></div>
      <div class="common-sub-title">排列方式</div>
      <n-radio-group
        class="common-radio-group"
        v-model:value="optionData.exhibition"
        name="radiogroup"
        :on-update:value="changeCustomDirection"
      >
        <n-space>
          <n-radio key="1" value="row"> 水平 </n-radio>
          <n-radio key="2" value="column"> 垂直 </n-radio>
        </n-space>
      </n-radio-group>
    </div>
    <div class="common-item">
      <div class="common-space"></div>
      <div class="common-sub-title">上边距</div>
      <el-input-number
        v-model="optionData.customMargginTop"
        class="common-number-input"
        :min="1"
        controls-position="right"
        size="small"
      />
    </div>
    <div class="common-item">
      <div class="common-space"></div>
      <div class="common-sub-title">文本</div>
      <el-input-number
        v-model="optionData.customFontSize"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
      />
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="optionData.customFontColor"
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
            optionData,
            'customFontWeight',
            customFontWeightFlag.type ? 'normal' : 'bold',
            customFontWeightFlag
          )
        "
        :class="{ commonActive: optionData.customFontWeight === 'bold' }"
      >
        B
      </div>
      <div
        class="commmon-switch-self"
        :class="{ commonActive: optionData.customFontStyle === 'oblique' }"
        @click="
          switchCommon(
            optionData,
            'customFontStyle',
            customFontStyleFlag.type ? 'normal' : 'oblique',
            customFontStyleFlag
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

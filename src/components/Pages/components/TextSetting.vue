<template>
  <n-collapse-item title="样式" name="2">
    <div class="common-item" v-show="type === 'text'">
      <div class="common-sub-title">文本内容</div>
      <el-input
        v-model="optionData.main"
        style="margin-left: 9px"
        size="small"
      />
    </div>
    <div class="common-item">
      <div class="common-sub-title">文本样式</div>
      <el-input-number
        v-model="optionData.fontSize"
        class="common-number-input"
        :min="1"
        :max="120"
        controls-position="right"
        size="small"
      />
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="optionData.fontColor"
      >
        <template #label>
          <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
        </template>
      </n-color-picker>
    </div>
    <div class="common-item">
      <div
        class="commmon-switch-self"
        @click="
          switchCommon(
            optionData,
            'fontWeight',
            fontWeightFlag.type ? 'normal' : 'bold',
            fontWeightFlag
          )
        "
        :class="{ commonActive: optionData.fontWeight === 'bold' }"
      >
        B
      </div>
      <div
        class="commmon-switch-self"
        :class="{ commonActive: optionData.fontStyle === 'oblique' }"
        @click="
          switchCommon(
            optionData,
            'fontStyle',
            fontStyleFlag.type ? 'normal' : 'oblique',
            fontStyleFlag
          )
        "
      >
        I
      </div>
    </div>
    <div class="common-item">
      <div class="common-sub-title">背景</div>
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="optionData.background"
      >
        <template #label>
          <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
        </template>
      </n-color-picker>
      <div class="common-space"></div>
      <div class="common-sub-title">行高</div>
      <el-input-number
        v-model="optionData.lineHeight"
        class="common-number-input"
        :min="1"
        controls-position="right"
        size="small"
      />
    </div>
    <div class="common-item">
      <div class="common-sub-title">间距</div>
      <el-input-number
        v-model="optionData.letterSpacing"
        class="common-number-input"
        :min="1"
        controls-position="right"
        size="small"
      />
    </div>
    <div class="common-item">
      <div class="common-sub-title">位置</div>
    </div>
    <div class="common-item">
      <div class="common-double-space"></div>
      <n-radio-group v-model:value="optionData.textAlign" name="radiogroup">
        <n-radio value="left">居左</n-radio>
        <n-radio value="center">居中</n-radio>
        <n-radio value="right">居右</n-radio>
      </n-radio-group>
    </div>
    <template #arrow>
      <n-icon size="16" color="#869299">
        <chevron-up />
      </n-icon>
    </template>
  </n-collapse-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, ChevronUp } from '@vicons/ionicons5';

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const switchCommon = (
  target: any,
  key: string,
  form: string,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type = !depend.type;
};

const fontStyleFlag = ref({ type: false });
const fontWeightFlag = ref({ type: false });
</script>

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

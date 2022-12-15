<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, ChevronUp } from '@vicons/ionicons5';

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
  <n-collapse-item title="进度条" name="3">
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
      <div class="common-sub-title">滑条颜色</div>
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
    <div class="common-item" v-show="optionData.type === 'line'">
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
    <div class="common-item">
      <div class="common-sub-title">轨道高度</div>
      <el-input-number
        v-model="optionData.height"
        class="common-number-input"
        :min="1"
        controls-position="right"
        size="small"
      />
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

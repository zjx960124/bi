<template>
  <n-collapse-item title="视频" name="2">
    <div class="common-item">
      <div class="common-sub-title">视频链接</div>
      <el-input
        size="small"
        v-model="optionData.src"
        placeholder="Please input"
        style="width: 164px; margin-left: 9px"
      >
      </el-input>
    </div>
    <template #arrow>
      <n-icon size="16" color="#869299">
        <chevron-up />
      </n-icon>
    </template>
  </n-collapse-item>
  <n-collapse-item title="播放" name="3">
    <div class="common-item">
      <n-checkbox v-model:checked="optionData.autoplay">自动播放</n-checkbox>
    </div>
    <div class="common-item">
      <n-checkbox v-model:checked="optionData.muted">循环播放</n-checkbox>
    </div>
    <div class="common-item">
      <n-checkbox v-model:checked="optionData.loop">静音</n-checkbox>
    </div>
    <template #arrow>
      <n-icon size="16" color="#869299">
        <chevron-up />
      </n-icon>
    </template>
  </n-collapse-item>
</template>

<script setup lang="ts">
import { ChevronUp } from '@vicons/ionicons5';
const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});
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

    .upload-show {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .upload-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
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

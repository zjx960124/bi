<script setup lang="ts">
import { ref } from "vue";
import { AddCircleOutline, ChevronUp } from "@vicons/ionicons5";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";

const chartEditStore = useChartEditStore();
const canvasConfig = chartEditStore.getEditCanvasConfig;
const editCanvas = chartEditStore.getEditCanvas;

const fontFamily = ref<string>("");
const fontFamilyOptions = ref<any[]>([]);

const handleChange = (e: Event) => {
  canvasConfig.backgroundType = (e.target as HTMLInputElement).value;
};
</script>
<template>
  <div>
    <div class="configuration-titile">全局配置</div>
    <n-collapse :default-expanded-names="['1', '2', '3']">
      <n-collapse-item title="大屏尺寸" name="1">
        <template #arrow>
          <n-icon size="16">
            <chevron-up />
          </n-icon>
        </template>
      </n-collapse-item>
      <n-collapse-item title="全局样式" name="2">
        <div>
          <n-select v-model:value="fontFamily" :options="fontFamilyOptions" />
        </div>
        <div>
          <div>背景样式</div>
          <n-space>
            <n-radio
              :checked="canvasConfig.backgroundType === 'background'"
              value="background"
              name="basic-demo"
              @change="handleChange"
              style="width: 100%"
            >
              <div>
                填充
                <n-color-picker
                  style="display: inline-block"
                  v-model:value="canvasConfig.background"
                />
              </div>
            </n-radio>
          </n-space>
          <n-space>
            <n-radio
              :checked="canvasConfig.backgroundType === 'backgroundImage'"
              value="backgroundImage"
              name="basic-demo"
              @change="handleChange"
            >
              图片
            </n-radio>
          </n-space>
        </div>
        <template #arrow>
          <n-icon size="16">
            <chevron-up />
          </n-icon>
        </template>
      </n-collapse-item>
      <n-collapse-item title="页面轮播" name="3">
        <template #arrow>
          <n-icon size="16">
            <chevron-up />
          </n-icon>
        </template>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>
<style lang='scss' scoped>
.configuration-titile {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: #ffffff;
  border-radius: 15px;
  color: #293270;
  font-size: 14px;
  margin-bottom: 17px;
}
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
      font-family: "PingFang-SC";
      font-weight: bold;
      font-size: 14px;
      height: 50px;
      position: relative;
      padding: 0 0 0 27px;
      .n-collapse-item__header-main {
        .n-collapse-item-arrow {
          position: absolute;
          right: 22px;
          top: 16px;
        }
      }
    }
    :deep .n-collapse-item__content-inner {
      padding: 0 25px 18px 25px;
    }
  }
  :deep .n-collapse-item.n-collapse-item--active {
    .n-collapse-item__header.n-collapse-item__header--active {
      .n-collapse-item-arrow {
        transform: rotate(180deg);
      }
    }
  }
  .n-collapse-item:first-child {
    max-height: 30%;
  }
  .n-collapse-item--active {
    flex: 1;
  }
}
</style>

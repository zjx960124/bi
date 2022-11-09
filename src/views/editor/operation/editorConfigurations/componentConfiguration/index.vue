<script setup lang="ts">
import {
  AddCircleOutline,
  ChevronUp,
  ChevronForward,
  ChevronBack,
  ColorPalette,
  DocumentText,
} from "@vicons/ionicons5";
import { useTargetData } from "@/utils/hooks/useTargetData";
import { ref } from "vue";
import { LayoutData } from "../layoutData";
const { targetData, chartEditStore } = useTargetData();

const activeTab = ref<string>("config");
const handleActiveTab = (target: string): void => {
  activeTab.value = target;
};

const configurationFlag = ref<boolean>(true);
const hiddenConfiguration = () => {
  configurationFlag.value = !configurationFlag.value;
  chartEditStore.computedScale();
};
</script>
<template>
  <div class="component-configuration-view">
    <div class="configuration" v-show="configurationFlag">
      <div class="configuration-tab-pane">
        <n-icon
          :component="ChevronForward"
          size="16"
          color="#869299"
          @click="hiddenConfiguration"
          style="cursor: pointer"
        ></n-icon>
        <n-button-group size="small">
          <n-button type="default" @click="handleActiveTab('data')">
            <template #icon>
              <n-icon :component="DocumentText"></n-icon>
            </template>
          </n-button>
          <n-button type="default" @click="handleActiveTab('config')">
            <template #icon>
              <n-icon :component="ColorPalette"></n-icon>
            </template>
          </n-button>
        </n-button-group>
      </div>
      <div class="configuration-view">
        <layout-data
          v-show="activeTab === 'data'"
          :optionData="targetData.option"
        ></layout-data>
        <component
          v-show="activeTab === 'config'"
          :is="targetData.chartConfig.conKey"
          :optionData="targetData.option"
        ></component>
      </div>
      <div class="update-btn">更新</div>
    </div>
    <div class="configuration-arrow" v-show="!configurationFlag">
      <n-icon
        :component="ChevronBack"
        size="16"
        color="#869299"
        @click="hiddenConfiguration"
      ></n-icon>
    </div>
    <div class="information">
      <div class="information-titile">数据</div>
      <div class="dimension"></div>
      <div class="measure"></div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.component-configuration-view {
  display: flex;
  height: 100%;
  .configuration {
    height: 100%;
    background: #ffffff;
    .configuration-tab-pane {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 55px;
      box-sizing: border-box;
      padding: 0 10px;
    }
    .configuration-view {
      width: 260px;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
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
            font-family: "PingFang-SC-Bold";
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
        .n-collapse-item:not(:first-child) {
          border-top: 0px;
        }
      }
    }
    .update-btn {
      margin-top: 17px;
      height: 43px;
      background: #7c87ff;
      border-radius: 15px;
      line-height: 43px;
    }
  }
  .configuration-arrow {
    width: 30px;
    text-align: center;
    background: #ffffff;
    padding-top: 20px;
    border-radius: 8px;
    cursor: pointer;
  }
  .information {
    width: 158px;
    margin-left: 17px;
    display: flex;
    flex-direction: column;
    .information-titile {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background: #ffffff;
      border-radius: 15px;
      color: #293270;
      font-size: 14px;
      flex-shrink: 0;
    }
    .dimension {
      width: 100%;
      height: 0;
      flex: 403;
      margin: 17px 0;
      background: #ffffff;
      border-radius: 15px;
    }
    .measure {
      width: 100%;
      height: 0;
      flex: 513;
      background: #ffffff;
      border-radius: 15px;
    }
  }
}
</style>

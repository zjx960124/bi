<script setup lang="ts">
import { AddCircleOutline, ChevronUp } from "@vicons/ionicons5";
import { useTargetData } from "@/utils/hooks/useTargetData";
const { targetData, chartEditStore } = useTargetData();

console.log(targetData);
</script>
<template>
  <div class="component-configuration-view">
    <div class="configuration">
      <div class="configuration-view">
        <!-- <n-collapse :default-expanded-names="['1', '2', '3']">
          <n-collapse-item title="绘色区域" name="1">
            <template #arrow>
              <n-icon size="16" color="#869299">
                <chevron-up />
              </n-icon>
            </template>
          </n-collapse-item>
          <n-collapse-item title="图例" name="2">
            <template #arrow>
              <n-icon size="16" color="#869299">
                <chevron-up />
              </n-icon>
            </template>
          </n-collapse-item>
          <n-collapse-item title="X轴" name="3">
            <template #arrow>
              <n-icon size="16" color="#869299">
                <chevron-up />
              </n-icon>
            </template>
          </n-collapse-item>
        </n-collapse> -->
        <component
          :is="targetData.chartConfig.conKey"
          :optionData="targetData.option"
        ></component>
      </div>
      <div class="update-btn">更新</div>
    </div>
    <div class="information"></div>
  </div>
</template>
<style lang='scss' scoped>
.component-configuration-view {
  display: flex;
  height: 100%;
  .configuration {
    width: 260px;
    height: 100%;
    .configuration-view {
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
          ::v-deep .n-collapse-item__header {
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
          ::v-deep .n-collapse-item__content-inner {
            padding: 0 25px 18px 25px;
          }
        }
        ::v-deep .n-collapse-item.n-collapse-item--active {
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
  .information {
    width: 145px;
    margin-left: 17px;
  }
}
</style>

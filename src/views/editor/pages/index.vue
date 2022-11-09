<script setup lang="ts">
import { computed } from "vue";
import { AddCircleOutline, CaretUp } from "@vicons/ionicons5";
import { LayersContent } from "./layers";
import { Page } from "./page";
import Project from "@/store/pageEditStore/pageEditStore";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { useChartHistoryStore } from "@/store/chartHistoryStore/chartHistoryStore";

const increasePage = () => {
  Project.value.increasePage();
};
</script>
<template>
  <div class="editor-pages">
    <n-collapse :default-expanded-names="['1', '2']" display-directive="show">
      <n-collapse-item title="页面" name="1">
        <page></page>
        <template #arrow>
          <n-icon>
            <caret-up />
          </n-icon>
        </template>
        <template #header-extra>
          <n-icon style="margin-right: 58px">
            <add-circle-outline @click.stop="increasePage" />
          </n-icon>
        </template>
      </n-collapse-item>
      <n-collapse-item title="元素" name="2">
        <layers-content></layers-content>
        <template #arrow>
          <n-icon>
            <caret-up />
          </n-icon>
        </template>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>
<style lang='scss' scoped>
.editor-pages {
  width: 309px;
  height: 100%;
  padding: 0 17px 0 30px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-sizing: border-box;
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
      :deep .n-collapse-item__content-wrapper {
        height: calc(100% - 50px);
        overflow: hidden;
        .n-collapse-item__content-inner {
          padding: 0 10px 20px 10px;
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
    .n-collapse-item:first-child {
      max-height: 30%;
    }
    .n-collapse-item:last-child {
      max-height: 70%;
    }
    .n-collapse-item--active {
      flex: 1;
    }
  }
}
</style>

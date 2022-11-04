<script setup lang="ts">
import { AddCircleOutline, CaretUp } from "@vicons/ionicons5";
import { LayersContent } from "./layers";
</script>
<template>
  <div class="editor-pages">
    <n-collapse :default-expanded-names="['1', '2']">
      <n-collapse-item title="页面" name="1">
        <div>页面</div>
        <template #arrow>
          <n-icon>
            <caret-up />
          </n-icon>
        </template>
        <template #header-extra>
          <n-icon style="margin-right: 58px">
            <add-circle-outline />
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
      ::v-deep .n-collapse-item__header {
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
    }
    ::v-deep .n-collapse-item.n-collapse-item--active {
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
}
</style>

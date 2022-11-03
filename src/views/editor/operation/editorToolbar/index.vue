<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { loadAsyncComponent } from "@/utils";

// 获取全部分类组件
import { genreMenuOptions } from "@/utils/hooks/useAside";
import cloneDeep from "lodash/cloneDeep";

const { dropdownItem } = import("./dropdownItem/index.ts");
const chartsItem = loadAsyncComponent(
  () => import("../../charts/components/chartsItem/index.vue")
);
</script>
<template>
  <div class="editor-toolbar">
    <div class="editor-toolbar-view">
      <div class="magnify"></div>
      <template v-for="(item, index) in genreMenuOptions" :key="index">
        <el-dropdown trigger="click">
          <n-button quaternary type="primary" color="#8386A1">
            {{ item.label }}
            <template #icon>
              <n-icon>
                <cash-icon />
              </n-icon>
            </template>
          </n-button>
          <template #dropdown>
            <template v-for="(items, indexs) in item.list" :key="indexs">
              <div>
                <el-button type="text">{{ items.label }}</el-button>
              </div>
            </template>
            <charts-item :menuOptions="item.all"></charts-item>
          </template>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.editor-toolbar {
  width: calc(100% - 469px);
  height: 67px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #f3f5ff;
  .editor-toolbar-view {
    background: #ffffff;
    margin-bottom: 17px;
    border-radius: 15px;
    height: 50px;
    display: flex;
    align-items: center;
  }
}
</style>

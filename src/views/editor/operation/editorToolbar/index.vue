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
    <template v-for="(item, index) in genreMenuOptions" :key="index">
      <el-dropdown trigger="click">
        <el-button style="margin-right: 20px">{{ item.label }}</el-button>
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
</template>
<style lang='scss' scoped>
.editor-toolbar {
  width: calc(100% - 350px);
  height: 55px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>

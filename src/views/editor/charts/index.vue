<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { loadAsyncComponent } from "@/utils";

// 获取全部分类组件
import {
  selectOptions,
  selectValue,
  menuOptions,
} from "@/utils/hooks/useAside";

const chartsItem = loadAsyncComponent(
  () => import("./components/chartsItem/index.vue")
);

const packages = reactive({
  menuOptions: [],
  selectOptions: {},
  categorys: {
    all: [],
  },
  categoryNames: {
    all: "所有",
  },
  categorysNum: 0,
  saveSelectOptions: {},
});

// 设置初始列表
const setSelectOptions = (categorys: any) => {
  for (const val in categorys) {
    packages.selectOptions = categorys[val];
    break;
  }
};

// 获取图表类组件
watch(
  // @ts-ignore
  () => selectOptions,
  (newData: { list: ConfigType[] }) => {
    packages.categorysNum = 0;
    if (!newData) return;
    newData.value.list.forEach((e: ConfigType) => {
      const value: ConfigType[] = (packages.categorys as any)[e.category];
      // @ts-ignore
      packages.categorys[e.category] =
        value && value.length ? [...value, e] : [e];
      packages.categoryNames[e.category] = e.categoryName;
      packages.categorys["all"].push(e);
    });
    for (const val in packages.categorys) {
      packages.categorysNum += 1;
      packages.menuOptions.push({
        key: val,
        label: packages.categoryNames[val],
      });
    }
    setSelectOptions(packages.categorys);
    // 默认选中处理
    selectValue.value = packages.menuOptions[0]["key"];
  },
  {
    immediate: true,
  }
);

// 处理点击事件
const clickItemHandle = (key: string) => {
  packages.selectOptions = packages.categorys[key];
};

console.log(packages);
</script>
<template>
  <div class="editor-charts">
    <div class="title">组件</div>
    <div class="charts-view">
      <el-menu
        @select="clickItemHandle"
        :default-active="packages.menuOptions[0]['key']"
        class="el-menu-vertical-demo"
      >
        <template v-for="(item, index) in packages.menuOptions" :key="index">
          <el-menu-item :index="item.key">
            <template #title>{{ item.label }}</template>
          </el-menu-item>
        </template>
      </el-menu>
      <charts-item :menuOptions="packages.selectOptions"></charts-item>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.editor-charts {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  .title {
    font-size: 14px;
    text-align: center;
  }
  .charts-view {
    flex: 1;
    display: flex;
  }
}
</style>

<script setup lang="ts">
import { useMainStore } from "@/store/main";
const mainStore = useMainStore();
const handleSelect = (index, indexPath) => {
  console.log(index);
};
</script>
<template>
  <el-menu
    :default-active="mainStore.default_navication"
    class="el-menu-vertical-demo"
    :router="true"
    @select="handleSelect"
  >
    <el-sub-menu index="1">
      <template #title>
        <span>数据分析</span>
      </template>
      <el-menu-item
        v-registed="{ name: '仪表盘', path: 'dashboardManage' }"
        :index="'dashboardManage'"
        >仪表盘</el-menu-item
      >
      <el-menu-item
        v-registed="{ name: '数据大屏', path: 'screenManage' }"
        :index="'screenManage'"
        >数据大屏</el-menu-item
      >
    </el-sub-menu>
    <el-menu-item index="2">
      <span>模板中心</span>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>
        <span>数据构建</span>
      </template>
      <el-menu-item index="3-1">数据源</el-menu-item>
      <el-menu-item index="3-2">数据类</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<style lang='scss' scoped>
</style>

<template>
  <logo />
  <el-menu
    :default-active="routeStore.default_navication"
    class="el-menu-vertical-demo"
    :router="true"
    background-color="#0E1337"
    text-color="#8386A1"
    active-text-color="#fff"
    @select="handleSelect"
  >
    <el-sub-menu index="1">
      <template #title>
        <span>数据分析</span>
      </template>
      <el-menu-item
        v-registed="{ name: '仪表板', path: 'dashboardManage' }"
        :index="'dashboardManage'"
        >仪表板</el-menu-item
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
<script setup lang="ts">
import logo from "@/views/layout/components/logo";
import { useRouteStore } from "@/store/useRoute/useRoute";
const routeStore = useRouteStore();
const handleSelect = (index: any, indexPath: any) => {};
</script>
<style lang="scss" scoped>
::v-deep .el-menu-item.is-active{
  background: linear-gradient(90deg, rgba(91,101,195,0.8) 0%, rgba(122,133,255,0.3) 100%);
}
</style>

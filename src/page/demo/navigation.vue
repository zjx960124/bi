<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const routerList = router
  .getRoutes()
  .filter((item) => item.path === "/hook/hookList")?.[0].components;

import { useRouteStore } from "@/store/useRoute/useRoute";
const routeStore = useRouteStore();
const handleSelect = (index: string) => {
  routeStore.$patch({
    hook_active: index,
  });
};
</script>
<template>
  <div class="memu-title">hook列表</div>
  <el-menu
    default-active="store"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <template v-for="(item, key) in routerList" :key="key">
      <el-menu-item :index="key">
        <el-icon><icon-menu /></el-icon>
        <span>{{ key }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<style lang='scss' scoped>
.memu-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
}
.el-menu-vertical-demo {
  height: calc(100% - 40px);
}
</style>

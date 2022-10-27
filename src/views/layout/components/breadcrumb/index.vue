<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { useRouteStore } from "@/store/useRoute/useRoute";
import { ref } from "vue";
const routeStore = useRouteStore();
const breadcrumbList = ref(routeStore.breadcrumbList);
</script>
<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="(item, index) in breadcrumbList" :key="index">
      <el-breadcrumb-item v-changeBreadcrumb="index" :to="item.path">{{
        item.name
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<style lang='scss' scoped>
</style>

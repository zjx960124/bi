<template>
  <div class="layout-container">
    <div class="layout-container-left">
      <navigation></navigation>
    </div>
    <div class="layout-container-right">
      <div class="layout-container-breadcrumb">
        <navbar />
      </div>
      <div class="layout-container-main">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="path" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import navigation from "./components/navigation";
import navbar from "./components/navbar/index.vue";
import { useRoute } from "vue-router";
import { useRouteStore } from "@/store/useRoute/useRoute";
import { watch, ref } from "vue";
const route = useRoute();
const routeStore = useRouteStore();
const path = ref("");
watch(
  () => route.fullPath,
  (val) => {
    if (val) {
      path.value = val;
      routeStore.setDefaultRoute(route.path);
      routeStore.registerBreadcrumb({
        name: route.meta?.title as string,
        path: route.path,
      });
    }
  },
  { immediate: true, deep: true }
);
</script>
<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f3f5ff;
  .layout-container-left {
    width: 260px;
    height: 100%;
    background: #0e1337;
    border: 1px solid #364059;
  }
  .layout-container-right {
    width: calc(100vw - 260px);
    height: 100%;
    .layout-container-main {
      margin: auto 15px;
    }
  }
}
</style>

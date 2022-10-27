<script lang="ts" setup>
import { useRouteStore } from "@/store/useRoute/useRoute";
const routeStore = useRouteStore();
</script>

<template>
  <div class="container">
    <div class="container-main">
      <div class="hook-list-view"><Navigation></Navigation></div>
      <div class="hook-view"><router-view :name="routeStore.hook_active" /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .container-main {
    width: 100%;
    height: 100%;
    display: flex;
    .hook-list-view {
      width: 0;
      height: 100%;
      flex: 1;
      min-width: 300px;
      flex-shrink: 0;
    }
    .hook-view {
      width: 0;
      height: 100%;
      flex: 5;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
}
</style>

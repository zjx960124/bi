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
          <router-view :key="key" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import navigation from "./components/navigation";
import navbar from "./components/navbar/index.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const key = computed(() => {
  return route.path;
});
</script>
<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F3F5FF;
  .layout-container-left {
    width: 260px;
    height: 100%;
    background: #0e1337;
    border: 1px solid #364059;
  }
  .layout-container-right {
    width: calc(100vw - 275px);
    height: 100%;
  }
}
</style>

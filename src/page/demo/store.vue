<script setup lang="ts">
import { useRouteStore } from "@/store/useRoute/useRoute";
const mainStore = useRouteStore();
const updateName = () => {
  mainStore.$patch({
    name: "测试成功",
  });
};
let b: number;
let a;
</script>

<template>
  <div>{{ mainStore.name }}</div>
  <div>{{ mainStore.nameLength }}</div>
  <el-button @click="updateName">测试pinia异步</el-button>
</template>

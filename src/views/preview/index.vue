<script setup lang="ts">
import { ref } from "vue";
import {
  getLocalStorage,
  getSessionStorageInfo,
  animationsClass,
} from "@/utils";
import { PreviewPage } from "./previewPage";
const projectInfo = getSessionStorageInfo();
const currentPageIndex = ref(0);

console.log(projectInfo);

const indexModules = import.meta.globEager(
  "@/packages/components/**/index.vue"
);

for (const key in indexModules) {
  const url = key.split("/");
  window["$vue"].component(
    "V" + url[url.length - 2],
    indexModules[key].default
  );
}

setInterval(() => {
  console.log(currentPageIndex.value);
  if (currentPageIndex.value === projectInfo.list.length - 1) {
    currentPageIndex.value = 0;
  } else {
    currentPageIndex.value = currentPageIndex.value + 1;
  }
}, 5000);
</script>
<template>
  <template v-for="(item, index) in projectInfo.list" :key="index">
    <keep-alive>
      <component
        v-show="index === currentPageIndex"
        :componentInfo="item"
        :is="PreviewPage"
        :class="animationsClass([projectInfo.pageAnimation])"
      ></component>
    </keep-alive>
  </template>
</template>
<style lang='scss' scoped>
</style>

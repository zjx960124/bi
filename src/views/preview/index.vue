<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  getLocalStorage,
  getSessionStorageInfo,
  animationsClass,
} from '@/utils';
import { PreviewPage } from './previewPage';
const props = defineProps({
  previewId: {
    type: String,
    required: true,
  },
});
const projectInfo = getSessionStorageInfo() || getLocalStorage(props.previewId);
const currentPageIndex = ref(0);

console.log(projectInfo);

const indexModules = import.meta.globEager(
  '@/packages/components/**/index.vue'
);
for (const key in indexModules) {
  const url = key.split('/');
  window['$vue'].component(
    'V' + url[url.length - 2],
    indexModules[key].default
  );
}

const onPageShuffing = (projectInfo: any) => {
  if (projectInfo.pageConfig.onShuffing) {
    setInterval(() => {
      if (currentPageIndex.value === projectInfo.list.length - 1) {
        currentPageIndex.value = 0;
      } else {
        currentPageIndex.value = currentPageIndex.value + 1;
      }
    }, projectInfo.pageConfig.shuffingInterval * 1000);
  }
};

onPageShuffing(projectInfo);
</script>
<template>
  <template v-for="(item, index) in projectInfo.list" :key="index">
    <keep-alive>
      <component
        v-show="index === currentPageIndex"
        :componentInfo="item"
        :is="PreviewPage"
        :class="animationsClass(projectInfo.pageConfig)"
      ></component>
    </keep-alive>
  </template>
</template>
<style lang="scss" scoped></style>

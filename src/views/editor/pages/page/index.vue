<script setup lang="ts">
import { computed, ref, watch, toRef } from "vue";
import Project from "@/store/pageEditStore/pageEditStore";

const checkPage = (index: number) => {
  Project.value.checkPage(index);
};
</script>
<template>
  <div class="page-view">
    <template v-for="(item, index) in Project.pageList" :key="index">
      <div
        contenteditable="true"
        :class="{ active: Project.currentIndex === index }"
        @click="checkPage(index)"
        class="page-item"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
</template>
<style lang='scss' scoped>
.page-view {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  cursor: pointer;
  .page-item {
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    margin: 0 10px;
  }
  .active {
    background: #f3f5ff;
  }
}
</style>

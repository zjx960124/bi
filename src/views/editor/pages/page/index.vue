<script setup lang="ts">
import { computed, ref, watch, toRef } from "vue";
import Project from "@/store/pageEditStore/pageEditStore";
import { DocumentTextSharp } from "@vicons/ionicons5";
import { Delete } from "@vicons/carbon";

const checkPage = (index: number) => {
  Project.value.checkPage(index);
};

const deletePage = (index: number) => {
  Project.value.deletePage(index);
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
        <n-icon
          class="page-icon"
          size="14"
          :component="DocumentTextSharp"
        ></n-icon>
        {{ item.name }}
        <n-icon
          class="page-delete"
          size="14"
          :component="Delete"
          @click.stop="deletePage(index)"
        ></n-icon>
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
    text-align: left;
    font-family: "PingFang-SC-Medium";
    font-size: 12px;
    display: flex;
    align-items: center;
    position: relative;
    .page-icon {
      margin: 0 8px;
    }
    .page-delete {
      position: absolute;
      right: 10px;
      top: 7px;
    }
  }
  .active {
    background: #f3f5ff;
  }
}
</style>

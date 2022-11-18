<script setup lang="tsx">
import { computed, ref, watch, toRef } from "vue";
import Project from "@/store/pageEditStore/pageEditStore";
import { DocumentTextSharp } from "@vicons/ionicons5";
import { Delete } from "@vicons/carbon";
import Draggable from "vuedraggable";
import { useModal } from "@/utils/hooks/useModal";

const checkPage = (index: number) => {
  Project.value.checkPage(index);
};

const deletePage = (index: number) => {
  useModal({
    title: "提 示",
    props: {
      width: 700,
    },
    content: () => (
      <>
        <span>是否删除该页面,删除后无法恢复！</span>
      </>
    ),
    onConfirm: () => {
      Project.value.deletePage(index);
    },
  });
};

// 移动结束处理
const onMoveCallback = (val: any) => {
  const { oldIndex, newIndex } = val.moved;
  console.log(oldIndex, newIndex);
  Project.value.setCurrentIndex(newIndex);
  console.log(Project.value.getPageList());
};
</script>
<template>
  <div class="page-view">
    <draggable
      item-key="id"
      v-model="Project.pageList"
      ghostClass="ghosts"
      @change="onMoveCallback"
    >
      <template #item="{ element, index }">
        <div
          :class="{ active: Project.currentIndex === index }"
          @click="checkPage(index)"
          class="page-item"
        >
          <n-icon
            class="page-icon"
            size="14"
            :component="DocumentTextSharp"
          ></n-icon>
          {{ element.name }}
          <n-icon
            class="page-delete"
            size="14"
            :component="Delete"
            @click.stop="deletePage(index)"
          ></n-icon>
        </div>
      </template>
    </draggable>
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

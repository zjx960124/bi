<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from 'vue';
import folderList from './folderlist';
import { useDataListInit } from './folderlist/useData';
const { list } = useDataListInit();
const state = reactive({
  searchValue: ''
});

const { searchValue } = toRefs(state);
</script>
<template>
  <JsLayout title="仪表盘">
    <template #operation>
      <div class="searchBox">
        <img
          width="22"
          height="21"
          src="/src/assets/analysis/search.png"
        />
        <el-input
          class="input"
          v-model="searchValue"
          placeholder="请输入关键字搜索"
        >
        </el-input>
      </div>
      <div class="el-button-normal  margin-left-22">
        <img
          width="18"
          height="18"
          src="/src/assets/analysis/addDashboard.png"
        />
        <span class="text">新建仪表盘</span>
      </div>
      <div class="el-button-primary margin-left-22">
        <img
          width="20"
          height="14"
          src="/src/assets/analysis/addFolder.png"
        /><span class="text">新建文件夹</span>
      </div>
    </template>
    <template #main>
      <template
        v-for="(item, index) in list"
        :key="index"
      >
        <folder-list
          :folderName="item.folderName"
          :list="item.list"
        ></folder-list>
      </template>
    </template>
  </JsLayout>
</template>
<style lang='scss' scoped>
.searchBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 393px;
  height: 43px;
  line-height: 43px;
  padding: 0 17px;
  background: #ffffff;
  border-radius: 22px;
  .input {
    :deep(.el-input__inner) {
      padding: 0 12px;
      border: none;
    }
  }
}
.margin-left-22 {
  margin-left: 22px;
}
</style>

<template>
  <JsLayout title="数据源" background="transparent">
    <template #operation>
      <div class="searchBox">
        <img width="22" height="21" src="~@/assets/analysis/search.png" />
        <el-input
          class="input"
          v-model="searchValue"
          clearable
          placeholder="共X个文件"
        >
        </el-input>
      </div>
      <div class="el-button-primary margin-left-22" @click="openDraw">
        <img width="18" height="18" src="~@/assets/data/addData.png" />
        <span class="text">新建数据源</span>
      </div>
    </template>
    <template #main>
      <div class="datalist-container">
        <div class="left"><data-list /></div>
        <div class="right"><data-table :drawData="drawData" /></div>
      </div>
    </template>
  </JsLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dataList from "./components/dataList.vue";
import dataTable from "./components/dataTable.vue";
import { drawerTypes } from "../types/index";
const searchValue = ref("");

//新建数据源
const drawData = ref<drawerTypes>({});
const openDraw = () => {
  drawData.value = { drawer: true, type: "add" };
};
</script>
<style scoped lang="scss">
.datalist-container {
  width: 100%;
  height: calc(100vh - 180px);
  display: flex;
  justify-content: space-between;
  & > .left {
    width: 284px;
    margin-right: 14px;
  }

  & > .right {
    width: calc(100% - 300px);
  }
}

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
    :deep(.el-input__wrapper) {
      box-shadow: none;
      .el-input__inner {
        padding: 0 12px;
        border: none;
      }
    }
  }
}

.margin-left-22 {
  margin-left: 22px;
}

.margin-left-11 {
  margin-left: 11px;
}
</style>

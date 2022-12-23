<template>
  <JsLayout title="数据源" background="transparent">
    <template #operation>
      <div class="searchBox">
        <img width="22" height="21" src="~@/assets/analysis/search.png" />
        <el-input class="input" v-model="searchValue" clearable placeholder="共X个文件">
        </el-input>
      </div>
      <div class="el-button-primary margin-left-22" @click="openDraw">
        <img width="18" height="18" src="~@/assets/data/addData.png" />
        <span class="text">新建数据源</span>
      </div>
      <el-dropdown class="margin-left-22" v-if="datasource?.accessType == 2">
        <el-button type="primary">
          <img width="18" height="18" src="~@/assets/data/editexcel.png" />编辑EXCEL
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openRelpaceDialog">替换数据</el-dropdown-item>
            <el-dropdown-item @click="openAddDialog">增加数据</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <template #main>
      <div class="datalist-container">
        <div class="left">
          <data-list @getDatasourceType="getDatasourceType" />
        </div>
        <div class="right">
          <data-table :drawData="drawData" :datasource="datasource" />
        </div>
      </div>
    </template>
  </JsLayout>
  <addDialog ref="addDialogs" @restData="restData" />
  <replaceDialog ref="replaceDialogs" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dataList from "./components/dataList.vue";//左侧列表
import dataTable from "./components/dataTable.vue";//右侧表格
import addDialog from "./components/addDialog.vue";
import replaceDialog from "./components/replaceDialog.vue";
import { drawerTypes, checkDatasourceType } from "../types/index";
import { DataSource } from "@/api/dataSource";
const searchValue = ref("");

//新建数据源
const drawData = ref<drawerTypes>({});
const openDraw = () => {
  drawData.value = { drawer: true, type: "add" };
};

//打开新增数据
const addDialogs = ref();
const openAddDialog = () => {
  addDialogs.value.initData(datasource.value);
};

//打开替换数据
const replaceDialogs = ref();
const openRelpaceDialog = () => {
  replaceDialogs.value.initData();
};

//获取数据源类型(左侧列表)
const { getTableByDataSourceId } = DataSource;
const datasource = ref<checkDatasourceType>();
const getDatasourceType = async (val: checkDatasourceType) => {
  datasource.value = val;
};

//刷新
const restData = () => {

}
</script>
<style scoped lang="scss">
.datalist-container {
  width: 100%;
  height: calc(100vh - 180px);
  display: flex;
  justify-content: space-between;

  &>.left {
    width: 284px;
    margin-right: 14px;
  }

  &>.right {
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

.el-dropdown {
  height: 44px;

  :deep(.el-button) {
    height: 100%;
    border-radius: 22px;
    padding: 0 16px;

    & img {
      margin-right: 8px;
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

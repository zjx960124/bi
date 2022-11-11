<template>
  <div class="datatable-container-box">
    <div class="tableBox el-common-tableBox">
      <el-table
        v-if="datasource?.type === 'sql'"
        :data="tableData"
        align="center"
        fit
        :highlight-current-row="false"
        :border="false"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名称"
          min-width="120"
          align="center"
        />
        <el-table-column label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button
              class="el-button-edit"
              link
              type="primary"
              size="small"
              icon="InfoFilled"
              @click="openDetail(row)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="datasource?.type === 'file'"
        :data="tableData"
        align="center"
        fit
        :highlight-current-row="false"
        :border="true"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名称"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="name"
          label="最近同步时间"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="name"
          label="状态"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="name"
          label="大小"
          min-width="120"
          align="center"
        />
        <el-table-column label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button
              class="el-button-edit"
              link
              type="primary"
              size="small"
              icon="InfoFilled"
              @click="openDetail(row)"
            >
              详情
            </el-button>
            <el-button
              class="el-button-edit"
              link
              type="primary"
              size="small"
              icon="Download"
              @click="openDetail(row)"
            >
              下载
            </el-button>
            <el-button
              class="el-button-edit"
              link
              type="danger"
              size="small"
              icon="Delete"
              @click="openDetail(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="->,prev, pager, next, total, sizes,jumper"
        :total="1000"
      />
    </div>
  </div>

  <el-drawer v-model="drawInfo.drawer" :direction="direction" :size="getSize">
    <template #title>
      <h4 class="title" v-if="drawInfo.type == 'detail'">表详情</h4>
      <h4 class="title" v-if="drawInfo.type == 'add' && !isShowType">
        新建数据源
      </h4>
      <h4 class="title" v-if="isShowType == 'sql'">添加MySQL数据源</h4>
      <h4 class="title" v-if="isShowType == 'file'">上传文件</h4>
    </template>
    <template #default>
      <template v-if="drawInfo.type == 'detail'">
        <div class="info-box">表名称：chart</div>
        <div class="table-box">
          <div class="info-box">表描述:</div>
          <el-table
            :data="drawData"
            align="center"
            fit
            :highlight-current-row="false"
            :border="false"
            style="width: 100%"
          >
            <el-table-column
              prop="fieldName"
              label="字段名称"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="fieldType"
              label="字段类型"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="fieldDesc"
              label="字段描述"
              min-width="120"
              align="center"
            />
          </el-table>
        </div>
      </template>
      <template v-if="drawInfo.type == 'add'">
        <div class="datasource-action-content" v-if="!isShowType">
          <div
            class="item"
            v-for="(item, idx) in dataList"
            :key="idx"
            @click="openSetting(item)"
          >
            <div class="item-img"></div>
            <div class="item-title">{{ item.title }}</div>
          </div>
        </div>
        <template v-if="isShowType">
          <setting v-if="isShowType == 'sql'" :isShowTitle="false" />
          <uploadfile v-if="isShowType == 'file'" :isShowTitle="false" />
        </template>
      </template>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
import setting from "./setting.vue";
import uploadfile from "./uploadFile.vue";
import {
  dataTypes,
  drawerTypes,
  datasourceType,
} from "@/views/construction/types/index";
const tableData = ref([{ name: "2222" }]);
const drawData = ref([{ fieldName: "2222" }]);
const direction = ref("rtl");
const isShowType = ref<string>("");
let drawInfo = ref<drawerTypes>({
  type: "add",
  drawer: false,
});

let datasource = ref<datasourceType>();

//新建数据源
const dataList = ref<Array<dataTypes>>([
  { type: "sql", title: "MySQL" },
  { type: "file", title: "本地文件（.csv  .xlsx  .xls）" },
  { type: "api", title: "API数据" },
]);

//监听数据
const props = defineProps({
  drawData: {
    type: Object,
  },
  datasource: {
    type: Object,
    default: () => {
      return {
        type: "sql",
      };
    },
  },
});

watchEffect(() => {
  if (props.drawData) {
    drawInfo.value = props.drawData;
  }
  if (props.datasource) {
    datasource.value = props.datasource;
  }
});

const getSize = computed(() => {
  if (drawInfo.value.type == "add") {
    return "20%";
  } else if (drawInfo.value.type == "detail") {
    return "30%";
  }
});

const openSetting = (item: dataTypes) => {
  const { type } = item;
  isShowType.value = type as string;
};

//详情
const openDetail = (val: any) => {
  drawInfo.value = { type: "detail", drawer: true };
};
</script>
<style scoped lang="scss">
.datatable-container-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 22px;
  padding: 14px;
}
h4.title {
  height: auto;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #293270;
  line-height: 52px;
  text-align: left;
  position: relative;
  padding-left: 15px;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 2px;
    height: 16px;
    transform: translateY(-50%);
    background: linear-gradient(180deg, #0059e8 0%, #37e2c1 100%);
  }
}
.info-box {
  text-align: left;
  height: auto;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #293270;
  line-height: 52px;
}

.table-box {
  :deep(.el-table th.el-table__cell) {
    background: #f5f6f9;
  }
}

.datasource-action-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 52px);
  padding: 0 27px;
  box-sizing: border-box;
  & .item {
    flex: 0.3;
    height: 100%;
    background: #f3f5ff;
    border-radius: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    .item-img {
      height: calc(100% - 42px);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      background-color: #bfbfbf;
    }
    .item-title {
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #293270;
      text-align: left;
      line-height: 42px;
      padding-left: 15px;
      box-sizing: border-box;
    }
  }
}
</style>

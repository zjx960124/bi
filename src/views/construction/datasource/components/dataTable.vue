<template>
  <div class="datatable-container-box">
    <div
      class="tableBox el-common-tableBox"
      v-if="datasource && Object.keys(datasource).length > 0"
    >
      <el-table
        v-if="datasource?.accessType === 1 && tableData.length > 0"
        :data="tableData"
        align="center"
        fit
        show-overflow-tooltip
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
        <el-table-column
          label="操作"
          width="300"
          align="center"
        >
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
        v-else-if="datasource?.accessType === 2 && tableData.length > 0"
        :data="tableData"
        align="center"
        fit
        :highlight-current-row="false"
        show-overflow-tooltip
        :border="false"
        style="width: 100%"
      >
        <el-table-column
          :prop="item.value"
          :label="item.name"
          v-for="(item, index) in tableHeader"
          :show-overflow-tooltip="true"
          :key="index"
        >
        </el-table-column>
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
        :total="page.counts"
        v-if="tableData.length > 0"
      />
      <el-empty
        :image="imgUrl"
        class="datasource-empty"
        description="暂无数据"
        v-else
      />
    </div>
    <el-empty
      :image="imgUrl"
      class="datasource-empty"
      description="暂无数据"
      v-else
    />
  </div>

  <el-drawer
    v-model="drawInfo.drawer"
    :direction="direction"
    :size="getSize"
  >
    <template #title>
      <h4
        class="title"
        v-if="drawInfo.type == 'detail'"
      >表详情</h4>
      <h4
        class="title"
        v-if="drawInfo.type == 'add' && !isShowType"
      >
        新建数据源
      </h4>
      <h4
        class="title"
        v-if="isShowType == 'sql'"
      >添加MySQL数据源</h4>
      <h4
        class="title"
        v-if="isShowType == 'file'"
      >上传文件</h4>
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
            show-overflow-tooltip
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
        <div
          class="datasource-action-content"
          v-if="!isShowType"
        >
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
          <setting
            v-if="isShowType == 'sql'"
            :isShowTitle="false"
          />
          <uploadfile
            v-if="isShowType == 'file'"
            :isShowTitle="false"
          />
        </template>
      </template>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
import noData from "@/assets/data/noData.png";
import setting from "./setting.vue";
import uploadfile from "./uploadFile.vue";
import { DataSource } from "@/api/dataSource";
import {
  dataTypes,
  drawerTypes,
  checkDatasourceType,
  excelByIdType,
} from "@/views/construction/types/index";
const imgUrl = ref(noData);
const tableData = ref([]);
const tableHeader = ref<Array<{ name: string; value: string }>>([]);
const page = ref<excelByIdType>({
  pageNum: 0,
  pageSize: 10,
  counts: 0,
});
const drawData = ref([]);
const direction = ref("rtl");
const isShowType = ref<string>("");
let drawInfo = ref<drawerTypes>({
  type: 'add',
  drawer: false
});

let datasource = ref<checkDatasourceType>();

//新建数据源
const dataList = ref<Array<dataTypes>>([
  { type: 'sql', title: 'MySQL' },
  { type: 'file', title: '本地文件（.csv  .xlsx  .xls）' },
  { type: 'api', title: 'API数据' }
]);

//监听数据
const props = defineProps({
  drawData: {
    type: Object
  },
  datasource: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const getSize = computed(() => {
  if (drawInfo.value.type == 'add') {
    return '20%';
  } else if (drawInfo.value.type == 'detail') {
    return '30%';
  }
});

const openSetting = (item: dataTypes) => {
  const { type } = item;
  isShowType.value = type as string;
};

//详情
const openDetail = (val: any) => {
  drawInfo.value = { type: 'detail', drawer: true };
};

const { getAllExcelDataByDataSourceId, getDataSourceById } = DataSource;
//根据数据源id获取excel数据
const getAllExcelDataById = async (val: checkDatasourceType) => {
  const { id } = val;
  tableData.value = [];
  tableHeader.value = [];
  const {
    data: { data, counts },
  } = await getAllExcelDataByDataSourceId({
    dataSourceId: id,
    pageNum: page.value.pageNum,
    pageSize: page.value.pageSize,
  });
  if (data && data.length > 0) {
    tableData.value = data;
    page.value.counts = counts;
    data.map((item: any, inx: number) => {
      if (inx == 0) {
        Object.keys(item).forEach((i) => {
          let obj = { name: i, value: i };
          tableHeader.value.push(obj);
        });
      }
    });
  }
};

//根据id获取数据源数据
const getDataSourceByIdList = async (val: checkDatasourceType) => {
  const { id } = val;
  tableData.value = [];
  const { data } = await getDataSourceById({ dataSourceId: id });
  if (data && data.length > 0) {
    tableData.value = data;
    data.map((item: any, inx: number) => {
      if (inx == 0) {
        Object.keys(item).forEach((i) => {
          let obj = { name: i, value: i };
          tableHeader.value.push(obj);
        });
      }
    });
  }
};

//监听数据变化
watchEffect(() => {
  if (props.drawData) {
    drawInfo.value = props.drawData;
  }
  if (props.datasource && Object.keys(props.datasource).length > 0) {
    datasource.value = props.datasource;
    if (datasource.value.accessType == 1) {
    } else {
      getAllExcelDataById(datasource.value);
    }
  }
});
</script>
<style scoped lang="scss">
.datatable-container-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 22px;
  padding: 14px;
  box-sizing: border-box;
  position: relative;
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
    content: '';
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
      font-family: 'PingFang SC';
      font-weight: 400;
      color: #293270;
      text-align: left;
      line-height: 42px;
      padding-left: 15px;
      box-sizing: border-box;
    }
  }
}
.datasource-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ::v-deep .el-empty__image {
    width: 140px !important;
  }
}
</style>

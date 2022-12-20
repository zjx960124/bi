<template>
  <div class="datatable-container-box">
    <div
      class="tableBox el-common-tableBox"
      v-if="datasource && Object.keys(datasource).length > 0"
    >
      <el-table
        v-if="datasource?.accessType === 1"
        :data="tableData"
        align="center"
        fit
        show-overflow-tooltip
        :highlight-current-row="false"
        :border="false"
        style="width: 100%"
      >
        <el-table-column
          prop="tableName"
          label="名称"
          min-width="120"
          align="center"
          width="auto"
        />
        <el-table-column label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button
              class="el-button-edit"
              link
              type="primary"
              size="small"
              icon="InfoFilled"
              @click="openSQLdetail(row)"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-else-if="datasource?.accessType === 2"
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
              @click="downLoadData(row)"
            >
              下载
            </el-button>

            <el-popconfirm
              title="确定删除该数据？"
              @confirm.stop="deleteRow(row)"
            >
              <template #reference>
                <el-button
                  class="el-button-edit"
                  link
                  type="danger"
                  size="small"
                  icon="Delete"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
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
    </div>
    <el-empty
      :image="imgUrl"
      class="datasource-empty"
      description="暂无数据"
      v-else
    />
  </div>

  <el-drawer v-model="drawInfo.drawer" :direction="direction" :size="getSize">
    <template #title>
      <h4 class="title" v-if="drawInfo.type == 'detail'">
        {{ datasource.accessType == 2 ? "文件详情" : "表详情" }}
      </h4>
      <h4 class="title" v-if="drawInfo.type == 'add' && isShowType == 'none'">
        新建数据源
      </h4>
      <h4 class="title" v-if="isShowType == 'sql'">添加MySQL数据源</h4>
      <h4 class="title" v-if="isShowType == 'file'">上传文件</h4>
    </template>
    <template #default>
      <template v-if="drawInfo.type == 'detail'">
        <div class="info-box" v-if="datasource.accessType == 2">
          文件名称：{{ datasource.dataSourceShowName }}
        </div>
        <div class="info-box">表名称：{{ datasource.tableName }}</div>
        <div class="table-box">
          <div class="info-box">表描述:</div>
          <el-table
            :data="drawDataList"
            align="center"
            fit
            :highlight-current-row="false"
            show-overflow-tooltip
            :border="false"
            style="width: 100%"
          >
            <el-table-column
              prop="columnName"
              label="字段名称"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="columnType"
              label="字段类型"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="commentComment"
              label="字段描述"
              min-width="120"
              align="center"
            />
          </el-table>
        </div>
      </template>
      <template v-if="drawInfo.type == 'add'">
        <div class="datasource-action-content" v-if="isShowType == 'none'">
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
            @setIsShowType="setIsShowType"
          />
          <uploadfile
            v-if="isShowType == 'file'"
            :isShowTitle="false"
            @setIsShowType="setIsShowType"
          />
        </template>
      </template>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
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
import { ElMessage } from "element-plus";
const imgUrl = ref(noData);

const tableData = ref([]); //表格数据
const tableHeader = ref<Array<{ name: string; value: string }>>([]); //表头
//分页数据
const page = ref<excelByIdType>({
  pageNum: 0,
  pageSize: 10,
  counts: 0,
});

//数据源信息
let datasource = ref<checkDatasourceType>();

//监听数据
const props = defineProps({
  drawData: {
    type: Object,
  },
  datasource: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
let drawInfo = ref<drawerTypes>({
  type: "add",
  drawer: false,
});
//监听数据变化
watch(
  () => props.drawData,
  (val) => {
    if (val) {
      drawInfo.value = val;
    }
  }
);
watch(
  () => props.datasource,
  (val) => {
    if (val && Object.keys(val).length > 0) {
      datasource.value = val;
      if (datasource.value.accessType == 1) {
        getDataSourceByIdList();
      } else {
        getAllExcelDataById();
      }
    }
  }
);
const {
  getAllExcelDataByDataSourceId,
  getColumnByTableId,
  deleteFileDataByDataSourceIdAndDataId,
  getTableByDataSourceId,
} = DataSource;
//根据数据源id获取excel数据
const getAllExcelDataById = async () => {
  const id = datasource.value?.id;
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
const getDataSourceByIdList = async () => {
  const id = datasource.value?.id;
  tableData.value = [];
  const { data } = await getTableByDataSourceId({ dataSourceId: id });
  if (data && data.length > 0) {
    tableData.value = data;
  }
};

//文件详情
const openDetail = async (val: any) => {
  const { data } = await getColumnByTableId({
    tableName: datasource.value?.tableName,
    dataSourceId: datasource.value?.id,
  });
  drawDataList.value = data;
  drawInfo.value = { type: "detail", drawer: true };
};

//删除文件数据
const deleteRow = async (val: any) => {
  const { id } = val;
  const { code, msg } = await deleteFileDataByDataSourceIdAndDataId({
    dataSourceId: datasource.value?.id,
    dataId: id,
  });
  if (code == 200) {
    ElMessage.success("删除成功");
    getAllExcelDataById();
  } else {
    ElMessage.error(msg);
  }
};

//sql详情
const openSQLdetail = async (val: any) => {
  const { data } = await getColumnByTableId({
    tableName: val.tableName,
    dataSourceId: datasource.value?.id,
  });
  drawDataList.value = data;
  drawInfo.value = { type: "detail", drawer: true };
};

//下载数据
const downLoadData = (val: any) => {
  let url = `/rest/bi/template/downloadData/${val.id}/${datasource.value?.id}`;
  var down = document.createElement("a");
  down.href = url;
  document.body.appendChild(down);
  down.click();
  down.remove();
};

//抽屉框数据
const drawDataList = ref([]);
const direction = ref("rtl");
const getSize = computed(() => {
  if (drawInfo.value.type == "add") {
    return "20%";
  } else if (drawInfo.value.type == "detail") {
    return "30%";
  }
});

//新建数据源
const dataList = ref<Array<dataTypes>>([
  { type: "sql", title: "MySQL" },
  { type: "file", title: "本地文件（.csv  .xlsx  .xls）" },
  // { type: "api", title: "API数据" },
]);

const openSetting = (item: dataTypes) => {
  const { type } = item;
  isShowType.value = type as string;
};
//MySQL数据源取消按钮
const isShowType = ref<string>("none");
const setIsShowType = (val: string) => {
  drawInfo.value = { type: "add", drawer: false };
  isShowType.value = "none";
};
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

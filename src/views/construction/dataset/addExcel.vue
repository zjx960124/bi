<template>
  <div class="excel-create-container">
    <div class="left">
      <el-button type="primary" class="left-button" @click="goBack">
        <el-icon> <ArrowLeft /> </el-icon>返回
      </el-button>
      <div class="upload-file-container">
        <div class="content-list">
          <div class="content-list-title">
            <span
              ><img src="@/assets/data/search-sql.png" class="search" /><span
                >当前数据源</span
              ></span
            >
            <img
              src="@/assets/data/rest.png"
              class="rest"
              @click="getAllDataSource"
            />
          </div>
          <div class="list-box" v-loading="dataLoading">
            <el-scrollbar
              style="height: 700px"
              v-if="dataList && dataList.length > 0"
            >
              <div
                class="item"
                v-for="(item, idx) in dataList"
                :class="{ active: currentIndex === idx }"
                @click="sqlClick(item, idx)"
              >
                <span>{{ item?.dataSourceShowName }}</span>
              </div>
            </el-scrollbar>
            <el-empty
              v-else
              :image="noImgUrl"
              class="datasource-empty"
              description="暂无内容"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <section>
        <!-- 表标题及操作按钮 -->
        <div class="right-title">
          <el-input
            v-model="dataSetName"
            style="width: 50%"
            class="dataSetName"
          />
          <div class="workBox">
            <el-button
              type="primary"
              style="height: 43px; width: 89px; border-radius: 22px"
              @click="sqlSave"
            >
              <img
                src="@/assets/data/sql-save.png"
                style="width: 16px; margin-right: 8px"
              />
              保存
            </el-button>
          </div>
        </div>
        <!-- 表标题及操作按钮 -->
        <div class="right-content">
          <div class="tableBox el-common-tableBox">
            <!-- 内容数据 -->
            <el-table
              :data="tableData"
              :height="680"
              align="center"
              fit
              :highlight-current-row="false"
              :border="false"
              style="width: 100%"
            >
              <el-table-column
                v-for="(it, idx) in headers"
                :key="idx"
                :prop="it.fieldName"
                :label="it.showName"
                :min-width="it.minWidth"
                align="center"
                :show-overflow-tooltip="true"
              />
            </el-table>
            <div
              style="display: flex; justify-content: center; margin-top: 5px"
            >
              <el-pagination
                class="pagination"
                background
                layout="->,prev, pager, next, total, sizes,jumper"
                :total="page.counts"
                :page-size="page.pageSize"
                :current-page="page.pageNum"
                @current-change="currentChange"
                @size-change="sizeChange"
              />
            </div>
            <!-- 内容数据 -->
            <!-- 暂无数据模块 -->
            <el-empty
              :image="excelImgUrl"
              class="datasource-empty"
              description="暂无内容"
            />
            <!-- 暂无数据模块 -->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import excelData from "@/assets/data/excelNo.png";
import noData from "@/assets/data/noData.png";
import { ref, onMounted, reactive, toRefs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { DataSource } from "@/api/dataSource";
import { addDataSetOrFileFolder, getDataByTableId } from "@/api/dataset";
import { checkDatasourceType, headerType } from "@/views/construction/types";

//暂无数据图片
const excelImgUrl = ref(excelData);
const noImgUrl = ref(noData);
//左侧表数据列表
let dataList = ref<Array<checkDatasourceType>>();
let currentIndex = ref<number>();
let dataLoading = ref<boolean>(false);
//获取地址栏参数
const route = useRoute();
const router = useRouter();
const { fileName, id, type } = route.query;
let fileShowName = ref();
if (fileName) {
  fileShowName.value = fileName;
}
let parentId = ref();
if (id) {
  parentId.value = id;
}
let typeName = ref();
if (type) {
  typeName.value = type;
}

//右侧数据
const State = reactive({
  //数据集名称
  dataSetName: "未命名数据集",
  //数据源id
  dataSourceId: 0,
  //数据源名称
  dataSourceShowName: "",
  //表格数据
  tableData: [],
  headers: [] as Array<headerType>,
});

const { dataSourceId, dataSourceShowName, dataSetName, tableData, headers } =
  toRefs(State);

const { getDatasourceList, getAllExcelDataByDataSourceId } = DataSource; //数据源接口

//获取所有数据源
const getAllDataSource = async () => {
  const {
    data: { counts, data },
  } = await getDatasourceList({ pageNum: 0, pageSize: 9999, accessType: 2 });
  if (counts > 0) {
    dataList.value = data;
  }
};

//数据库数据集-通过表名获取数据
let page = ref({
  pageNum: 1,
  pageSize: 10,
  counts: 0,
});
const getMySqlTableData = async () => {
  const {
    data: { data, counts },
  } = await getAllExcelDataByDataSourceId({
    pageNum: page.value.pageNum - 1,
    pageSize: page.value.pageSize,
    dataSourceId: dataSourceId.value,
  });
  if (counts > 0) {
    const arr = data;
    let ars = [] as any;
    Object.keys(arr[0]).forEach((it) => {
      ars.push({
        fieldName: it,
        minWidth: 240,
        showName: it,
      });
    });
    headers.value = ars;
    tableData.value = arr;
    page.value.counts = counts;
  }
};

const currentChange = (val: any) => {
  page.value.pageNum = val;
  getMySqlTableData();
};

const sizeChange = (val: any) => {
  page.value.pageSize = val;
  getMySqlTableData();
};

//点击表获取sql数据
const sqlClick = (val: any, key: number) => {
  currentIndex.value = key;
  dataSourceId.value = val.id;
  dataSourceShowName.value = val.dataSourceShowName;
  getMySqlTableData();
};

//保存
const sqlSave = async () => {
  const { data } = await addDataSetOrFileFolder({
    createTime: "",
    creator: "",
    dataSetType: type,
    datasourceId: dataSourceId.value,
    excelFileUrl: "",
    id: 0,
    isDeleted: 0,
    isFileFolder: 2,
    name: dataSetName.value,
    parentId: parentId.value,
    sqlContent: "",
    status: 0,
    tableName: dataSourceShowName.value,
    updateTime: "",
    updater: "",
  });
  if (data && Object.keys(data).length > 0) {
    ElMessage.success("保存成功");
    router.push("/dataset/list");
  }
};

//返回上一页
const goBack = () => {
  window.history.go(-1);
};

onMounted(() => {
  getAllDataSource(); //获取所有数据源
});
</script>
<style scoped lang="scss">
.excel-create-container {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: space-between;

  & .left {
    width: 264px;
    height: 100%;
    background: transparent;
    border-radius: 15px;

    .el-button.left-button {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      height: 43px;
      background: #6d79ff;
      border-radius: 22px;
    }

    .upload-file-container {
      width: 100%;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
      margin-top: 15px;
      padding-top: 12px;
      box-sizing: border-box;

      & > .content-list {
        width: 100%;
        box-sizing: border-box;
        // padding: 0 15px;

        & .content-list-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 25px;
          padding: 0 15px;
          box-sizing: border-box;

          & span {
            display: flex;
            align-items: center;
            height: 100%;
            font-size: 14px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: #293270;
            line-height: 30px;
          }

          & img.search {
            width: 22px;
          }

          & img.rest {
            width: 19px;
            cursor: pointer;
          }
        }

        & .list-box {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;

          & .item {
            width: 100%;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 25px;
            box-sizing: border-box;
            cursor: pointer;

            & img {
              width: 14px;
              margin-right: 12px;
            }

            font-size: 12px;
            font-family: "PingFang SC";
            font-weight: 400;
            color: #6b797f;
            line-height: 30px;

            &.active {
              color: #293270;
              background: #f3f5ff;
            }
          }
        }
      }
    }
  }

  & .right {
    width: calc(100% - 280px);
    height: 100%;
    background: transparent;
    border-radius: 15px;
    position: relative;

    & .right-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 43px;
      font-size: 24px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #293270;
      position: relative;
      padding-left: 15px;
      box-sizing: border-box;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 2px;
        height: 16px;
        background: linear-gradient(180deg, #0059e8 0%, #37e2c1 100%);
        border-radius: 1px;
      }

      .el-button {
        width: 113px;
        border-radius: 16px;
      }
    }

    section {
      height: 100%;
    }

    .right-content {
      width: 100%;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
      margin-top: 15px;
      position: relative;
    }

    .sql-input-box {
      width: 100%;
      height: auto;
      padding: 15px;
    }

    .tableBox {
      padding: 0 15px;
      box-sizing: border-box;
      width: 100%;
      // height: calc(100% - 190px) !important;
      display: inline-block;

      .tableBox-title {
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        & .title {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #293270;
          line-height: 30px;

          & > img {
            width: 34px;
            margin-right: 8px;
          }
        }

        & .workspace {
          & > .el-button {
            width: 101px;
            height: 27px;
            background: #ffffff;
            border: 1px solid #dcdde0;
            border-radius: 14px;

            img {
              width: 17px;
              margin-right: 4px;
            }

            :deep(span) {
              font-size: 14px;
              font-family: "PingFang SC";
              font-weight: 500;
              color: #bbbcbb;
              line-height: 30px;
            }
          }
        }
      }

      .table-status {
        height: 300px;
        background: #ffffff;
        border: 2px solid #ff0100;
        border-radius: 15px;
        padding: 12px;
        box-sizing: border-box;
        overflow: auto;

        & .status-title {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;

          & div.title {
            display: flex;
            font-size: 14px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: #ff0100;
            align-items: center;

            & img {
              width: 16px;
              margin-right: 8px;
            }
          }

          & div.info {
            font-size: 14px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: #ff0100;
            display: flex;
            align-items: center;
            margin-top: 8px;
          }
        }

        .detail {
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #ff0100;
          line-height: 30px;
          display: flex;
          justify-content: flex-start;
        }

        .detail-desc {
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: bold;
          color: #ff0100;
          text-align: left;
        }
      }
    }

    .datasource-empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.elSelectValue {
  width: 100%;
  height: 29px;

  ::v-deep .el-input__wrapper {
    background: #ffffff;
    border: 1px solid #d5d5de;
    border-radius: 12px;
    box-shadow: unset;
    height: 29px;
  }
}

.dataSetName {
  ::v-deep .el-input__wrapper {
    background: transparent !important;
    box-shadow: unset;

    .el-input__inner {
      font-size: 24px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #293270;
    }
  }
}
</style>

<template>
  <div class="excel-create-container">
    <div class="left">
      <div class="left-title">
        数据集
        <el-dropdown>
          <img src="~@/assets/data/addDataSet.png" />
          <template #dropdown>
            <el-dropdown-menu class="left-dropdown">
              <el-dropdown-item @click.stop="openDialog(3)"
                >Excel数据集</el-dropdown-item
              >
              <el-dropdown-item @click.stop="openDialog(2)"
                >SQL数据集</el-dropdown-item
              >
              <el-dropdown-item @click.stop="openDialog(1)"
                >数据库数据集</el-dropdown-item
              >
              <el-dropdown-item divided @click.stop="openDialog(0)"
                >新建文件夹</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="upload-file-container">
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
        <el-scrollbar style="height: 95%">
          <index-menu @openDialog="getIndexMenuDialog" @getMenuValue="getMenuCurrentValue"/>
        </el-scrollbar>
      </div>
    </div>
    <div class="right">
      <div class="right-title">
        <div class="right-title-left">
          <div class="item active" @click="tabClick(0)">
            <div class="info">
              <p>
                SQL数据集名称
                <popover-box>
                  <template #reference>
                    <img src="@/assets/data/warning.png" />
                  </template>
                  <template #content>
                    <div class="info-box"></div>
                  </template>
                </popover-box>
              </p>
              <p>创建者：用户名</p>
            </div>
            <div class="preview">数据预览</div>
          </div>
          <div class="item" @click="tabClick(1)">字段管理</div>
        </div>
        <div class="right-title-right">
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
          <div class="el-button-primary margin-left-22">
            <img width="18" height="18" src="~@/assets/data/addData.png" />
            <span class="text">新建文件夹</span>
          </div>
          <div class="el-button-primary margin-left-22">
            <img width="18" height="18" src="~@/assets/data/addData.png" />
            <span class="text">新建数据集</span>
          </div>
        </div>
      </div>
      <div class="right-content">
        <el-empty
          :image="imgUrl"
          v-if="dataList && dataList.length == 0"
          class="datasource-empty"
          description="请先上传Excel数据"
        />
        <div class="tableBox el-common-tableBox">
          <el-table
            :data="tableData"
            align="center"
            fit
            :highlight-current-row="false"
            :border="false"
            show-overflow-tooltip
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
              label="名称"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
              align="center"
            />

            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
              align="center"
            />
          </el-table>
          <el-pagination
            class="pagination"
            background
            layout="->,prev, pager, next, total, sizes,jumper"
            :total="1000"
          />
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogTableVisible"
      :width="500"
      title="新建文件夹"
      @close="dialogTableVisibleClose(1)"
    >
      <el-input v-model="fileName" placeholder="请输入文件夹名称" />
      <template #footer>
        <el-button @click="dialogTableVisibleClose(1)">取消</el-button>
        <el-button type="primary" @click="saveFileName">保存</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="addNewDataSetDialog" :width="500" title="新建数据集" @close="dialogTableVisibleClose(0)">
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          size="small"
          status-icon
        >
          <el-form-item label="所属文件夹" required>
            <el-cascader
              v-model="fileId"
              :options="options"
              :props="props1"
              clearable
            />
          </el-form-item>
          <el-form-item label="数据类型" prop="dataSetType">
            <el-select
              v-model="dataSetType"
              class="m-2"
              placeholder="请选择"
              clearable
            >
              <el-option label="Excel数据集" :value="3" />
              <el-option label="sql数据集" :value="2" />
              <el-option label="数据库数据集" :value="1" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="dialogTableVisibleClose(0)">取消</el-button>
        <el-button type="primary" @click="saveDataSet">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { ElMessage } from "element-plus";
import indexMenu from "./components/IndexLeftMenu.vue";
import popoverBox from "@/components/popover/index.vue";
import { useRouter } from "vue-router";
//接口地址
import {
  addDataSetOrFileFolder,
  getFileFolderAndDataSets,
} from "@/api/dataset";
import { addDataSetType } from "../types";
//暂无数据图片
import noData from "@/assets/data/excelNo.png";

const imgUrl = ref(noData);

const searchValue = ref("");
const dataList = ref([{}]);

const tableData = ref([{}, {}, {}]);

const tabClick = (val: number) => {
  console.log(val);
};

// =====================新建文件夹\数据集=====================
let dialogTableVisible = ref<boolean>(false);
let addNewDataSetDialog = ref<boolean>(false);
const router = useRouter();
//文件夹名称
let fileName = ref<string | undefined>("");
//文件夹表单数据
let ruleForm = reactive({
  fileNames: "",
  fileId: [] as Array<any>,
  dataSetType: "" as string | number,
  isFileFolder: 0,
  options: [] as Array<any>,
});

const rules = ref({
  dataSetType: [
    { required: true, message: "请选择数据集类型", trigger: "change" },
  ],
});

const props1 = ref({
  checkStrictly: true,
  value: "id",
  label: "name",
  children: "dataSetDtos",
});

let { dataSetType, fileId, options } = toRefs(ruleForm);

//打开弹窗
const openDialog = (val: number) => {
  if (val == 0) {
    dialogTableVisible.value = true;
  } else {
    dataSetType.value = val;
    addNewDataSetDialog.value = true;
  }
};

//保存文件夹新增
const saveFileName = () => {
  if (fileName.value != "") {
    saveFileBox();
  } else {
    ElMessage.error("文件夹名称不能为空");
  }
};

//新增数据集
const saveDataSet = () => {
  let ids: number = 0;
  if (fileId.value && fileId.value.length == 2) {
    ids = fileId?.value[1];
  } else {
    ids = fileId?.value[0];
  }

  let dataSetTypes = dataSetType.value;
  if (!ids || !dataSetTypes)
    return ElMessage.error("所属文件夹或数据类型不能为空");
  if (dataSetType.value == 1 || dataSetType.value == 2) {
    router.push(`/dataset/create/sql?id=${ids}&type=${dataSetTypes}`);
  } else {
    router.push(`/dataset/create/excel?id=${ids}&type=${dataSetTypes}`);
  }
  fileId.value = [];
  dataSetType.value = "";
  addNewDataSetDialog.value = false;
};

//保存文件夹
const saveFileBox = async () => {
  let params;
  if (childrenValue.value) {
    params = { ...childrenValue.value };
  } else {
    params = {
      createTime: "",
      creator: "",
      dataSetType: 0,
      datasourceId: 0,
      excelFileUrl: "",
      id: 0,
      isDeleted: 0,
      isFileFolder: 0,
      name: fileName.value,
      parentId: 0,
      sqlContent: "",
      status: 0,
      tableName: "",
      updateTime: "",
      updater: "",
    };
  }
  const { data } = await addDataSetOrFileFolder(params);
  if (data && Object.keys(data).length > 0) {
    fileName.value = "";
    dialogTableVisible.value = false;
    getAllFileFolderAndDataSets();
  }
};

//关闭弹窗
const dialogTableVisibleClose = (val: number) => {
  if (val == 1) {
    dialogTableVisible.value = false;
    fileName.value = "";
  } else {
    addNewDataSetDialog.value = false;
    fileId.value = [];
  }
};

// =====================新建文件夹\数据集=====================

//获取数据集文件夹和数据集列表
const getAllFileFolderAndDataSets = async () => {
  const { data } = await getFileFolderAndDataSets();
  if (data && data.length > 0) {
    handleAllFileFolder(data);
  }
};

//所属文件夹处理
const handleAllFileFolder = (data: any) => {
  let arr = JSON.parse(JSON.stringify(data));
  let ars = [] as Array<any>;
  if (arr && arr.length > 0) {
    arr.map((item: any) => {
      if (
        item.isFileFolder != 2 &&
        item.dataSetDtos &&
        item.dataSetDtos.length > 0
      ) {
        let arrs = [] as Array<any>;
        item.dataSetDtos.map((it: any) => {
          if (
            it.isFileFolder != 2 &&
            it.dataSetDtos &&
            it.dataSetDtos.length > 0
          ) {
            delete it.dataSetDtos;
            arrs.push(it);
          }
        });
        item.dataSetDtos = arrs;
        ars.push(item);
      } else if (item.isFileFolder != 2 && !item.dataSetDtos) {
        ars.push(item);
      }
    });
    if (ars && ars.length > 0) {
      ars.forEach((it) => {
        if (it.dataSetDtos && it.dataSetDtos.length == 0) {
          delete it.dataSetDtos;
        }
      });
      options.value = ars;
    }
  }
};

//获取菜单子组件数据，调用父组件弹窗
const childrenValue = ref<addDataSetType>();
const getIndexMenuDialog = (value: any) => {
  const { key, val } = value;
  if (key == 3 || key == 2 || key == 1) {
    if (val.parentId != 0) {
      fileId.value.push(val.parentId);
    }
    fileId.value.push(val.id);
    dataSetType.value = key;
    addNewDataSetDialog.value = true;
  } else {
    dialogTableVisible.value = true;
  }
  childrenValue.value = val;
};

//获取点击的数据集数据
const getMenuCurrentValue = (value:addDataSetType)=>{
  console.log(value);
  
}

onMounted(() => {
  getAllFileFolderAndDataSets();
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

    & .left-title {
      height: 43px;
      width: 100%;
      font-size: 24px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: #293270;
      //   text-align: left;
      padding-left: 15px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

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
    }

    .upload-file-container {
      width: 100%;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
      padding-top: 12px;
      box-sizing: border-box;

      .searchBox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 90%;
        height: 29px;
        line-height: 29px;
        padding: 0 17px;
        margin: 12px auto;
        margin-top: 0;
        background: #ffffff;
        border-radius: 22px;
        border: 1px solid #d5d5de;

        .input {
          :deep(.el-input__wrapper) {
            box-shadow: none;
            height: 25px;

            .el-input__inner {
              padding: 0 12px;
              border: none;
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

    .right-title {
      width: 100%;
      height: 63px;
      display: flex;
      justify-content: space-between;

      & .right-title-left {
        display: flex;
        position: relative;
        width: 260px;
        height: 100%;

        & .item {
          background-color: #f3f5ff;
          height: 100%;

          &:nth-child(1) {
            width: 95%;
            background: url("@/assets/data/tab_1.png") no-repeat center;
            background-size: 100% 100%;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            padding-left: 15px;
            padding-right: 60px;
            padding-top: 20px;
            box-sizing: border-box;

            & .info {
              width: 70%;
              height: 100%;
              font-size: 12px;

              & p {
                &:nth-child(1) {
                  font-size: 7px;
                  font-family: "PingFang SC";
                  font-weight: bold;
                  color: #293270;
                }

                &:nth-child(2) {
                  font-size: 6px;
                  font-family: "PingFang SC";
                  font-weight: 400;
                  color: #6b797f;
                }
              }
            }

            & .preview {
              width: 15%;
              font-size: 7px;
              font-family: "PingFang SC";
              font-weight: bold;
              color: #293270;
            }
          }

          &:nth-child(2) {
            width: 45%;
            background: url("@/assets/data/tab_2.png") no-repeat center;
            background-size: 100% 100%;
            position: absolute;
            left: 75%;
            cursor: pointer;
            font-size: 7px;
            font-family: "PingFang SC";
            font-weight: bold;
            color: #b8bbbc;
            line-height: 18px;
            padding-left: 50px;
            padding-right: 40px;
            padding-top: 15px;
            box-sizing: border-box;
          }

          &.active {
            // background-color: #fff;
          }
        }
      }

      & .right-title-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

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
      }
    }

    & .right-content {
      width: 100%;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
      border-top-left-radius: unset;
      position: relative;
    }
  }
}

.tableBox {
  padding: 0 15px;
  box-sizing: border-box;
}

.ml12 {
  margin-left: 10px;
  margin-top: -5px;
}

.margin-left-22 {
  margin-left: 22px;
}

.el-popover {
  background: #f5f6f9 !important;
}

.info-box {
  width: 100%;
  min-height: 200px;
}
</style>

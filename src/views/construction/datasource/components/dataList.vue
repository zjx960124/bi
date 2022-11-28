<template>
  <div class="datalist-container-box">
    <div class="searchBox">
      <img width="22" height="21" src="~@/assets/analysis/search.png" />
      <el-input
        class="input"
        v-model="searchValue"
        clearable
        placeholder="共X个文件"
        @keyup.enter="getDataList"
        @clear="getDataList"
      >
      </el-input>
    </div>
    <div class="content">
      <el-scrollbar style="height: 100%; width: 100%">
        <div
          class="item"
          v-for="(it, idx) in datas"
          :class="{ active: current === idx }"
          @click="getDataSource(it, idx)"
        >
          <svg-icon
            class-name="icondatalist"
            :icon="`file`"
            class="mr10"
            v-if="it?.accessType == 2"
          ></svg-icon>
          <svg-icon
            class-name="icondatalist"
            v-if="it?.accessType == 1"
            :icon="`datasource`"
            class="mr10"
          ></svg-icon>
          <div class="item-info">
            <div class="title">{{ it.dataSourceShowName }}</div>
            <div class="desc">创建者:{{ it.creator }}</div>
          </div>
          <div class="item-btn">
            <img src="~@/assets/data/edit.png" @click="openEditDialog(it)" />
            <el-popconfirm
              title="确定删除该数据源？"
              @confirm.stop="delDataSourceById(it)"
            >
              <template #reference>
                <img src="~@/assets/data/del.png" />
              </template>
            </el-popconfirm>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-dialog v-model="dialogVisible" width="30%">
      <template #header>
        <div class="dialogVisibleClass-title" v-if="sizeform.accessType == 1">
          编辑MySQL数据源
        </div>
        <div class="dialogVisibleClass-title" v-if="sizeform.accessType == 2">
          编辑文件数据源
        </div>
      </template>
      <div class="dialogVisibleClass-container">
        <el-form ref="form" :model="sizeform" label-width="100px">
          <el-form-item label="显示名称" required>
            <el-input
              v-model="sizeform.dataSourceShowName"
              :placeholder="
                sizeform.accessType == 1
                  ? '数据源配置列表显示名称'
                  : '文件显示名称'
              "
            />
          </el-form-item>
          <template v-if="sizeform.accessType == 1">
            <el-form-item label="数据库地址" required>
              <el-input v-model="sizeform.ipContent" placeholder="IP" />
            </el-form-item>
            <el-form-item label="端口" required>
              <el-input v-model="sizeform.port" placeholder="3306" />
            </el-form-item>
            <el-form-item label="数据库" required>
              <el-input
                v-model="sizeform.dataSourceName"
                placeholder="数据库名称"
              />
            </el-form-item>
            <el-form-item label="用户名" required>
              <el-input
                v-model="sizeform.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input
                v-model="sizeform.password"
                type="password"
                placeholder="请输入密码"
              />
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDatasourceClick">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { checkDatasourceType } from "@/views/construction/types/index";
import svgIcon from "@/components/svg-icon/index.vue";
import { ElMessage } from "element-plus";
import { DataSource } from "@/api/dataSource";
const {
  getDatasourceList,
  deleteDatasource,
  updateDatasource,
} = DataSource;

const searchValue = ref(""); //左侧搜索值

const current = ref<number | string>(""); //当前点击的项

const datas = ref<Array<checkDatasourceType>>([]); //左侧列表数据

const dialogVisible = ref<boolean>(false); //编辑弹窗

let sizeform = ref<checkDatasourceType>({
  //编辑弹窗数据
  dataSourceShowName: "",
  ipContent: "",
  port: 0,
  dataSourceName: "",
  username: "",
  password: "",
  dataSourceType: 1, //远程数据库类型1:mysql
  status: 2, //启用\禁用
  accessType: 1, //数据类型：1:sql,2:file
});

//点击获取数据
const emit = defineEmits(["getDatasourceType"]);
const getDataSource = (val: checkDatasourceType, index: number) => {
  current.value = index;
  emit("getDatasourceType", val);
};

//获取列表数据
const getDataList = async () => {
  const {
    data: { data },
  } = await getDatasourceList({
    pageNum: 0,
    pageSize: 999,
    showName: searchValue.value,
    accessType:0
  });
  datas.value = data;
};

//删除当前项
const delDataSourceById = async (val: checkDatasourceType) => {
  const { id } = val;
  const { code } = await deleteDatasource({
    datasourceId: id,
  });
  if (code == "200") {
    getDataList();
  }
};

//编辑当前项
const openEditDialog = (val: checkDatasourceType) => {
  sizeform.value = val;
  dialogVisible.value = true;
};

//保存编辑
const saveDatasourceClick = async () => {
  const { code, msg } = await updateDatasource(sizeform.value);
  if (code == 200) {
    ElMessage({
      message: "更新成功",
      type: "success",
    });
    dialogVisible.value = false;
  } else {
    ElMessage.error(msg);
  }
};

onMounted(() => {
  getDataList();
});
</script>
<style scoped lang="scss">
.datalist-container-box {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 22px;
  padding-top: 14px;
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
    margin: 0 auto;
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
  .content {
    width: 100%;
    height: calc(100% - 40px);
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .item {
      width: 100%;
      height: 53px;
      padding: 11px 27px 11px 27px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      & .item-info {
        width: calc(100% - 46px);
        height: 100%;
        margin: auto 8px;
        margin-top: -3px;
        & > .title {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #6b797f;
          text-align: left;
        }
        & > .desc {
          //   height: 12px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #6b797f;
          text-align: left;
        }
      }
      &.active {
        background: #f3f5ff;
        .title {
          font-weight: bold;
          color: #293270;
        }
        .icondatalist {
          :deep(".svg-icon") {
            fill: #293270 !important;
          }
        }
      }
      & .item-btn {
        width: 50px;
        height: 11px;
        display: flex;
        justify-content: space-between;
      }

      &:hover {
        background: #f3f5ff;
      }

      &:hover .title {
        font-weight: bold;
        color: #293270;
      }

      &:hover .icondatalist {
        fill: #293270 !important;
      }
    }
  }
}

.dialogVisibleClass-title {
  text-align: left;
}
</style>

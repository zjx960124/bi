<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="20%"
    @close="handleClose"
  >
    <template #header>
      <div class="header-title-left">增加数据</div>
    </template>
    <div class="addDialog-containr">
      <el-upload
        class="upload-containr"
        action=""
        :limit="1"
        :auto-upload="false"
        accept=".xlsx,.xls,.csv"
        :on-change="fileChange"
        multiple
      >
        <el-button type="primary">上传文件</el-button>
        <template #tip>
          <div class="el-upload__tip">
            增加数据需与原始表头保持一致，请选择任意模板上传数据
          </div>
        </template>
      </el-upload>

      <div class="templates-container">
        <el-scrollbar style="height: 100%; width: 100%">
          <div class="item">
            <div class="item-title">模板已一：</div>
            <div class="item-info">
              下载全部数据<a class="item-download" @click="goUrl(0)"
                >点击下载</a
              >
            </div>
          </div>
          <div class="item">
            <div class="item-title">模板已二：</div>
            <div class="item-info">
              下载表头字段<a class="item-download" @click="goUrl(1)"
                >点击下载</a
              >
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="saveData"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { DataSource } from "@/api/dataSource";
const dialogVisible = ref(false);
let path = ref<string>("");
const handleClose = () => {
  dialogVisible.value = !dialogVisible.value;
};

const initData = (val: any) => {
  dialogVisible.value = !dialogVisible.value;
};
//点击下载模板
const goUrl = (val: number) => {
  let url = "";
  if (val == 0) {
    url = `/rest/bi/template/file?path=${path.value}`;
  } else {
    url = `/rest/bi/template/headFile?path=${path.value}`;
  }
  var down = document.createElement("a");
  down.href = url;
  document.body.appendChild(down);
  down.click();
  down.remove();
};

const { uploadExcelFiles, addExcelData } = DataSource;
const files = ref();
const fileChange = async (file: any) => {
  files.value = file;
};

const saveData = async () => {
  let formdata = new FormData();
  formdata.append("files", files.value.raw);
  const { data } = await uploadExcelFiles(formdata);
  if(data){
    
  }
};

defineExpose({
  initData,
  path,
});
</script>
<style scoped lang="scss">
.header-title-left {
  text-align: left;
}
.upload-containr {
  text-align: left;
}
.templates-container {
  text-align: left;
  height: 50px;
  & .item {
    width: 100%;
    line-height: 25px;
    display: flex;
    justify-content: flex-start;
    & .item-info {
      & .item-download {
        margin-left: 15px;
        color: #6d79ff;
      }
    }
  }
}
</style>

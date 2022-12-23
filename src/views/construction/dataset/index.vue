<template>
  <JsLayout title="数据集" background="transparent">
    <template #main>
      <div class="datasource-container">
        <div class="left">
          <list @openSetting="openSetting" />
        </div>
      </div>
      <el-dialog v-model="dialogTableVisible" :width="500">
        <el-input v-model="fileName" placeholder="请输入文件夹名称" />
        <template #footer>
          <el-button type="primary" @click="saveFileName">确认</el-button>
        </template>
      </el-dialog>
    </template>
  </JsLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

//组件
import list from "./components/list.vue";
//接口类型
import { dataTypes } from "@/views/construction/types/index";
//接口地址
import { getAllDataSet, addDataSetOrFileFolder } from '@/api/dataset'
import { ElMessage } from "element-plus";

let dialogTableVisible = ref<boolean>(false);
let fileName = ref<string>('');
let type = ref<string>('')
const router = useRouter();
const openSetting = (val: dataTypes) => {
  type.value = val.type as string;
  dialogTableVisible.value = true;
};

//保存文件夹
const saveFileBox = async () => {
  const { data } = await addDataSetOrFileFolder({
    "createTime": "",
    "creator": "",
    "dataSetType": 0,
    "datasourceId": 0,
    "excelFileUrl": "",
    "id": 0,
    "isDeleted": 0,
    "isFileFolder": 0,
    "name": fileName.value,
    "parentId": 0,
    "sqlContent": '',
    "status": 0,
    "tableName": '',
    "updateTime": "",
    "updater": ""
  });
  if (data && Object.keys(data).length > 0) {
    if (type.value == 'sql') {
      router.push(`/dataset/create/sql?id=${data.id}&type=2`);
    } else if (type.value == 'database') {
      router.push(`/dataset/create/sql?id=${data.id}&type=1`);
    } else {
      router.push(`/dataset/create/excel?id=${data.id}&type=3`);
    }
    fileName.value = '';
    dialogTableVisible.value = false;
  }
}

const saveFileName = () => {

  if (fileName.value != '') {
    saveFileBox();
  } else {
    ElMessage.error('文件夹名称不能为空');
  }
}

onMounted(async () => {
  const { data } = await getAllDataSet();
  let arr: string | any[] = data;
  if (arr && arr.length > 0) {
    router.push("/dataset/list");
  } else {
    router.push("/dataset");
  }
})


</script>
<style scoped lang="scss">
.datasource-container {
  width: 100%;
  height: calc(100vh - 180px);

  .left {
    background: #fff;
    height: 100%;
    width: 100%;
    border-radius: 22px;
  }
}
</style>

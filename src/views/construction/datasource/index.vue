<template>
  <JsLayout title="数据源" background="transparent">
    <template #main>
      <div class="datasource-container">
        <el-row :gutter="10">
          <el-col :span="isShowType ? 20 : 24">
            <list @openSetting="getSetting" />
          </el-col>
          <el-col :span="4" v-if="isShowType">
            <setting
              v-if="isShowType == 'sql'"
              @setIsShowType="setIsShowType"
            />
            <uploadfile v-if="isShowType == 'file'" />
          </el-col>
        </el-row>
      </div>
    </template>
  </JsLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import list from "./components/list.vue";
import setting from "./components/setting.vue";
import uploadfile from "./components/uploadFile.vue";
import { dataTypes } from "@/views/construction/types/index";
import { DataSource } from "@/api/dataSource";

//判断是否有数据，有数据跳转列表页
const { getDatasourceList } = DataSource;
const router = useRouter();
onMounted(async () => {
  const {
    data: { counts },
  } = await getDatasourceList({ pageNum: 0, pageSize: 10 });
  if (counts > 0) {
    router.push("/datasource/list");
  }
});
//打开右边添加数据源组件
const isShowType = ref<string>("");
const getSetting = (val: dataTypes) => {
  const { type } = val;
  isShowType.value = type as string;
};

//MySQL数据源取消按钮
const setIsShowType = (val: string) => {
  isShowType.value = val;
};
</script>
<style scoped lang="scss">
.datasource-container {
  width: 100%;
  height: calc(100vh - 180px);
  & .el-row {
    width: 100%;
    height: 100%;
  }
}
</style>

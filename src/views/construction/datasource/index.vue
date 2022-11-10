<template>
  <JsLayout title="数据源" background="transparent">
    <template #main>
      <div class="datasource-container">
        <el-row :gutter="10">
          <el-col :span="isShowType ? 20 : 24">
            <list @openSetting="getSetting" />
          </el-col>
          <el-col :span="4" v-if="isShowType">
            <setting v-if="isShowType == 'sql'" />
            <uploadfile v-if="isShowType == 'file'" />
          </el-col>
        </el-row>
      </div>
    </template>
  </JsLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import list from "./components/list.vue";
import setting from "./components/setting.vue";
import uploadfile from "./components/uploadFile.vue";
import { dataTypes } from "@/views/construction/types/index";
const isShowType = ref<string>("");
const getSetting = (val: dataTypes) => {
  const { type } = val;
  isShowType.value = type as string;
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

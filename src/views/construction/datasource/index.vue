<template>
  <JsLayout title="数据源" background="transparent">
    <template #main>
      <div class="datasource-container">
        <el-row>
          <el-col :span="20">
            <list />
          </el-col>
          <el-col :span="4">
            <setting />
          </el-col>
        </el-row>
      </div>
    </template>
  </JsLayout>
</template>

<script lang="ts" setup>
import list from "./components/list.vue";
import setting from "./components/setting.vue";
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

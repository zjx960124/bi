<script setup lang="ts">
import navigation from "./components/navigation";
import breadcrumb from "./components/breadcrumb";
</script>
<template>
  <div class="layout-container">
    <el-row>
      <el-col :span="4">
        <navigation></navigation>
      </el-col>
      <el-col :span="20">
        <breadcrumb></breadcrumb>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<style lang='scss' scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
</style>

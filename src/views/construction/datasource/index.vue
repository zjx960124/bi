<template>
  <div class="datasource-container">
    <el-row>
      <el-col :span="20">
        <div class="datasource-content">1111</div>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped lang="scss">
.datasource-container {
  //   background: #fff;
  width: 100%;
  height: calc(100vh - 80px);
  border-radius: 25px;
  box-sizing: border-box;

  .datasource-content {
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
</style>

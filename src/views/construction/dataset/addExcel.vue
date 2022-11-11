<template>
  <div class="excel-create-container">
    <div class="left">
      <el-button type="primary"
        ><el-icon><ArrowLeft /></el-icon>返回</el-button
      >
      <div class="upload-file-container">
        <div class="title">新建Excel数据集/替换数据/追加数据</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped lang="scss">
.excel-create-container {
  width: 100%;
  height: calc(100vh - 80px);
  & .left {
    width: 264px;
    height: 100%;
    background: transparent;
    border-radius: 15px;
    .el-button {
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
      & > .title {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #293270;
        line-height: 30px;
      }
    }
  }
}
</style>

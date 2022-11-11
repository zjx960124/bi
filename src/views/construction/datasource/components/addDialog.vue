<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    @close="handleClose"
  >
    <template #header>
      <div class="header-title-left">增加数据</div>
    </template>
    <div class="addDialog-containr">
      <el-upload class="upload-containr" action="" multiple>
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
              下载全部数据<a class="item-download">点击下载</a>
            </div>
          </div>
          <div class="item">
            <div class="item-title">模板已一：</div>
            <div class="item-info">
              下载全部数据<a class="item-download">点击下载</a>
            </div>
          </div>
          <div class="item">
            <div class="item-title">模板已一：</div>
            <div class="item-info">
              下载全部数据<a class="item-download">点击下载</a>
            </div>
          </div>
          <div class="item">
            <div class="item-title">模板已一：</div>
            <div class="item-info">
              下载全部数据<a class="item-download">点击下载</a>
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

const dialogVisible = ref(false);

const handleClose = () => {};

const saveData = () => {};

const initData = (val: any) => {
  dialogVisible.value = !dialogVisible.value;
};

defineExpose({
    initData
})

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
  height: 150px;
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

<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    @close="handleClose"
  >
    <template #header>
      <div class="header-title-left">替换数据</div>
    </template>
    <div class="datasource-set-content">
      <el-form
        ref="form"
        :model="sizeform"
        label-width="auto"
        label-position="top"
        size="small"
      >
        <el-form-item label="请选择文件" required>
          <el-upload
            ref="uploadRef"
            class="upload-file"
            action=""
            :limit="1"
            :auto-upload="false"
            accept=".xlsx,.xls,.csv"
            :on-change="fileChange"
          >
            <template #trigger>
              <el-button type="primary" class="upload-button"
                ><img src="@/assets/data/uploadfile.png" />上传文件</el-button
              >
            </template>
            <template #tip>
              <div class="el-upload__tip">
                只支持.csv .xlsx .xls格式 大小不超过50M，Excel不能有合并单元
                格且只能上传一个shoot
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="自定义文件名称" required>
          <el-input v-model="sizeform.fileName" placeholder="请输入名称" />
          <div class="el-upload__tip">
            名称只能由中英文、数字及下划线（_）
            斜线（\）、反斜线(/）、数线（|）、 小括号（()）、（[]）、组成，
            不超过50个字符
          </div>
        </el-form-item>
      </el-form>
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
import { reactive, ref } from "vue";
import { sizeForm } from "@/views/construction/types/index";
const sizeform = reactive<sizeForm>({
  fileName: "",
});
const dialogVisible = ref(false);

const handleClose = () => {};

const saveData = () => {};

const initData = (val: any) => {
  dialogVisible.value = !dialogVisible.value;
};

defineExpose({
  initData,
});
</script>
<style scoped lang="scss">
.header-title-left {
  text-align: left;
}
.upload-containr {
  text-align: left;
}

.datasource-set-content {
  text-align: left;
}
.upload-file {
  text-align: left;
  .upload-button {
    width: 111px;
    height: 38px;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 11px;
    ::v-deep & span {
      height: 12px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #6d79ff;
      line-height: 30px;
    }

    ::v-deep &:hover,
    ::v-deep &:focus {
      background-color: transparent !important;
    }
  }
}

.el-upload__tip {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #bbbcbb;
  line-height: 20px;
}

::v-deep .el-input--small .el-input__inner::placeholder {
  font-size: 12px !important;
  color: #bbbcbb;
}
::v-deep .el-form--small.el-form--label-top .el-form-item .el-form-item__label {
  color: #293270;
}

.el-button.upload-button {
  margin-top: 12px;
  height: 43px;
  border-radius: 15px;
  & img {
    margin-right: 10px;
  }
}

.el-button.upload-button + .el-button.upload-button {
  margin-left: 0;
}

.el-button--info {
  background: #bfbfbf;
  border-color: #bfbfbf;
}
.el-button.el-button--primary:focus,
.el-button.el-button--primary:hover {
  background: rgba($color: #6d79ff, $alpha: 0.8);
}
</style>

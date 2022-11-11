<template>
  <div class="datasource-set">
    <div class="datasource-set-title" v-if="$attrs.isShowTitle">上传文件</div>
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
            :auto-upload="false"
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
    <el-button type="primary"
      ><img
        src="@/assets/data/save.png"
      />保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</el-button
    >
    <el-button type="info"
      ><img
        src="@/assets/data/cancel.png"
      />取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</el-button
    >
    <div class="datasource-set-status">
      <img src="@/assets/data/faild.png" v-if="statusForm.status == 0" />
      <img src="@/assets/data/success.png" v-if="statusForm.status == 1" />
      <div>{{ statusForm.text }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { sizeForm } from "@/views/construction/types/index";
const sizeform = reactive<sizeForm>({
  fileName: "",
});

const statusForm = reactive({
  status: 1,
  text: "连接失败 +失败原因，报错提示",
});
</script>
<style scoped lang="scss">
.datasource-set {
  width: 100%;
  display: flex;
  flex-direction: column;
  .datasource-set-title {
    width: 100%;
    height: 38px;
    background: #ffffff;
    border-radius: 15px;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #293270;
  }
  .datasource-set-content {
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    height: 430px;
    margin-top: 10px;
    padding: 15px;
    ::v-deep .el-input--small .el-input__wrapper {
      border-radius: 11px;
      border-color: #dcdde0;
      &::placeholder {
        font-size: 12px;
        color: red !important;
      }
    }
  }

  .el-button {
    margin-top: 12px;
    height: 43px;
    border-radius: 15px;
    & img {
      margin-right: 10px;
    }
  }

  .el-button + .el-button {
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

  .datasource-set-status {
    width: 100%;
    height: 160px;
    background: #ffffff;
    border-radius: 15px;
    margin-top: 12px;

    & > img {
      width: 86px;
      margin-top: 30px;
    }
    & > div {
      height: 35px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fd6245;
      line-height: 20px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      margin-top: 15px;
    }
  }
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
</style>

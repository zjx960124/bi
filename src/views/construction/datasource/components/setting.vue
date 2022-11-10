<template>
  <div class="datasource-set">
    <div class="datasource-set-title" v-if="$attrs.isShowTitle">
      添加MySQL数据源
    </div>
    <div class="datasource-set-content">
      <el-form
        ref="form"
        :model="sizeform"
        label-width="auto"
        label-position="top"
        size="small"
      >
        <el-form-item label="显示名称" required>
          <el-input
            v-model="sizeform.name"
            placeholder="数据源配置列表显示名称"
          />
        </el-form-item>
        <el-form-item label="数据库地址" required>
          <el-input v-model="sizeform.url" placeholder="IP" />
        </el-form-item>
        <el-form-item label="端口" required>
          <el-input v-model="sizeform.port" placeholder="3306" />
        </el-form-item>
        <el-form-item label="数据库" required>
          <el-input v-model="sizeform.databases" placeholder="数据库名称" />
        </el-form-item>
        <el-form-item label="用户名" required>
          <el-input v-model="sizeform.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="sizeform.password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary"
      ><img src="@/assets/data/test.png" />连接测试</el-button
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
  name: "",
  url: "",
  port: 3306,
  databases: "",
  username: "",
  password: "",
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
::v-deep .el-input--small .el-input__inner::placeholder {
  font-size: 12px !important;
  color: #bbbcbb;
}
</style>

<template>
  <div class="narbar-container">
    <breadcrumb />
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar icon="UserFilled" class="narbar-container-avatar" />
        <span class="text-blue">22222222222</span>
        <el-icon class="el-icon--right" v-if="false">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from "../breadcrumb";
</script>
<style lang="scss" scoped>
.narbar-container {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;

  .narbar-container-avatar {
    width: 29px;
    height: 29px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }
}

::v-deep .el-dropdown .el-dropdown-selfdefine {
  display: flex;
  align-items: center;
}
.text-blue {
  color: #293270;
}
</style>

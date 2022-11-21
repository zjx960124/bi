<template>
  <el-dropdown>
    <img src="~@/assets/data/addDataSet.png" />
    <template #dropdown>
      <el-dropdown-menu class="left-dropdown">
        <el-dropdown-item>Excel数据集</el-dropdown-item>
        <el-dropdown-item>SQL数据集</el-dropdown-item>
        <el-dropdown-item>数据库数据集</el-dropdown-item>
        <el-dropdown-item divided>新建文件夹</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup></script>
<style scoped></style>

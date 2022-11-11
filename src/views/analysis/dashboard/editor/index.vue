<script setup lang='ts'>
import { ref, reactive } from 'vue';
import LeftAside from './components/left-aside/index.vue';
import ComponentsList from './components/components-list/index.vue';
import Header from './components/header/index.vue';
import SimulatorEditor from './components/simulator-editor/index.vue';
</script>

<template>
  <el-container>
    <el-aside
      class="aside"
      width="103px"
    >
      <!-- 左侧组件-->
      <left-aside />
    </el-aside>
    <el-container>
      <!-- 顶部组件-->
      <el-header height="66px">
        <Header />
      </el-header>
      <!-- 主要区域组件-->
      <el-main>
        <componentsList />
      </el-main>
    </el-container>
  </el-container>
</template>
 
<style lang="scss" scoped>
.dashboardEdit {
  width: 100%;
  height: 100%;
}
</style>
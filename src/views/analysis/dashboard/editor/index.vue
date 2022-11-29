<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';
import LeftAside from './components/left-aside/index.vue';
import ComponentsPanel from './components/components-panel/index.vue';
import Header from './components/header/index.vue';
import SimulatorEditor from './components/simulator-editor/index.vue';
import SettingPanel from './components/setting-panel/index.vue';
import DataPanel from './components/data-panel/index.vue';
import ThemePanel from './components/theme-panel/index.vue';
const settingPanelRef = ref(SettingPanel);

const state = reactive({
  componentsList: []
});

const { componentsList } = toRefs(state);

const dbClickDimension = (node: any, data: any) => {
  settingPanelRef.value.addDimension(node, data);
};
const dbClickMeasure = (node: any, data: any) => {
  settingPanelRef.value.addMeasure(node, data);
};
const handleMenuSelect = (data: any) => {
  state.componentsList = data.list;
};
</script>

<template>
  <el-container class="dashboard-editor">
    <el-aside
      class="aside"
      width="103px"
    >
      <!-- 左侧组件-->
      <left-aside @menuSelect="handleMenuSelect" />
    </el-aside>
    <el-container>
      <!-- 顶部组件-->
      <el-header height="66px">
        <Header />
      </el-header>
      <!-- 主要区域组件-->
      <el-main class="pt0 pl10 pr10">
        <div class="main">
          <components-panel :data="componentsList" />
          <simulator-editor />
          <setting-panel ref="settingPanelRef" />
          <data-panel
            @dbClickDimension="dbClickDimension"
            @dbClickMeasure="dbClickMeasure"
          />
          <!-- <theme-panel /> -->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
 
<style lang="scss" scoped>
.dashboard-editor {
  width: 100%;
  height: 100%;
  background-color: #f3f5ff;
  .main {
    display: flex;
    flex-direction: row;
    height: calc(100vh - 80px);
  }
}
</style>
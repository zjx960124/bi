<script setup lang="ts">
import headerPlugin from "./headerPlugin";
import { loadAsyncComponent } from "@/utils";
import { useContextMenu } from "./charts/hooks/useContextMenu.hook";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { useChartHistoryStore } from "@/store/chartHistoryStore/chartHistoryStore";
import { useRouter } from "vue-router";

const charts = loadAsyncComponent(() => import("./charts/index.vue"));
const pages = loadAsyncComponent(() => import("./pages/index.vue"));
const operation = loadAsyncComponent(() => import("./operation/index.vue"));

const chartHistoryStoreStore = useChartHistoryStore();
const chartEditStore = useChartEditStore();
// 记录初始化
chartHistoryStoreStore.canvasInit(chartEditStore.getEditCanvas);

// 路由
const router = useRouter();
const currentRoute = router.currentRoute.value.name;

// 右键
const { menuOptions, onClickOutSide, mousePosition, handleMenuSelect } =
  useContextMenu();
</script>
<template>
  <div class="editor">
    <header-plugin>
      <template #left>
        <span>大屏名称</span>
        <el-button>撤销</el-button>
        <el-button>下一步</el-button>
      </template>
      <template #center></template>
      <template #ri-left>
        <el-button>预览</el-button>
        <el-button>保存</el-button>
        <el-button>保存并发布</el-button>
      </template>
    </header-plugin>
    <main>
      <charts v-if="currentRoute === 'dashboardEditor'"></charts>
      <pages v-else></pages>
      <operation></operation>
    </main>
  </div>
  <!-- 右键 -->
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    size="small"
    :x="mousePosition.x"
    :y="mousePosition.y"
    :options="menuOptions"
    :show="chartEditStore.getRightMenuShow"
    :on-clickoutside="onClickOutSide"
    @select="handleMenuSelect"
  ></n-dropdown>
</template>
<style lang='scss' scoped>
.editor {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  main {
    overflow: hidden;
    display: flex;
    height: calc(100% - 60px);
  }
}
</style>

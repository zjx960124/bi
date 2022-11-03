<script setup lang="ts">
import headerPlugin from "./headerPlugin";
import { loadAsyncComponent } from "@/utils";
import { useContextMenu } from "./charts/hooks/useContextMenu.hook";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { useChartHistoryStore } from "@/store/chartHistoryStore/chartHistoryStore";
import { useRouter } from "vue-router";
import { ChevronBack, ArrowUndo, ArrowRedo } from "@vicons/ionicons5";
import { reactive, ref, computed } from "vue";
import { icon } from "@/plugins";

const charts = loadAsyncComponent(() => import("./charts/index.vue"));
const pages = loadAsyncComponent(() => import("./pages/index.vue"));
const operation = loadAsyncComponent(() => import("./operation/index.vue"));

const chartHistoryStore = useChartHistoryStore();
const chartEditStore = useChartEditStore();
// 记录初始化
chartHistoryStore.canvasInit(chartEditStore.getEditCanvas);

// 路由
const router = useRouter();
const currentRoute = router.currentRoute.value.name;

// 右键
const { menuOptions, onClickOutSide, mousePosition, handleMenuSelect } =
  useContextMenu();

// 画板尺寸
const sizeValue = ref<number>(0);
const sizeOptions = reactive([
  {
    label: "1920*1080（默认）",
    value: 0,
  },
]);

// 前进后退按钮
const isBackStack = computed(() => chartHistoryStore.getBackStack.length > 1);
const isForwardStack = computed(
  () => chartHistoryStore.getForwardStack.length > 0
);
const historyList = reactive([
  {
    key: "backStack",
    select: isBackStack,
    title: "后退",
    icon: ArrowUndo,
  },
  {
    key: "forward",
    select: isForwardStack,
    title: "前进",
    icon: ArrowRedo,
  },
]);
// 历史记录处理
const clickHistoryHandle = (key: string) => {
  switch (key) {
    case "backStack":
      chartEditStore.setBack();
      break;
    case "forward":
      chartEditStore.setForward();
      break;
  }
};
</script>
<template>
  <div class="editor">
    <header-plugin>
      <template #left>
        <n-button round color="#6D79FF" class="return-btn">
          <template #icon>
            <n-icon :component="ChevronBack"></n-icon>
          </template>
          返回
        </n-button>
      </template>
      <template #center>
        <div class="screen-name">未命名可视化大屏</div>
        <div class="size">
          <span>画板尺寸</span>
          <n-space vertical>
            <n-select
              v-model:value="sizeValue"
              size="small"
              :options="sizeOptions"
            />
          </n-space>
        </div>
      </template>
      <template #ri-left>
        <n-button
          v-for="item in historyList"
          :key="item.key"
          text
          :disabled="!item.select"
          @click="clickHistoryHandle(item.key)"
        >
          <n-icon
            :component="item.icon"
            size="24"
            style="margin-right: 29px"
          ></n-icon>
        </n-button>
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
  background: #f3f5ff;
  .screen-name {
    font-size: 24px;
    font-family: "PingFang SC";
    font-weight: bold;
    color: #293270;
    margin-left: 44px;
  }
  .size {
    display: flex;
    align-items: center;
    margin-right: 132px;
    & > span {
      color: #6b797f;
      font-size: 14px;
      font-family: "PingFang SC";
      margin-right: 9px;
    }
  }
  main {
    overflow: hidden;
    display: flex;
    height: calc(100% - 60px);
    padding-bottom: 13px;
    box-sizing: border-box;
  }
}
</style>

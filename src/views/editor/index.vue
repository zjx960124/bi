<script setup lang="ts">
import headerPlugin from './headerPlugin';
import { loadAsyncComponent } from '@/utils';
import Project from '@/store/pageEditStore/pageEditStore';
import { setLocalStorage, getLocalStorage } from '@/utils';
import { useContextMenu } from './charts/hooks/useContextMenu.hook';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { useChartHistoryStore } from '@/store/chartHistoryStore/chartHistoryStore';
import { useRouter } from 'vue-router';
import {
  ChevronBack,
  ArrowUndo,
  ArrowRedo,
  ImagesOutline,
} from '@vicons/ionicons5';
import { reactive, ref, computed, nextTick } from 'vue';
import { DSService } from '@/api/DS';
import createImage, { generateImage } from '@/utils/hooks/usePreview';

const charts = loadAsyncComponent(() => import('./charts/index.vue'));
const pages = loadAsyncComponent(() => import('./pages/index.vue'));
const operation = loadAsyncComponent(() => import('./operation/index.vue'));
const Preview = loadAsyncComponent(() => import('@/views/preview/index.vue'));
const showPreview = ref(false);
const previewId = ref('');
const previews = ref(null);

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
    label: '1920*1080(默认)',
    value: 0,
  },
  {
    label: '1600*900',
    value: 1,
  },
]);

// 前进后退按钮
const isBackStack = computed(() => chartHistoryStore.getBackStack.length > 1);
const isForwardStack = computed(
  () => chartHistoryStore.getForwardStack.length > 0
);
const historyList = reactive([
  {
    key: 'backStack',
    select: isBackStack,
    title: '后退',
    icon: ArrowUndo,
  },
  {
    key: 'forward',
    select: isForwardStack,
    title: '前进',
    icon: ArrowRedo,
  },
]);
// 历史记录处理
const clickHistoryHandle = (key: string) => {
  switch (key) {
    case 'backStack':
      chartEditStore.setBack();
      break;
    case 'forward':
      chartEditStore.setForward();
      break;
  }
};

const previewHandle = () => {
  const projectInfo = Project.value.getProjectInfo();
  setLocalStorage(projectInfo.id, projectInfo);
  const { href } = router.resolve({
    path: '/preview',
    query: {
      id: projectInfo.id,
    },
  });
  window.open(href, '_blank');
};

const saveHandle = () => {
  const projectInfo = Project.value.getProjectInfo();
  setLocalStorage(projectInfo.id, projectInfo);
  previewId.value = projectInfo.id;
  showPreview.value = true;
  nextTick(() => {
    setTimeout(() => {
      generateImage(previews)
        .then((res) => {
          console.log(res);
          var blob = new Blob([res], {
            type: 'image/jpeg',
          });
          const param = new FormData(); // 创建form对象
          param.append('files', blob); // 通过append向form对象添加数据
          DSService.uploadImage(param).then((res1: any) => {
            console.log(res1);
            if (res1.code === '200') {
              const request = {
                category: 1,
                name: Project.value.getProjectName(),
                dataFileFoldId: '',
                code: JSON.stringify(Project.value.getProjectInfo()),
                image: res1.data,
              };
              DSService.saveScreen(request).then((res2) => {
                console.log(res2);
                showPreview.value = false;
              });
            }
          });
        })
        .catch((err) => {
          showPreview.value = false;
        });
    }, 1000);
  });
};

const changeProjectName = (e: any) => {
  if (e.target.innerHTML.length > 10) {
    let result = e.target.innerHTML.substr(0, 10);
    Project.value.setProjectName(result);
  } else {
    Project.value.setProjectName(e.target.innerHTML);
  }
};

const projectName = computed(() => {
  return Project.value.getProjectName();
});

const returnHome = () => {
  router.push('/screenManage');
};
</script>
<template>
  <div class="editor">
    <header-plugin>
      <template #left>
        <n-button round color="#6D79FF" @click="returnHome" class="return-btn">
          <template #icon>
            <n-icon :component="ChevronBack"></n-icon>
          </template>
          返回
        </n-button>
      </template>
      <template #center>
        <div
          class="screen-name"
          contenteditable="true"
          @input="changeProjectName"
        >
          {{ projectName }}
        </div>

        <!-- <div class="size">
          <span>画板尺寸</span>
          <n-space vertical>
            <n-select
              style="width: 160px"
              v-model:value="sizeValue"
              size="medium"
              :options="sizeOptions"
            />
          </n-space>
        </div> -->
      </template>
      <template #ri-left>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              text
              style="textalign: center"
              :disabled="!isBackStack"
              @click="clickHistoryHandle('backStack')"
            >
              <n-icon :component="ArrowUndo" size="24"></n-icon>
            </n-button>
          </template>
          撤销
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button
              text
              style="textalign: center"
              :disabled="!isForwardStack"
              @click="clickHistoryHandle('forward')"
            >
              <n-icon :component="ArrowRedo" size="24"></n-icon>
            </n-button>
          </template>
          重做
        </n-tooltip>
        <n-button round @click="previewHandle" class="preview-btn">
          <template #icon>
            <n-icon>
              <ImagesOutline />
            </n-icon>
          </template>
          预览
        </n-button>
        <img
          class="preview-btn"
          @click="saveHandle"
          src="@/assets/screen/save.png"
        />
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

  <!-- createVnode遇到未知问题,暂时用此办法 -->
  <template v-if="showPreview">
    <div class="preview-views" ref="previews">
      <Preview :previewId="previewId"></Preview>
    </div>
  </template>
</template>
<style lang="scss" scoped>
.preview-views {
  position: fixed;
  left: -100vw;
  top: -100vh;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}

.editor {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f3f5ff;
  .screen-name {
    font-size: 24px;
    font-family: 'PingFang SC';
    font-weight: bold;
    color: #293270;
    padding-left: 44px;
    position: relative;
    width: fit-content;
    min-width: 1px;
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .screen-name::before {
    content: '';
    position: absolute;
    left: 27px;
    top: 50%;
    margin-top: -8px;
    width: 2px;
    height: 16px;
    border-radius: 1px;
    background: linear-gradient(180deg, #0059e8 0%, #37e2c1 100%);
  }
  .size {
    display: flex;
    align-items: center;
    margin-right: 132px;
    & > span {
      color: #6b797f;
      font-size: 14px;
      font-family: 'PingFang SC';
      margin-right: 9px;
    }
  }
  .preview-btn {
    width: 89px;
    height: 43px;
    padding: 0;
    cursor: pointer;
    margin-right: 19px;
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

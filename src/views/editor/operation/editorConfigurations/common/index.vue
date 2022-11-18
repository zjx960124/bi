<script setup lang="ts">
import { ref, nextTick, computed } from "vue";
import { AddCircleOutline, ChevronUp } from "@vicons/ionicons5";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
import { EditCanvasConfigEnum } from "@/store/chartEditStore/chartEditStore.d";
import { ChevronDown } from "@vicons/ionicons5";
import { backgroundImageSize } from "@/settings/designSetting";
import { FileTypeEnum } from "@/enums/fileTypeEnum";
import { UploadCustomRequestOptions } from "naive-ui";
import { fileToUrl, loadAsyncComponent } from "@/utils";
import Project from "@/store/pageEditStore/pageEditStore";

const chartEditStore = useChartEditStore();

const fontFamily = ref<string>("");
const fontFamilyOptions = ref<any[]>([]);
const uploadFileListRef = ref();
const pageAnimation = ref<string>("fadeInLeft");
const pageAnimationOptions = ref<any[]>([
  { label: "向右进入", value: "fadeInLeft" },
  { label: "向左进入", value: "fadeInRight" },
]);

const handleChange = (e: Event) => {
  canvasConfig.value.backgroundType = (e.target as HTMLInputElement).value;
};

const canvasConfig = computed(() => {
  return chartEditStore.getEditCanvasConfig;
});

// 上传图片前置处理
//@ts-ignore
const beforeUploadHandle = async ({ file }) => {
  uploadFileListRef.value = [];
  const type = file.file.type;
  const size = file.file.size;

  if (size > 1024 * 1024 * backgroundImageSize) {
    window["$message"].warning(
      `图片超出 ${backgroundImageSize}M 限制，请重新上传！`
    );
    return false;
  }
  if (
    type !== FileTypeEnum.PNG &&
    type !== FileTypeEnum.JPEG &&
    type !== FileTypeEnum.GIF
  ) {
    window["$message"].warning("文件格式不符合，请重新上传！");
    return false;
  }
  return true;
};

// 自定义上传操作
const customRequest = (options: UploadCustomRequestOptions) => {
  const { file } = options;
  nextTick(() => {
    if (file.file) {
      const ImageUrl = fileToUrl(file.file);
      chartEditStore.setEditCanvasConfig(
        EditCanvasConfigEnum.BACKGROUND_IMAGE,
        ImageUrl
      );
      chartEditStore.setEditCanvasConfig(
        EditCanvasConfigEnum.SELECT_COLOR,
        false
      );
    } else {
      window["$message"].error("添加图片失败，请稍后重试！");
    }
  });
};
</script>
<template>
  <div>
    <div class="configuration-titile">全局配置</div>
    <n-collapse :default-expanded-names="['1', '2', '3']">
      <n-collapse-item title="大屏尺寸" name="1">
        <template #arrow>
          <n-icon size="16">
            <chevron-up />
          </n-icon>
        </template>
      </n-collapse-item>
      <n-collapse-item title="全局样式" name="2">
        <div>
          <n-select
            v-model:value="fontFamily"
            size="small"
            :options="fontFamilyOptions"
          />
        </div>
        <div>
          <div class="common-title">背景样式</div>
          <div class="common-item">
            <n-radio
              :checked="canvasConfig.backgroundType === 'background'"
              value="background"
              name="basic-demo"
              @change="handleChange"
              style="width: 64px"
            >
              <div>填充</div>
            </n-radio>
            <n-color-picker
              style="display: inline-block"
              v-model:value="canvasConfig.background"
            >
              <template #label>
                <n-icon
                  :component="ChevronDown"
                  size="12"
                  color="#6B797F"
                ></n-icon>
              </template>
            </n-color-picker>
          </div>
          <div class="common-item">
            <n-radio
              :checked="canvasConfig.backgroundType === 'backgroundImage'"
              value="backgroundImage"
              name="basic-demo"
              @change="handleChange"
              style="width: 64px"
            >
              图片
            </n-radio>
            <n-upload
              v-model:file-list="uploadFileListRef"
              :show-file-list="false"
              :customRequest="customRequest"
              :onBeforeUpload="beforeUploadHandle"
            >
              <n-upload-dragger>
                <img
                  v-if="canvasConfig.backgroundImage"
                  class="upload-show"
                  :src="canvasConfig.backgroundImage"
                  alt="背景"
                />
                <div class="upload-img" v-show="!canvasConfig.backgroundImage">
                  <img src="@/assets/screen/no-image.png" />
                </div>
              </n-upload-dragger>
            </n-upload>
          </div>
        </div>
        <template #arrow>
          <n-icon size="16">
            <chevron-up />
          </n-icon>
        </template>
      </n-collapse-item>
      <n-collapse-item title="页面轮播" name="3">
        <template #arrow>
          <n-icon size="16">
            <chevron-up />
          </n-icon>
        </template>
        <div class="common-item">
          <n-checkbox v-model:checked="Project.pageConfig.onShuffing">
            <div>开启页面轮播</div>
          </n-checkbox>
        </div>
        <div class="common-item">
          <div>轮播间隔</div>
          <n-input
            class="common-input"
            round
            v-model:value="Project.pageConfig.shuffingInterval"
            :disabled="!Project.pageConfig.onShuffing"
          >
            <template #suffix> <span color="#BBBCBB">s</span></template>
          </n-input>
        </div>
        <div class="common-item">
          <div>过渡类型</div>
          <n-select
            class="common-select"
            v-model:value="Project.pageConfig.shuffingAnimation"
            :disabled="!Project.pageConfig.onShuffing"
            round
            size="small"
            :options="pageAnimationOptions"
          />
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>
<style lang='scss' scoped>
.configuration-titile {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: #ffffff;
  border-radius: 15px;
  color: #293270;
  font-size: 14px;
  margin-bottom: 17px;
}

//重写折叠面板
.n-collapse {
  height: 100%;
  display: flex;
  flex-direction: column;
  .n-collapse-item {
    width: 100%;
    background: #ffffff;
    border-radius: 15px;
    :deep .n-collapse-item__header {
      color: #293270;
      font-family: "PingFang-SC-Bold";
      font-size: 14px;
      height: 50px;
      position: relative;
      padding: 0 0 0 27px;
      .n-collapse-item__header-main {
        .n-collapse-item-arrow {
          position: absolute;
          right: 22px;
          top: 16px;
        }
      }
    }
    :deep .n-collapse-item__content-inner {
      padding: 0 25px 18px 25px;
    }
    .common-title {
      color: #6b797f;
      font-family: "PingFang-SC-Medium";
      font-size: 12px;
      text-align: left;
      margin: 18px 0 12px 0;
      font-weight: 400;
    }
    .common-item {
      display: flex;
      align-items: center;
      color: #6b797f;
      font-family: "PingFang-SC-Medium";
      font-size: 12px;
      .common-input {
        width: 160px;
        margin-left: 10px;
      }
      .common-select {
        width: 160px;
        margin-left: 10px;
      }
    }
    .common-item + .common-item {
      margin-top: 7px;
    }
    .upload-show {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .upload-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  :deep .n-collapse-item.n-collapse-item--active {
    .n-collapse-item__header.n-collapse-item__header--active {
      .n-collapse-item-arrow {
        transform: rotate(180deg);
      }
    }
  }
  .n-collapse-item:first-child {
    max-height: 30%;
  }
  .n-collapse-item--active {
    flex: 1;
  }
}
</style>

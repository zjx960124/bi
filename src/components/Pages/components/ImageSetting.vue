<template>
  <n-collapse-item title="图片" name="2">
    <div class="common-item">
      <div class="common-sub-title">图片来源</div>
    </div>
    <div class="common-item">
      <n-radio
        :checked="optionData.backgroundImageType === 'image'"
        value="image"
        name="basic-demo"
        style="width: 64px"
        @change="handleChange"
      >
        图片
      </n-radio>
      <n-upload
        style="margin-left: 9px"
        v-model:file-list="uploadFileListRef"
        :show-file-list="false"
        :customRequest="customRequest"
        :onBeforeUpload="beforeUploadHandle"
      >
        <n-upload-dragger>
          <img
            v-if="optionData.backgroundImage"
            class="upload-show"
            :src="optionData.backgroundImage"
            alt="背景"
          />
          <div class="upload-img" v-show="!optionData.backgroundImage">
            <img src="@/assets/screen/no-image.png" />
          </div>
        </n-upload-dragger>
      </n-upload>
    </div>
    <div class="common-item">
      <n-radio
        :checked="optionData.backgroundImageType === 'url'"
        value="url"
        name="basic-demo"
        @change="handleChange"
        style="width: 94px"
      >
        <div>链接</div>
      </n-radio>
      <el-input
        size="small"
        v-model="optionData.url"
        placeholder="Please input"
        style="width: 164px"
      >
        <template #append><el-button size="small">使用</el-button></template>
      </el-input>
    </div>
    <div class="common-item">
      <div class="common-sub-title">填充</div>
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="optionData.backgroundColor"
      >
        <template #label>
          <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
        </template>
      </n-color-picker>
    </div>
    <div class="common-item">
      <div class="common-sub-title">显示方式</div>
      <n-select
        class="common-select"
        v-model:value="optionData.objectFit"
        round
        size="small"
        :options="objectFitOption"
        :on-update:value="selectObjectFit"
      />
    </div>
    <template #arrow>
      <n-icon size="16" color="#869299">
        <chevron-up />
      </n-icon>
    </template>
  </n-collapse-item>
</template>

<script setup lang="ts">
import { ref, nextTick, reactive } from 'vue';
import { ChevronDown, ChevronUp } from '@vicons/ionicons5';
import { FileTypeEnum } from '@/enums/fileTypeEnum';
import { UploadCustomRequestOptions } from 'naive-ui';
import { fileToUrl } from '@/utils';

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});

const uploadFileListRef = ref();

const handleChange = (e: Event) => {
  props.optionData.backgroundImageType = (e.target as HTMLInputElement).value;
};

const objectFitOption = reactive([
  {
    label: '拉伸以充满区域',
    value: 'fill',
  },
  {
    label: '居中显示',
    value: 'contain',
  },
  {
    label: '裁剪以充满区域',
    value: 'cover',
  },
]);
const selectObjectFit = (value: string) => {
  props.optionData.objectFit = value;
};

//@ts-ignore
const beforeUploadHandle = async ({ file }) => {
  uploadFileListRef.value = [];
  const type = file.file.type;
  const size = file.file.size;

  if (size > 1024 * 1024 * 2) {
    window['$message'].warning(`图片超出 ${2}M 限制，请重新上传！`);
    return false;
  }
  if (
    type !== FileTypeEnum.PNG &&
    type !== FileTypeEnum.JPEG &&
    type !== FileTypeEnum.GIF
  ) {
    window['$message'].warning('文件格式不符合，请重新上传！');
    return false;
  }
  return true;
};

const customRequest = (options: UploadCustomRequestOptions) => {
  const { file } = options;
  nextTick(() => {
    if (file.file) {
      const ImageUrl = fileToUrl(file.file);
      console.log(ImageUrl);
      props.optionData.backgroundImage = ImageUrl;
    } else {
      window['$message'].error('添加图片失败，请稍后重试！');
    }
  });
};
</script>

<style lang="scss" scoped>
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
      font-family: 'PingFang-SC-Bold';
      font-weight: bold;
      font-size: 14px;
      height: 33px;
      margin: 0 10px;
      position: relative;
      padding: 0 0 0 16px;
      background-color: #f3f5ff;
      border-radius: 6px;
      .n-collapse-item__header-main {
        .n-collapse-item-arrow {
          position: absolute;
          right: 22px;
          top: 8px;
        }
      }
    }

    :deep .n-collapse-item__content-inner {
      padding: 0 25px 2px 25px;
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
  .n-collapse-item:not(:first-child) {
    border-top: 0px;
  }
}
</style>

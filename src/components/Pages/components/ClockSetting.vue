<template>
  <n-collapse-item title="时间" name="3">
    <!-- <div class="common-item">
      <div class="common-sub-title">展示时间</div>
      <n-select
        class="common-select"
        v-model:value="optionData.time"
        round
        size="small"
        :options="timeOption"
        :on-update:value="selectTime"
      />
    </div> -->
    <div class="common-item">
      <div class="common-sub-title">展示格式</div>
      <el-select
        class="common-select"
        v-model="optionData.format"
        size="small"
        filterable
        placeholder="Select"
      >
        <el-option
          v-for="item in formatOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <template #arrow>
      <n-icon size="16" color="#869299">
        <chevron-up />
      </n-icon>
    </template>
  </n-collapse-item>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ChevronDown, ChevronUp } from '@vicons/ionicons5';

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});

const timeOption = reactive([
  {
    label: '本机时间',
    value: '0',
  },
]);

const formatOptions = reactive([
  {
    label: 'YYYY-MM-DD',
    value: 'YYYY-MM-DD',
  },
  {
    label: 'YYYYMMDD',
    value: 'YYYYMMDD',
  },
  {
    label: 'YYYY/MM/DD',
    value: 'YYYY/MM/DD',
  },
  {
    label: 'YYYY年M月M日',
    value: 'YYYY年M月M日',
  },
  {
    label: 'HH:mm:ss',
    value: 'HH:mm:ss',
  },
  {
    label: 'HH时mm分ss秒',
    value: 'HH时mm分ss秒',
  },
  {
    label: 'Ah时mm分ss秒',
    value: 'Ah时mm分ss秒',
  },
  {
    label: 'YYYY-MM-DD HH:mm:ss',
    value: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    label: 'YYYYMMDD HH:mm:ss',
    value: 'YYYYMMDD HH:mm:ss',
  },
  {
    label: 'YYYY/MM/DD HH:mm:ss',
    value: 'YYYY/MM/DD HH:mm:ss',
  },
  {
    lable: 'YYYY年M月D日 HH时mm分ss秒',
    value: 'YYYY年M月D日 HH时mm分ss秒',
  },
]);

const selectTime = (value: string) => {
  props.optionData.time = value;
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

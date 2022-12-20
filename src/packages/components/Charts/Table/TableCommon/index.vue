<script setup lang="ts">
import {
  PropType,
  toRefs,
  computed,
  ref,
  reactive,
  watch,
  nextTick,
} from 'vue';
import { CreateComponentType } from '@/packages/index.d';
import { fieldItem } from '@/packages/index.d';
import { DSService } from '@/api/DS';
import Config from './config';

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

let {
  dataset,
  pageSize,
  columns,
  data,
  tableAlign,
  stripe,
  stripeColor,
  border,
  borderHeight,
  borderColor,
  backgroundColor,
  splitLine,
  splitLineHeight,
  splitLineColor,
  fontSize,
  fontColor,
  fontStyle,
  fontWeight,
  headerFlag,
  headerFontSize,
  headerFontColor,
  headerBackgroundColor,
  headerFontStyle,
  headerFontWeight,
  indexColumn,
  indexColumnLabel,
  indexColumnWidth,
} = toRefs(props.chartConfig.option);

const bottomBorderHeight = computed(() => {
  const borderFlag = border.value;
  return borderFlag ? `${borderHeight.value}px` : `0px`;
});

const splitLineConfig = computed(() => {
  const splitLineFlag = props.chartConfig.option.splitLine;
  return splitLineFlag
    ? `${splitLineHeight.value}px solid ${splitLineColor.value}`
    : '';
});

const borderLineConfig = computed(() => {
  let borderFlag = props.chartConfig.option.splitLine;
  return borderFlag ? `${borderHeight.value}px solid ${borderColor.value}` : '';
});

const tableFontSize = computed(() => {
  const tableFontSize = fontSize.value;
  return `${fontSize.value}px`;
});

const headerFontSizeComputed = computed(() => {
  return `${headerFontSize.value}px`;
});

const headerType = computed(() => {
  return headerFlag.value ? 'block' : 'none';
});

const indexMethod = (index: number) => {
  return index + 1;
};

const requestConfig = computed(() => {
  let requestConfig = props.chartConfig.requestConfig;
  requestConfig.dimension.forEach((element: fieldItem) => {
    element.combinationMode = 0;
    element.dataReturnMethod = 2;
    delete element.columnType;
  });
  return [...requestConfig.dimension, ...requestConfig.measure];
});

// 页数
const pageNum = ref<number>(0);
// 当前页码
const currentPage = ref<number>(0);
// 当前页数据
const currentPageData = ref<any[]>([]);
// 整体数据
const allPageData = ref<any[]>([]);

watch(requestConfig, (newData, oldData) => {
  DSService.getComponentData(newData).then((res: any) => {
    nextTick(() => {
      pageNum.value = Math.ceil(res.data.data.length / pageSize.value);
      currentPage.value = 0;
      currentPageData.value = res.data.data.slice(
        pageNum.value * currentPage.value,
        pageSize.value
      );
      allPageData.value = res.data.data;
      dataset.value.columns = res.data.columns;
      dataset.value.data = currentPageData.value;
      console.log(currentPageData);
      console.log(allPageData);
    });
  });
});
</script>
<template>
  <el-table
    :data="dataset!.data"
    :border="border"
    :stripe="stripe"
    style="width: 100%"
    class="customize-table"
  >
    <template v-if="indexColumn">
      <el-table-column
        type="index"
        :width="indexColumnWidth"
        :label="indexColumnLabel"
        :index="indexMethod"
        :align="tableAlign"
      />
    </template>
    <template v-for="(item, index) in dataset!.columns" :key="index">
      <el-table-column :prop="item.key" :align="tableAlign" :label="item.label">
      </el-table-column>
    </template>
  </el-table>
</template>
<style lang="scss" scoped>
.customize-table {
  --el-table-bg-color: v-bind(backgroundColor);
  --el-table-header-bg-color: v-bind(headerBackgroundColor);
  --el-table-tr-bg-color: v-bind(backgroundColor);
  --el-table-row-hover-bg-color: v-bind(backgroundColor);
  --el-table-current-row-bg-color: v-bind(backgroundColor);
  --el-fill-color-lighter: v-bind(stripeColor);
  --el-table-border-color: v-bind(borderColor);
  --el-table-border: v-bind(splitLineConfig);
  --el-table-text-color: v-bind(fontColor);
  --el-table-header-text-color: v-bind(headerFontColor);
  --el-table-header-text-font-size: v-bind(headerFontSizeComputed);
  font-size: v-bind(tableFontSize);
  font-style: v-bind(fontStyle);
  font-weight: v-bind(fontWeight);
  ::v-deep .el-table__header {
    width: 100% !important;
  }
  ::v-deep .el-table__body {
    width: 100% !important;
  }
  ::v-deep .el-scrollbar__view {
    width: 100%;
  }

  ::v-deep .el-table__header-wrapper {
    display: v-bind(headerType);
    font-size: v-bind(headerFontSizeComputed);
    font-style: v-bind(headerFontStyle);
    th {
      font-weight: v-bind(headerFontWeight);
    }
  }
  ::v-deep .el-table__border-left-patch {
    width: 0 !important;
  }
  ::v-deep .el-table__inner-wrapper::after {
    height: v-bind(bottomBorderHeight);
  }
  // 下
  ::v-deep .el-table__inner-wrapper::before {
    height: v-bind(bottomBorderHeight);
  }
  ::v-deep .el-table--border::before {
    width: v-bind(bottomBorderHeight);
  }

  &::before {
    width: v-bind(bottomBorderHeight);
  }
  &::after {
    width: v-bind(bottomBorderHeight);
  }
  ::v-deeo .el-table--border::after {
    width: v-bind(bottomBorderHeight);
  }
  ::v-deep .el-table--border .el-table__cell {
    border-right: 0px !important;
  }

  ::v-deep .cell {
    line-height: 1;
  }
}
</style>

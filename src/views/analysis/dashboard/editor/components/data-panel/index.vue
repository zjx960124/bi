<script lang='ts'>
export default {
  name: 'ThemePanel'
};
</script>
<template>
  <div class='data-panel'>
    <div class="title">数据</div>
    <!-- 维度 -->
    <div class="section">
      <el-input
        v-model="searchValue"
        class="searchInput"
        size="small"
        clearable
        placeholder="输入关键字搜索"
        :suffix-icon="Search"
      />
      <el-collapse
        class="mt10"
        v-model="activeItem"
      >
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">维度</span>
          </template>
          <el-tree
            class="tree"
            node-key="id"
            :data="dimensionData"
            :props="treeDefaultProps"
            default-expand-all
            draggable
            @node-drag-start="handleDragDimensionStart"
          > <template #default="{ node, data }">
              <span
                class="tree-node"
                @dblclick="handleDimensionNodeDbClick(node, data)"
              >{{data.label}}</span>
            </template></el-tree>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 度量 -->
    <div class="section">
      <el-collapse v-model="activeItem1">
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">度量</span>
          </template>
          <el-tree
            class="tree"
            node-key="id"
            :data="measureData"
            :props="treeDefaultProps"
            default-expand-all
            draggable
            @node-drag-start="handleDragMeasureStart"
          >
            <template #default="{ node, data }">
              <span
                class="tree-node"
                @dblclick="handleMeasureNodeDbClick(node, data)"
              >{{data.label}}</span>
            </template>
          </el-tree>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';
import { Search } from '@element-plus/icons-vue';

const emit = defineEmits(['dbClickDimension', 'dbClickMeasure']);

const state = reactive({
  activeItem: '1',
  activeItem1: '1',
  searchValue: '',
  treeDefaultProps: { children: 'children', label: 'label' },
  dimensionData: [
    { id: 0, label: '商品ID', value: 0 },
    { id: 1, label: '国家', value: 1 },
    {
      id: 3,
      label: '日期（年月日）',
      value: 3,
      children: [
        { id: 30, label: '日期（年月日）', value: 30 },
        { id: 31, label: '日期（年月日）', value: 31 }
      ]
    }
  ],
  measureData: [
    { id: 0, label: '成本额', value: 0 },
    { id: 1, label: '数量', value: 1 }
  ]
});

const {
  activeItem,
  activeItem1,
  searchValue,
  treeDefaultProps,
  dimensionData,
  measureData
} = toRefs(state);

const handleDimensionNodeDbClick = (node: any, data: any) => {
  emit('dbClickDimension', node, data);
};

const handleMeasureNodeDbClick = (node: any, data: any) => {
  emit('dbClickMeasure', node, data);
};

const handleDragDimensionStart = (node: any, ev: any) => {
  ev.dataTransfer.setData('data', JSON.stringify(node.data));
};
const handleDragMeasureStart = (node: any, ev: any) => {
  ev.dataTransfer.setData('data', JSON.stringify(node.data));
};
</script>
 
<style lang="scss" scoped>
.data-panel {
  margin: 0 10px;
  width: 145px;
  height: 100%;
  .title {
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    font-weight: bold;
    color: #293270;
    text-align: center;
    background: #ffffff;
    border-radius: 15px;
  }

  .section {
    margin-top: 20px;
    width: 100%;
    padding: 15px;
    background: #ffffff;
    border-radius: 15px;
    overflow: hidden;

    :deep(.el-collapse) {
      border: none;
      .el-collapse-item__header {
        width: 100%;
        height: 30px;
        background: #ffffff;
        border: none;
      }
      .el-collapse-item__wrap {
        border: none;
        .el-collapse-item__content {
          padding-bottom: 10px;
        }
      }
    }
    .collapse-title {
      padding-left: 10px;
      line-height: 30px;
      font-size: 14px;
      font-weight: bold;
      color: #293270;
    }
    .searchInput {
      width: 100%;
      height: 30px;
      background: #ffffff;
      border: 1px solid #dcdde0;
      border-radius: 15px;
      overflow: hidden;
      :deep(.el-input__wrapper) {
        box-shadow: none;
        .el-input__inner {
          padding: 0 10px;
          border: none;
        }
      }
    }
  }
}

.tree {
  width: 100%;
  :deep(.el-tree-node__content) {
    height: 40px;
  }
  .tree-node {
    display: inline-block;
    width: 100%;
    font-size: 12px;
    font-weight: 400;
    color: #6b797f;
    line-height: 40px;
  }
}
</style>
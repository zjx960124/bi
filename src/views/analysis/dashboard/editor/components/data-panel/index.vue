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
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';
import { Search } from '@element-plus/icons-vue';

const state = reactive({
  activeItem: '1',
  activeItem1: '1',
  searchValue: ''
});

const { activeItem, activeItem1, searchValue } = toRefs(state);
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
</style>
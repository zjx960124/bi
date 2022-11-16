<script lang='ts'>
export default {
  name: 'ThemePanel'
};
</script>
<template>
  <div class='theme-panel'>
    <div class="title">主题设置</div>

    <!-- 仪表盘主题 -->
    <div class="section">
      <el-collapse v-model="themeActiveItem">
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">仪表盘主题</span>
          </template>
          <el-scrollbar class="scrollbar">
            <div class="list">
              <div
                v-for="item in list"
                class="item"
                :style="`background-color:${item.color}`"
              >{{item.name}}</div>
            </div>
          </el-scrollbar>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 页面布局 -->
    <div class="section">
      <el-collapse v-model="layoutActiveItem">
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">页面布局</span>
          </template>
          <div class="content"></div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 全局样式 -->
    <div class="section">
      <el-collapse v-model="styleActiveItem">
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">全局样式</span>
          </template>
          <div class="content"></div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 组件 -->
    <div class="section">
      <el-collapse v-model="componentsActiveItem">
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">组件</span>
          </template>
          <div class="content"></div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';

const state = reactive({
  themeActiveItem: '1',
  layoutActiveItem: '1',
  styleActiveItem: '1',
  componentsActiveItem: '1',
  list: [
    {
      id: 0,
      color: '#0B245D',
      name: '深蓝'
    },
    {
      id: 1,
      color: '#FF9830',
      name: '活力'
    },
    {
      id: 2,
      color: '#23D8C2',
      name: '青草'
    }
  ]
});

const {
  themeActiveItem,
  layoutActiveItem,
  styleActiveItem,
  componentsActiveItem,
  list
} = toRefs(state);
</script>
 
<style lang="scss" scoped>
.theme-panel {
  margin: 0 10px;
  width: 260px;
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
    padding: 10px 20px;
    background: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    :deep(.el-collapse) {
      border: none;
      .el-collapse-item__header {
        height: 30px;
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
      font-size: 14px;
      font-weight: bold;
      color: #293270;
      line-height: 1;
    }
    .list {
      display: flex;
      margin-top: 10px;
      width: 100%;
      height: 60px;
      .item {
        flex-shrink: 0;
        margin-right: 10px;
        width: 90px;
        height: 60px;
        line-height: 60px;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        background: #0b245d;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
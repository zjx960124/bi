<script lang='ts'>
export default {
  name: 'SettingPanel'
};
</script>
<template>
  <div class='setting-panel'>

    <!-- 标题与卡片 -->
    <div class="section">
      <div class="header flex">
        <img
          class="left"
          src="/src/assets/analysis/icon-arrowLeft.png"
        />
        <div class="right">
          <el-tooltip
            content='字段'
            placement='left-start'
          >
            <img
              class="icon-text"
              src="/src/assets/analysis/icon-text.png"
              style="width:15px;height:15px"
              width="15px"
              height="15px"
            />
          </el-tooltip>
          <div class="spe"></div>
          <el-tooltip
            content='样式'
            placement='right-start'
          >
            <img
              class="icon-style"
              src="/src/assets/analysis/icon-style.png"
              style="width:19px;height:15px"
              width="19px"
              height="15px"
            />
          </el-tooltip>
        </div>
      </div>
      <el-collapse
        class="mt20"
        v-model="activeItem"
      >
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">标题与卡片</span>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 图标样式 -->
    <div class="section mt20">
      <div class="header flex">
        <img
          class="left"
          src="/src/assets/analysis/icon-arrowLeft.png"
        />
      </div>
      <el-collapse
        class="mt20"
        v-model="activeItem1"
      >
        <el-collapse-item name="1">
          <template #title>
            <span class="collapse-title">图标样式</span>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="updateBtn">
      <img
        class="icon-text"
        src="/src/assets/analysis/icon-update.png"
        style="width:22px;height:22px"
        width="22px"
        height="22px"
      /><span class="ml10">更新</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';

const state = reactive({
  activeItem: '1',
  activeItem1: '1'
});

const { activeItem, activeItem1 } = toRefs(state);
</script>

<style lang="scss" scoped>
.setting-panel {
  margin: 0 10px;
  width: 260px;
  height: 100%;
  .section {
    width: 100%;
    padding: 15px;
    background: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .left {
        width: 6px;
        height: 11px;
      }
      .right {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 66px;
        height: 25px;
        padding: 0 9px;
        border: 1px solid #bbbcbb;
        border-radius: 8px;
        img {
          cursor: pointer;
        }

        .spe {
          width: 1px;
          height: 100%;
          background-color: #bbbcbb;
        }
      }
    }

    :deep(.el-collapse) {
      border: none;
      .el-collapse-item__header {
        width: 100%;
        height: 33px;
        background: #f3f5ff;
        border-radius: 6px;
      }
      .el-collapse-item__wrap {
        border: none;
        .el-collapse-item__content {
          padding-bottom: 10px;
        }
      }
    }
    .collapse-title {
      padding-left: 16px;
      line-height: 33px;
      font-size: 14px;
      font-weight: bold;
      color: #293270;
    }
  }

  .updateBtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    height: 43px;
    line-height: 43px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    background: #6d79ff;
    border-radius: 15px;
    cursor: pointer;
  }
}
</style>
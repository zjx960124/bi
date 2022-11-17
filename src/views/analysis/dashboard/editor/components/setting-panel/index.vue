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
            <div
              :class="`icon-text ${currentTab === 0? 'active':''}`"
              @click="handleTab(0)"
            >
              <svg-icon icon="field"></svg-icon>
            </div>

          </el-tooltip>
          <div class="spe"></div>
          <el-tooltip
            content='样式'
            placement='right-start'
          >
            <div
              :class="`icon-style ${currentTab === 1? 'active':''}`"
              @click="handleTab(1)"
            >
              <svg-icon icon="style"></svg-icon>
            </div>
          </el-tooltip>
        </div>
      </div>
      <template v-if="currentTab === 0">
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
      </template>
      <template v-else>
        <div class="field-header">
          维度
        </div>

        <div class="field-header">
          度量
        </div>
      </template>
    </div>

    <!-- 图标样式 -->
    <div
      v-if="currentTab === 0"
      class="section mt20"
    >
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
  activeItem1: '1',
  currentTab: 0
});

const { activeItem, activeItem1, currentTab } = toRefs(state);

const handleTab = (tab: number) => {
  state.currentTab = tab;
};
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
        cursor: pointer;
      }
      .right {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 66px;
        height: 25px;
        padding: 0;
        border: 1px solid #bbbcbb;
        border-radius: 8px;
        .icon-text {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 33px;
          height: 25px;
          font-size: 20px;
          color: #bbbcbb;
          transition: ease-in-out 0.3s;
          cursor: pointer;
          &:hover {
            color: #6d79ff;
          }
        }
        .icon-style {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 33px;
          height: 25px;
          font-size: 20px;
          color: #bbbcbb;
          cursor: pointer;
          &:hover {
            color: #6d79ff;
          }
        }

        .active {
          color: #6d79ff !important;
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
    .field-header {
      position: relative;
      margin-top: 26px;
      width: 100%;
      padding-left: 10px;
      font-size: 14px;
      font-weight: 400;
      color: #293270;
      line-height: 1;
      text-align: left;
      &::before {
        content: '*';
        position: absolute;
        top: 0;
        left: 0;
        color: #ff4242;
        font-size: 20px;
      }
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
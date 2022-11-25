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
      <template v-if="currentTab === 1">
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
        <div
          class="field-list"
          @drop="dimensionDrop"
          @dragover.prevent
        >
          <template v-if="dimensionList.length >0">
            <draggable
              :list="dimensionList"
              item-key="id"
              chosen-class="chosen"
              ghost-class="ghost"
              :force-fallback="true"
              animation="300"
              @start="onStartDimension"
              @end="onEndDimension"
            >
              <template #item="{ element }">
                <div class="field-dimensionItem flex justify-space-between align-center ">
                  <div class="left">
                    <img src="/src/assets/analysis/icon-string.png" /><span>{{element.label}}</span>
                  </div>
                  <div class="right">
                    <el-icon class="icon">
                      <ArrowDown />
                    </el-icon>
                    <el-icon
                      class="icon"
                      @click="handleDelDimension(element,0)"
                    >
                      <Delete />
                    </el-icon>
                  </div>
                </div>
              </template>
            </draggable>
          </template>
          <div
            v-else
            class="empty"
          >选择数据字段至此处</div>
        </div>
        <div class="field-header">
          度量
        </div>

        <div
          class="field-list"
          @drop="measureDrop"
          @dragover.prevent
        >
          <template v-if="measureList.length >0">
            <draggable
              :list="measureList"
              item-key="id"
              chosen-class="chosen"
              ghost-class="ghost"
              :force-fallback="true"
              animation="300"
              @start="onStartDimension"
              @end="onEndDimension"
            >
              <template #item="{ element }">
                <div class="field-measureItem flex justify-space-between align-center">
                  <div class="left">
                    <img src="/src/assets/analysis/icon-num.png" /><span>{{element.label}}</span>
                  </div>
                  <div class="right">
                    <el-icon class="icon">
                      <ArrowDown />
                    </el-icon>
                    <el-icon
                      class="icon"
                      @click="handleDelMeasure(element,0)"
                    >
                      <Delete />
                    </el-icon>
                  </div>
                </div>
              </template>
            </draggable>
          </template>
          <div
            v-else
            class="empty"
          >选择数据字段至此处</div>
        </div>
      </template>
    </div>

    <!-- 图标样式 -->
    <div
      v-if="currentTab === 1"
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

defineExpose({ addDimension, addMeasure });

const state = reactive({
  activeItem: '1',
  activeItem1: '1',
  currentTab: 0,
  dimensionList: [
    { id: 0, label: '学校院校', value: 0 },
    { id: 1, label: '出生日期', value: 1 }
  ],
  measureList: [
    { id: 0, label: '女生人数（总和）', value: 0 },
    { id: 1, label: '男生人数（总和）', value: 1 }
  ]
});

const { activeItem, activeItem1, currentTab, dimensionList, measureList } =
  toRefs(state);

const handleTab = (tab: number) => {
  state.currentTab = tab;
};

const handleDelDimension = (item: any, index: number) => {
  state.dimensionList.splice(index, 1);
};

const handleDelMeasure = (item: any, index: number) => {
  state.measureList.splice(index, 1);
};

function addDimension(node: any, data: any) {
  state.dimensionList.push(data);
}

function addMeasure(node: any, data: any) {
  state.measureList.push(data);
}

const dimensionDrop = (event: any) => {
  let data = event.dataTransfer.getData('data');
  if (!data) {
    return;
  }
  state.dimensionList.push(JSON.parse(data));
};
const measureDrop = (event: any) => {
  let data = event.dataTransfer.getData('data');
  if (!data) {
    return;
  }
  state.measureList.push(JSON.parse(data));
};

const onStartDimension = (event: any) => {};

const onEndDimension = (event: any) => {};
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

.field-list {
  margin-top: 14px;
  width: 100%;
  min-height: 60px;
  .empty {
    width: 100%;
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 400;
    color: #bbbcbb;
    line-height: 24px;
    background: #f3f5ff;
    border: 1px dashed #dcdde0;
    border-radius: 12px;
  }
  .field-dimensionItem {
    margin-bottom: 16px;
    width: 100%;
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 400;
    color: #293270;
    line-height: 24px;
    background: #f3f5ff;
    border: 1px dashed #7c87ff;
    border-radius: 12px;
    cursor: move;
    &:hover {
      .right {
        .icon {
          display: inline-block;
          transition: ease-in-out 0.3s;
        }
      }
    }
    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      img {
        width: 22px;
        height: 11px;
      }
      span {
        margin-left: 10px;
      }
    }
    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #7c87ff;
      .icon {
        display: none;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .field-measureItem {
    margin-bottom: 16px;
    width: 100%;
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 400;
    color: #293270;
    line-height: 24px;
    background: #f3f5ff;
    border: 1px dashed #23d8c2;
    border-radius: 12px;
    cursor: move;
    &:hover {
      .right {
        .icon {
          display: inline-block;
          transition: ease-in-out 0.3s;
        }
      }
    }
    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      img {
        width: 17px;
        height: 11px;
      }
      span {
        margin-left: 10px;
      }
    }
    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #23d8c2;
      .icon {
        display: none;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
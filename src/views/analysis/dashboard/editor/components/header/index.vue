<script lang='ts'>
export default {
  name: 'Header'
};
</script>
<template>
  <div class='header'>
    <div class="header-left">
      <div
        class="el-button-primary backBtn"
        @click="handleBack"
      >
        <img
          width="8"
          height="14"
          src="/src/assets/analysis/icon-back.png"
        /><span class="text">返回</span>
      </div>

      <div class="title">未命名仪表盘</div>
    </div>
    <div class="header-right">
      <div class="boardSizeBox">
        <span class="boardSizeBox-label">画板尺寸</span>
        <el-select
          v-model="boardSize"
          class="boardSizeBox-value"
          placeholder="1000*1000（默认）"
          size="default"
        >
          <el-option
            v-for="item in boardSizeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="btnGroup">
        <svg-icon
          class-name="btn active"
          icon="backOff"
        ></svg-icon>

        <svg-icon
          class-name="btn"
          icon="forward"
        ></svg-icon>
      </div>
      <div class="operation">
        <div
          class="el-button-normal operation-btn margin-left-22"
          @click="handlePreview"
        >
          <img
            width="18"
            height="18"
            src="/src/assets/analysis/icon-preview.png"
          />
          <span class="text">预览</span>
        </div>
        <div
          class="el-button-primary operation-btn  margin-left-10"
          @click="handleSave"
        >
          <img
            width="17"
            height="17"
            src="/src/assets/analysis/icon-save.png"
          /><span class="text">保存</span>
        </div>
        <div
          class="el-button-primary margin-left-10"
          @click="handleSave"
        >
          <img
            width="14"
            height="13"
            src="/src/assets/analysis/icon-more.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';
import router from '@/router';

const state = reactive({
  boardSize: '',
  boardSizeOptions: [
    {
      id: 0,
      label: '1920*1080',
      value: '0'
    },
    {
      id: 1,
      label: '2560*1440',
      value: '1'
    },
    {
      id: 2,
      label: '3840*2160',
      value: '3'
    }
  ]
});

const { boardSize, boardSizeOptions } = toRefs(state);

const handleBack = () => {
  router.go(-1);
};

const handlePreview = () => {};

const handleSave = () => {};
</script>
 
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  &-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .title {
      position: relative;
      margin-left: 128px;
      padding-left: 10px;
      font-size: 24px;
      font-weight: bold;
      color: #293270;
      line-height: 1;
      text-align: left;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 2px;
        height: 16px;
        transform: translateY(-50%);
        background: linear-gradient(180deg, #0059e8 0%, #37e2c1 100%);
      }
    }
  }

  &-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    .boardSizeBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-label {
        width: 120px;
        font-size: 14px;
        font-weight: 400;
        color: #6b797f;
        line-height: 1;
        text-align: right;
      }
      &-value {
        margin-left: 10px;
        width: 200px;
        :deep(.el-input__wrapper) {
          box-shadow: none;
          border-radius: 16px;
        }
      }
    }

    .btnGroup {
      margin-left: 80px;
      width: 120px;
      .btn {
        margin: 0 15px;
        color: #bbbcbb;
        font-size: 18px;
        cursor: pointer;
      }
      .active {
        color: #6d79ff;
      }
    }
    .operation {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      margin-left: 80px;
      .operation-btn {
        width: 100px;
      }
    }
  }
}

.margin-left-10 {
  margin-left: 10px;
}
</style>
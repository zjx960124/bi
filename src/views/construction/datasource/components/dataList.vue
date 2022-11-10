<template>
  <div class="datalist-container-box">
    <div class="searchBox">
      <img width="22" height="21" src="~@/assets/analysis/search.png" />
      <el-input
        class="input"
        v-model="searchValue"
        clearable
        placeholder="共X个文件"
      >
      </el-input>
    </div>
    <div class="content">
      <el-scrollbar style="height: 100%; width: 100%">
        <div class="item" v-for="i in 22" :class="{ active: i === 0 }">
          <svg-icon
            class-name="icon"
            :icon="`datasource`"
            class="mr10"
          ></svg-icon>
          <div class="item-info">
            <div class="title">SQL数据源名称{{ i }}</div>
            <div class="desc">创建者:用户名</div>
          </div>
          <div class="item-btn">
            <img src="@/assets/data/edit.png" />
            <img src="@/assets/data/del.png" />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import svgIcon from "@/components/svg-icon/index.vue";
const searchValue = ref("");
</script>
<style scoped lang="scss">
.datalist-container-box {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 22px;
  padding-top: 14px;
  box-sizing: border-box;
  .searchBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    height: 29px;
    line-height: 29px;
    padding: 0 17px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 22px;
    border: 1px solid #d5d5de;
    .input {
      :deep(.el-input__wrapper) {
        box-shadow: none;
        height: 25px;
        .el-input__inner {
          padding: 0 12px;
          border: none;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: calc(100% - 40px);
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .item {
      width: 100%;
      height: 53px;
      padding: 11px 27px 11px 27px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      & .item-info {
        width: calc(100% - 46px);
        height: 100%;
        margin: auto 8px;
        margin-top: -3px;
        & > .title {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #6b797f;
          text-align: left;
        }
        & > .desc {
          //   height: 12px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #6b797f;
          text-align: left;
        }
      }
      &.active {
        background: #f3f5ff;
        .title {
          font-weight: bold;
          color: #293270;
        }
        .icon {
          color: #293270;
        }
      }
      & .item-btn {
        width: 50px;
        height: 11px;
        display: flex;
        justify-content: space-between;
      }

      &:hover {
        background: #f3f5ff;
      }

      &:hover .title {
        font-weight: bold;
        color: #293270;
      }

      &:hover .icon {
        color: #293270;
      }
    }
  }
}
</style>
<template>
  <div class="datasource-content">
    <div class="datasource-content-box">
      <el-empty
        :image="imgUrl"
        class="datasource-empty"
        description="暂无数据"
      />
    </div>
    <div class="datasource-action">
      <div class="datasource-action-title">获取数据</div>
      <div class="datasource-action-content">
        <div
          class="item"
          v-for="(item, idx) in dataList"
          :key="idx"
          @click="openSetting(item)"
        >
          <div class="item-img"></div>
          <div class="item-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import noData from "@/assets/data/noData.png";
import { dataTypes } from "@/views/construction/types/index";

const imgUrl = ref(noData);

const dataList = ref<Array<dataTypes>>([
  { type: "sql", title: "MySQL" },
  { type: "file", title: "本地文件（.csv  .xlsx  .xls）" },
  // { type: "api", title: "API数据" },
]);

const emit = defineEmits(["openSetting"]);

const openSetting = (item: dataTypes) => {
  emit("openSetting", item);
};
</script>
<style scoped lang="scss">
.datasource-content {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 25px;
  position: relative;
  .datasource-action {
    width: 100%;
    height: 280px;
    position: absolute;
    bottom: 30px;
    .datasource-action-title {
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #293270;
      line-height: 52px;
      text-align: left;
      padding-left: 45px;
    }
    .datasource-action-content {
      display: flex;
      height: calc(100% - 52px);
      padding: 0 27px;
      box-sizing: border-box;
      & .item {
        flex: 0.3;
        height: 100%;
        background: #f3f5ff;
        border-radius: 15px;
        margin-right: 15px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        .item-img {
          height: calc(100% - 42px);
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          background-color: #bfbfbf;
        }
        .item-title {
          font-size: 14px;
          font-family: "PingFang SC";
          font-weight: 400;
          color: #293270;
          text-align: left;
          line-height: 42px;
          padding-left: 15px;
          box-sizing: border-box;
        }
      }
    }
  }
  .datasource-content-box {
    width: 100%;
    height: calc(100% - 300px);
    position: relative;
    .datasource-empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      ::v-deep .el-empty__image {
        width: 140px !important;
      }
    }
  }
}
</style>

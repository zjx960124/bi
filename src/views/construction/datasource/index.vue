<template>
  <JsLayout title="数据源" background="transparent">
    <template #main>
      <div class="datasource-container">
        <el-row>
          <el-col :span="20">
            <div class="datasource-content">
              <el-empty :image="imgUrl" />
              <div class="datasource-action">
                <div class="datasource-action-title">获取数据</div>
                <div class="datasource-action-content">
                  <div class="item">
                    <div class="item-img"></div>
                    <div class="item-title">MySQL</div>
                  </div>
                  <div class="item"></div>
                  <div class="item"></div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
      </div>
    </template>
  </JsLayout>
</template>

<script lang="ts" setup>
import noData from "@/assets/data/noData.png";
import { ref } from "vue";
const imgUrl = ref(noData);
</script>
<style scoped lang="scss">
.datasource-container {
  width: 100%;
  height: calc(100vh - 170px);
  & .el-row {
    width: 100%;
    height: 100%;
  }
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
  }
}
</style>

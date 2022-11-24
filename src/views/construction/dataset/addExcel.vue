<template>
  <div class="excel-create-container">
    <div class="left">
      <el-button
        type="primary"
        class="left-button"
      >
        <el-icon>
          <ArrowLeft />
        </el-icon>返回
      </el-button>
      <div class="upload-file-container">
        <div class="title">新建Excel数据集/替换数据/追加数据</div>
        <div class="container-content-title">
          选择数据
          <el-popover
            placement="right"
            :width="400"
            trigger="hover"
          >
            <template #reference>
              <img src="~@/assets/data/warning.png" />
            </template>
            <div class="popover-content">
              <p>1、Excel文件中不能存在合并单元格；</p>
              <p>2、Excel文件的第一行为标题行，不能为空，不能为日期型；</p>
              <p>3、文件大小请确保在500M以内；</p>
            </div>
          </el-popover>
        </div>
        <div class="content-list">
          <div class="item active">
            <span>222222222222222</span>
            <el-icon>
              <Close />
            </el-icon>
          </div>
        </div>
        <el-upload
          ref="uploadRef"
          class="upload-file"
          action=""
          :limit="1"
          :auto-upload="false"
          v-if="dataList && dataList.length == 0"
        >
          <template #trigger>
            <el-button
              type="primary"
              class="upload-button"
            ><img src="~@/assets/data/upload.png" />上传文件</el-button>
          </template>
        </el-upload>
      </div>
    </div>
    <div class="right">
      <div class="right-title">
        <span>未命名仪表盘</span>
        <el-button type="primary">保存</el-button>
      </div>
      <div class="right-content">
        <el-empty
          :image="imgUrl"
          v-if="dataList && dataList.length == 0"
          class="datasource-empty"
          description="请先上传Excel数据"
        />
        <div class="tableBox el-common-tableBox">
          <el-table
            :data="tableData"
            align="center"
            fit
            :highlight-current-row="false"
            :border="false"
            show-overflow-tooltip
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
              align="center"
            />

            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
              align="center"
            />
            <el-table-column
              prop="name"
              label="名称"
              min-width="120"
              align="center"
            />
          </el-table>
          <el-pagination
            class="pagination"
            background
            layout="->,prev, pager, next, total, sizes,jumper"
            :total="1000"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import noData from '@/assets/data/excelNo.png';
import { ref } from 'vue';
const imgUrl = ref(noData);

const dataList = ref([{}]);

const tableData = ref([{}, {}, {}]);
</script>
<style scoped lang="scss">
.excel-create-container {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: space-between;
  & .left {
    width: 264px;
    height: 100%;
    background: transparent;
    border-radius: 15px;
    .el-button.left-button {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      height: 43px;
      background: #6d79ff;
      border-radius: 22px;
    }

    .upload-file-container {
      width: 100%;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
      margin-top: 15px;
      & > .title {
        font-size: 14px;
        font-family: 'PingFang SC';
        font-weight: bold;
        color: #293270;
        line-height: 30px;
        text-align: center;
      }
      & > .container-content-title {
        text-align: left;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 12px;
        font-family: 'PingFang SC';
        font-weight: 400;
        color: #6b797f;
        line-height: 30px;
        & > img {
          // margin-left: 12px;
        }
      }

      & > .content-list {
        width: 100%;
        // padding: 0 15px;
        box-sizing: border-box;
        & > .item {
          text-align: left;
          cursor: pointer;
          color: #6b797f;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          &.active {
            color: #fff;
            background: linear-gradient(
              90deg,
              rgba(91, 101, 195, 0.8) 0%,
              rgba(122, 133, 255, 0.3) 100%
            );
          }
        }
      }
    }
  }

  & .right {
    width: calc(100% - 280px);
    height: 100%;
    background: transparent;
    border-radius: 15px;
    & .right-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 43px;
      font-size: 24px;
      font-family: 'PingFang SC';
      font-weight: bold;
      color: #293270;
      position: relative;
      padding-left: 15px;
      box-sizing: border-box;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 2px;
        height: 16px;
        background: linear-gradient(180deg, #0059e8 0%, #37e2c1 100%);
        border-radius: 1px;
      }

      .el-button {
        width: 113px;
        border-radius: 16px;
      }
    }
    & .right-content {
      width: 100%;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
      margin-top: 15px;
      position: relative;
      .datasource-empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.popover-content {
  font-size: 12px;
  font-family: 'PingFang SC';
  font-weight: 400;
  color: #6b797f;
  line-height: 30px;
}

.upload-file {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  .upload-button {
    width: 113px;
    height: 31px;
    border-radius: 16px;
    margin-top: 12px;
    border-color: #7c87ff;
    &:hover {
      background: rgba($color: #7c87ff, $alpha: 0.8);
      border-color: #7c87ff;
    }
    & img {
      margin-right: 8px;
    }
  }
}

.tableBox {
  padding: 0 15px;
  box-sizing: border-box;
}
</style>

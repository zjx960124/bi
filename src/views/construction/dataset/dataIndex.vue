<template>
  <div class="excel-create-container">
    <div class="left">
      <div class="left-title">
        数据集
        <el-dropdown>
          <img src="~@/assets/data/addDataSet.png" />
          <template #dropdown>
            <el-dropdown-menu class="left-dropdown">
              <el-dropdown-item>Excel数据集</el-dropdown-item>
              <el-dropdown-item>SQL数据集</el-dropdown-item>
              <el-dropdown-item>数据库数据集</el-dropdown-item>
              <el-dropdown-item divided>新建文件夹</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="upload-file-container">
        <div class="searchBox">
          <img
            width="22"
            height="21"
            src="~@/assets/analysis/search.png"
          />
          <el-input
            class="input"
            v-model="searchValue"
            clearable
            placeholder="共X个文件"
          >
          </el-input>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-sub-menu index="1">
            <template #title>
              <i class="files-icon"></i>
              <span>Navigator One</span>
              <!-- <i class="dataset-add"></i> -->
              <el-dropdown class="addSet">
                <i class="dataset-add"></i>
                <template #dropdown>
                  <el-dropdown-menu class="left-dropdown">
                    <el-dropdown-item>Excel数据集</el-dropdown-item>
                    <el-dropdown-item>SQL数据集</el-dropdown-item>
                    <el-dropdown-item>数据库数据集</el-dropdown-item>
                    <el-dropdown-item divided>新建文件夹</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown class="dataMore">
                <i class="data-more"></i>
                <template #dropdown>
                  <el-dropdown-menu class="left-dropdown">
                    <el-dropdown-item>重命名</el-dropdown-item>
                    <el-dropdown-item>移动到</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <el-menu-item index="1-4"><i class="files-icon"></i>
              item one
              <el-dropdown class="dataMore">
                <i class="data-more"></i>
                <template #dropdown>
                  <el-dropdown-menu class="left-dropdown">
                    <el-dropdown-item>重命名</el-dropdown-item>
                    <el-dropdown-item>移动到</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-menu-item>
            <el-menu-item index="1-5"><i class="files-icon"></i>
              item one
              <el-dropdown class="dataMore">
                <i class="data-more"></i>
                <template #dropdown>
                  <el-dropdown-menu class="left-dropdown">
                    <el-dropdown-item>重命名</el-dropdown-item>
                    <el-dropdown-item>移动到</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
    <div class="right">
      <div class="right-title">
        <div class="right-title-left">
          <div
            class="item active"
            @click="tabClick(0)"
          >
            <div class="info">
              <p>
                SQL数据集名称
                <popover-box>
                  <template #reference>
                    <img src="@/assets/data/warning.png" />
                  </template>
                  <template #content>
                    <div class="info-box"></div>
                  </template>
                </popover-box>
              </p>
              <p>创建者：用户名</p>
            </div>
            <div class="preview">数据预览</div>
          </div>
          <div
            class="item"
            @click="tabClick(1)"
          >字段管理</div>
        </div>
        <div class="right-title-right">
          <div class="searchBox">
            <img
              width="22"
              height="21"
              src="~@/assets/analysis/search.png"
            />
            <el-input
              class="input"
              v-model="searchValue"
              clearable
              placeholder="共X个文件"
            >
            </el-input>
          </div>
          <div class="el-button-primary margin-left-22">
            <img
              width="18"
              height="18"
              src="~@/assets/data/addData.png"
            />
            <span class="text">新建文件夹</span>
          </div>
          <div class="el-button-primary margin-left-22">
            <img
              width="18"
              height="18"
              src="~@/assets/data/addData.png"
            />
            <span class="text">新建数据集</span>
          </div>
        </div>
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
import popoverBox from '@/components/popover/index.vue';
import up from '@/assets/data/up.png';
import { ref } from 'vue';
const imgUrl = ref(noData);
const searchValue = ref('');
const dataList = ref([{}]);

const tableData = ref([{}, {}, {}]);

const tabClick = (val: number) => {
  console.log(val);
};
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
    & .left-title {
      height: 43px;
      width: 100%;
      font-size: 24px;
      font-family: 'PingFang SC';
      font-weight: bold;
      color: #293270;
      //   text-align: left;
      padding-left: 15px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
    }
    .upload-file-container {
      width: 100%;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
      padding-top: 12px;
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
        margin: 12px auto;
        margin-top: 0;
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
    }
  }

  & .right {
    width: calc(100% - 280px);
    height: 100%;
    background: transparent;
    border-radius: 15px;
    .right-title {
      width: 100%;
      height: 63px;
      display: flex;
      justify-content: space-between;
      & .right-title-left {
        display: flex;
        position: relative;
        width: 260px;
        height: 100%;
        & .item {
          background-color: #f3f5ff;
          height: 100%;
          &:nth-child(1) {
            width: 95%;
            background: url('@/assets/data/tab_1.png') no-repeat center;
            background-size: 100% 100%;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            padding-left: 15px;
            padding-right: 60px;
            padding-top: 20px;
            box-sizing: border-box;
            & .info {
              width: 70%;
              height: 100%;
              font-size: 12px;
              & p {
                &:nth-child(1) {
                  font-size: 7px;
                  font-family: 'PingFang SC';
                  font-weight: bold;
                  color: #293270;
                }
                &:nth-child(2) {
                  font-size: 6px;
                  font-family: 'PingFang SC';
                  font-weight: 400;
                  color: #6b797f;
                }
              }
            }

            & .preview {
              width: 15%;
              font-size: 7px;
              font-family: 'PingFang SC';
              font-weight: bold;
              color: #293270;
            }
          }
          &:nth-child(2) {
            width: 45%;
            background: url('@/assets/data/tab_2.png') no-repeat center;
            background-size: 100% 100%;
            position: absolute;
            left: 75%;
            cursor: pointer;
            font-size: 7px;
            font-family: 'PingFang SC';
            font-weight: bold;
            color: #b8bbbc;
            line-height: 18px;
            padding-left: 50px;
            padding-right: 40px;
            padding-top: 15px;
            box-sizing: border-box;
          }
          &.active {
            // background-color: #fff;
          }
        }
      }
      & .right-title-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .searchBox {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          width: 393px;
          height: 43px;
          line-height: 43px;
          padding: 0 17px;
          background: #ffffff;
          border-radius: 22px;
          .input {
            :deep(.el-input__wrapper) {
              box-shadow: none;
              .el-input__inner {
                padding: 0 12px;
                border: none;
              }
            }
          }
        }
      }
    }
    & .right-content {
      width: 100%;
      height: calc(100% - 60px);
      background: #ffffff;
      border-radius: 15px;
      border-top-left-radius: unset;
      position: relative;
    }
  }
}

.tableBox {
  padding: 0 15px;
  box-sizing: border-box;
}
.left-dropdown {
  box-shadow: 0px 2px 4px 0px rgba(195, 201, 253, 0.44);
  border-radius: 8px;
  background: #f5f6f9;
}

.addSet {
  position: absolute;
  right: 20px;
  top: 45%;
  transform: translateY(-45%);
}

.dataMore {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.dataset-add {
  width: 15px;
  height: 13px;
  display: block;
  background: url('@/assets/data/add.png') no-repeat;
}
.data-more {
  width: 13px;
  height: 3px;
  display: block;
  background: url('@/assets/data/more.png') no-repeat;
}
.files-icon {
  width: 15px;
  height: 13px;
  display: block;
  // background: url("@/assets/data/files.png") no-repeat;
  margin-left: 12px;
}
::v-deep .el-sub-menu__title {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  position: relative;
  & span {
    // margin-top: -5px;
    margin-left: 12px;
    font-family: 'PingFang SC';
    font-weight: 400;
    color: #6b797f;
  }
  .files-icon {
    width: 15px;
    height: 13px;
    display: block;
    background: url('@/assets/data/files.png') no-repeat;
    margin-left: 12px;
  }
  .dataset-add {
    width: 15px;
    height: 13px;
    display: block;
    background: url('@/assets/data/add.png') no-repeat;
    position: absolute;
    right: 30px;
  }
  .data-more {
    width: 13px;
    height: 3px;
    display: block;
    background: url('@/assets/data/more.png') no-repeat;
    position: absolute;
    right: 10px;
  }
}
::v-deep .el-sub-menu__icon-arrow {
  right: unset !important;
  left: 12px !important;
  background: url('@/assets/data/down.png') no-repeat;
  width: 8px;
  height: 6px;
  background-size: 100% 100%;
  margin-top: -5px;
  & svg {
    display: none;
  }
}
::v-deep .is-opened {
  background: rgba($color: #f3f5ff, $alpha: 1);
  .el-sub-menu__title {
    & span {
      color: #293270;
    }
    .files-icon {
      background: url('@/assets/data/files-open.png') no-repeat;
    }
  }
}
.el-menu-item {
  width: 100%;
}

.ml12 {
  margin-left: 10px;
  margin-top: -5px;
}

.margin-left-22 {
  margin-left: 22px;
}

.el-popover {
  background: #f5f6f9 !important;
}
.info-box {
  width: 100%;
  min-height: 200px;
}
</style>

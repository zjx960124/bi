<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const state = reactive({
  searchValue: '',
  list: [
    {
      id: 0,
      name: '文件夹名称',
      data: [
        { id: 0, name: '可视化名称0', imgUrl: '/src/assets/img/bar.png' },
        { id: 1, name: '可视化名称1', imgUrl: '/src/assets/img/line.png' }
      ]
    },
    {
      id: 1,
      name: '文件夹名称1',
      data: [
        { id: 0, name: '可视化名称0', imgUrl: '/src/assets/img/line.png' },
        { id: 1, name: '可视化名称1', imgUrl: '/src/assets/img/bar.png' }
      ]
    },
    {
      id: 2,
      name: '文件夹名称2',
      data: [
        { id: 0, name: '可视化名称0', imgUrl: '/src/assets/img/line.png' },
        { id: 1, name: '可视化名称1', imgUrl: '/src/assets/img/bar.png' }
      ]
    }
  ]
});

const { searchValue, list } = toRefs(state);

function handleAddFolder() {
  ElMessageBox.prompt('请输入文件夹名称', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.+$/,
    inputErrorMessage: '文件夹名称输入有误'
  }).then(({ value }) => {
    ElMessage({
      type: 'success',
      message: '创建成功'
    });
  });
}

function handleEditFolderName(data) {
  ElMessageBox.prompt('请输入文件夹名称', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.+$/,
    inputErrorMessage: '文件夹名称输入有误'
  }).then(({ value }) => {
    ElMessage({
      type: 'success',
      message: '修改成功'
    });
  });
}

function handleView(data) {}

function handleDelete(data) {}

function handleAttribute(data) {}

function handleCopy(data) {}
</script>
<template>
  <JsLayout title="仪表盘">
    <template #operation>
      <div class="searchBox">
        <img
          width="22"
          height="21"
          src="/src/assets/analysis/search.png"
        />
        <el-input
          class="input"
          v-model="searchValue"
          placeholder="请输入关键字搜索"
        >
        </el-input>
      </div>
      <div class="el-button-normal  margin-left-22">
        <img
          width="18"
          height="18"
          src="/src/assets/analysis/addDashboard.png"
        />
        <span class="text">新建仪表盘</span>
      </div>
      <div
        class="el-button-primary margin-left-22"
        @click="handleAddFolder"
      >
        <img
          width="20"
          height="14"
          src="/src/assets/analysis/addFolder.png"
        /><span class="text">新建文件夹</span>
      </div>
    </template>
    <template #main>
      <div class="list clearfix">
        <div
          v-for="item in list"
          :key="item.id"
          class="item"
        >
          <div class="item-header">
            <img
              width="9"
              height="18"
              src="/src/assets/analysis/folderSign.png"
            />
            <span class="name">{{item.name}}</span>
            <img
              class="btn"
              width="13"
              height="15"
              src="/src/assets/analysis/edit.png"
              @click="handleEditFolderName(item)"
            />

          </div>
          <div class="item-list clearfix">
            <div
              v-for="sItem in item.data"
              :key="sItem.id"
              class="sItem"
            >
              <img
                width="378"
                height="213"
                :src="sItem.imgUrl"
              />
              <div class="sItem-bottom">
                <span class="name">{{sItem.name}}</span>

                <div class="btns"> <img
                    class="btn"
                    width="37"
                    height="23"
                    src="/src/assets/analysis/icon-edit.png"
                  />
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <img
                        class="margin-left-11 btn"
                        width="37"
                        height="23"
                        src="/src/assets/analysis/icon-more.png"
                      />
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          icon="View"
                          @click="handleView(sItem)"
                        >
                          预览
                        </el-dropdown-item>
                        <el-dropdown-item
                          icon="Delete"
                          @click="handleDelete(sItem)"
                        >
                          删除
                        </el-dropdown-item>
                        <el-dropdown-item
                          icon="Operation"
                          @click="handleAttribute(sItem)"
                        >
                          属性
                        </el-dropdown-item>
                        <el-dropdown-item
                          icon="CopyDocument"
                          @click="handleCopy(sItem)"
                        >
                          克隆
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </JsLayout>
</template>
<style lang='scss' scoped>
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
    :deep(.el-input__inner) {
      padding: 0 12px;
      border: none;
    }
  }
}
.margin-left-22 {
  margin-left: 22px;
}

.margin-left-11 {
  margin-left: 11px;
}

.list {
  width: 100%;
  // overflow: hidden;
  .item {
    float: left;
    width: 100%;
    .item-header {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 16px;
      width: 100%;
      padding: 0 15px;
      .name {
        margin: 0 12px 0 15px;
        font-size: 14px;
        font-weight: 400;
        color: #293270;
        line-height: 1;
      }
      .btn {
        cursor: pointer;
      }
    }
    .item-list {
      width: 100%;
      // overflow: hidden;
      .sItem {
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-right: 22px;
        margin-bottom: 25px;
        width: 380px;
        height: 268px;
        background: #f7f6f9;
        border: 2px solid #96a0fe;
        overflow: hidden;
        border-radius: 15px;

        .sItem-bottom {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 55px;
          padding: 0 24px;
          .title {
            font-size: 14px;
            font-weight: 400;
            color: #293270;
            line-height: 55px;
          }
          .btns {
            height: 23px;
            .btn {
              cursor: pointer;
              &:hover {
                opacity: 0.8;
              }
            }
          }
        }
      }
    }
  }
}
</style>

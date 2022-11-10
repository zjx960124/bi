<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { borderRadius } from '@/settings/designSetting';

const state = reactive({
  searchValue: '',
  tableData: [
    {
      id: 0,
      name: '数据集名称',
      creator: '用户名',
      createTime: '2020-00-00 00:00:00',
      lastEditor: '用户名',
      lastEditTime: '2020-00-00 00:00:00'
    },
    {
      id: 1,
      name: '数据集名称',
      creator: '用户名',
      createTime: '2020-00-00 00:00:00',
      lastEditor: '用户名',
      lastEditTime: '2020-00-00 00:00:00'
    },
    {
      id: 2,
      name: '数据集名称',
      creator: '用户名',
      createTime: '2020-00-00 00:00:00',
      lastEditor: '用户名',
      lastEditTime: '2020-00-00 00:00:00'
    }
  ]
});

const { searchValue, tableData } = toRefs(state);

const handleAddScreen = () => {};

const handleDel = (row: any) => {};

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>
<template>
  <JsLayout title="数据大屏">
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
          clearable
          placeholder="请输入关键字搜索"
        >
        </el-input>
      </div>
      <div
        class="el-button-primary margin-left-22"
        @click="handleAddScreen"
      >
        <img
          width="20"
          height="14"
          src="/src/assets/analysis/addFolder.png"
        /><span class="text">新建数据大屏</span>
      </div>
    </template>
    <template #main>
      <div class="tableBox el-common-tableBox">
        <el-table
          :data="tableData"
          align="center"
          fit
          :highlight-current-row="false"
          :border="false"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="名称"
            min-width="120"
            align="center"
          />
          <el-table-column
            prop="creator"
            label="创建者"
            min-width="120"
            align="center"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="180"
            align="center"
          />
          <el-table-column
            prop="lastEditor"
            label="最后修改人"
            min-width="120"
            align="center"
          />
          <el-table-column
            prop="lastEditTime"
            label="最后修改时间"
            min-width="180"
            align="center"
          />
          <el-table-column
            label="操作"
            min-width="240"
            align="center"
          >
            <template #default="scope">
              <el-button
                class="el-button-edit"
                link
                type="primary"
                size="small"
                icon="EditPen"
              >
                编辑
              </el-button>
              <el-button
                class="el-button-share"
                link
                type="primary"
                size="small"
                icon="Share"
              >
                分享
              </el-button>
              <el-popconfirm
                title="确认删除?"
                @confirm="handleDel(scope.row)"
              >
                <template #reference>
                  <el-button
                    class="el-button-delete"
                    link
                    type="primary"
                    size="small"
                    icon="Delete"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          background
          layout="->,prev, pager, next, total, sizes,jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
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
    :deep(.el-input__wrapper) {
      box-shadow: none;
      .el-input__inner {
        padding: 0 12px;
        border: none;
      }
    }
  }
}
.margin-left-22 {
  margin-left: 22px;
}

.margin-left-11 {
  margin-left: 11px;
}
.tableBox {
  width: 100%;

  .el-button-edit {
    color: #6e78ff;
    font-size: 14px;
  }

  .el-button-share {
    color: #23d8c2;
    font-size: 14px;
  }

  .el-button-delete {
    color: #ff6746;
    font-size: 14px;
  }
}
</style>

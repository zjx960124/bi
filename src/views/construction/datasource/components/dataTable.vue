<template>
  <div class="datatable-container-box">
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
        <el-table-column label="操作" min-width="240" align="center">
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
            <el-popconfirm title="确认删除?">
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
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const tableData = reactive([]);
</script>
<style scoped lang="scss">
.datatable-container-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 22px;
}
</style>

<template>
  <el-menu :default-active="active" class="el-menu-vertical-demo">
    <template v-for="(item, idx) in menuList">
      <el-sub-menu :index="`${item.id}${idx}`" class="main-sub-menu">
        <template #title>
          <i class="files-icon main-sub-menu-files"></i>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="item.name"
            placement="top"
          >
            <span class="main-sub-menu-title">{{
              ellipsis(item.name, 8)
            }}</span>
          </el-tooltip>
          <el-dropdown class="addSet">
            <i class="dataset-add"></i>
            <template #dropdown>
              <el-dropdown-menu class="left-dropdown">
                <el-dropdown-item @click.stop="openDialog(3, item)"
                  >Excel数据集</el-dropdown-item
                >
                <el-dropdown-item @click.stop="openDialog(2, item)"
                  >SQL数据集</el-dropdown-item
                >
                <el-dropdown-item @click.stop="openDialog(1, item)"
                  >数据库数据集</el-dropdown-item
                >
                <el-dropdown-item divided @click.stop="openDialog(0, item)"
                  >新建文件夹</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown class="dataMore">
            <i class="data-more"></i>
            <template #dropdown>
              <el-dropdown-menu class="left-dropdown">
                <el-dropdown-item @click.stop="changeName(item)"
                  >重命名</el-dropdown-item
                >
                <el-dropdown-item @click="deleteMenu(item)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-if="item.dataSetDtos && item.dataSetDtos.length > 0">
          <template v-for="(it, ix) in item.dataSetDtos">
            <el-sub-menu
              v-if="it.isFileFolder != 2"
              :index="`${it.id}${ix}`"
              class="last-sub-menu"
            >
              <template #title>
                <i class="files-icon last-sub-menu-files"></i>
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="it.name"
                  placement="top"
                >
                  <span class="last-sub-menu-title">{{
                    ellipsis(it.name, 8)
                  }}</span>
                </el-tooltip>
                <el-dropdown class="addSet">
                  <i class="dataset-add"></i>
                  <template #dropdown>
                    <el-dropdown-menu class="left-dropdown">
                      <el-dropdown-item @click.stop="openDialog(3, it)"
                        >Excel数据集</el-dropdown-item
                      >
                      <el-dropdown-item @click.stop="openDialog(2, it)"
                        >SQL数据集</el-dropdown-item
                      >
                      <el-dropdown-item @click.stop="openDialog(1, it)"
                        >数据库数据集</el-dropdown-item
                      >
                      <el-dropdown-item divided @click.stop="openDialog(0, it)"
                        >新建文件夹</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <el-dropdown class="dataMore">
                  <i class="data-more"></i>
                  <template #dropdown>
                    <el-dropdown-menu class="left-dropdown">
                      <el-dropdown-item @click.stop="changeName(it)"
                        >重命名</el-dropdown-item
                      >
                      <el-dropdown-item @click="deleteMenu(it)"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
              <template v-if="it.dataSetDtos && it.dataSetDtos.length > 0">
                <el-menu-item
                  v-for="(is, ik) in it.dataSetDtos"
                  :index="`${is.id}${ik}`"
                  @click="menuActive(is)"
                >
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`${is.name}-${
                      is.dataSetType == 2
                        ? 'sql数据集'
                        : is.dataSetType == 1
                        ? '数据库数据集'
                        : 'excel数据集'
                    }`"
                    placement="top"
                  >
                    {{ ellipsis(is.name, 8) }}
                  </el-tooltip>
                  <el-dropdown class="dataMore">
                    <i class="data-more"></i>
                    <template #dropdown>
                      <el-dropdown-menu class="left-dropdown">
                        <el-dropdown-item @click.stop="changeName(is)"
                          >重命名</el-dropdown-item
                        >
                        <el-dropdown-item @click="moveDataSet(is, 1)"
                          >移动到</el-dropdown-item
                        >
                        <el-dropdown-item @click.stop="deleteMenu(is)"
                          >删除</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </el-menu-item>
              </template>
            </el-sub-menu>
            <el-menu-item
              v-else
              :index="`${it.id}${ix}`"
              @click="menuActive(it)"
            >
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="`${it.name}-${
                  it.dataSetType == 2
                    ? 'sql数据集'
                    : it.dataSetType == 1
                    ? '数据库数据集'
                    : 'excel数据集'
                }`"
                placement="top"
              >
                {{ ellipsis(it.name, 8) }}
              </el-tooltip>
              <el-dropdown class="dataMore">
                <i class="data-more"></i>
                <template #dropdown>
                  <el-dropdown-menu class="left-dropdown">
                    <el-dropdown-menu class="left-dropdown">
                      <el-dropdown-item @click.stop="changeName(it)"
                        >重命名</el-dropdown-item
                      >
                      <el-dropdown-item @click="moveDataSet(it, 0)"
                        >移动到</el-dropdown-item
                      >
                      <el-dropdown-item @click="deleteMenu(it)"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-menu-item>
          </template>
        </template>
      </el-sub-menu>
    </template>
    <!-- 重命名 -->
    <el-dialog
      v-model="dialogTableVisible"
      :width="500"
      title="编辑"
      @close="closeName"
    >
      <el-input v-model="fileName" placeholder="请输入名称" />
      <template #footer>
        <el-button @click="closeName">取消</el-button>
        <el-button type="primary" @click="saveName">保存</el-button>
      </template>
    </el-dialog>
    <!-- 移动到 -->
    <el-dialog
      v-model="moveDataSetDialog"
      :width="500"
      :title="moveState.title"
      @close="moveDataSetDialogClose"
    >
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="moveState"
          label-width="120px"
          class="demo-ruleForm"
          size="small"
          status-icon
        >
          <el-form-item label="移动到" required>
            <el-cascader
              v-model="moveState.ids"
              :options="moveState.options"
              :props="props1"
              clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="moveDataSetDialogClose">取消</el-button>
        <el-button type="primary" @click="saveDataSet">确认</el-button>
      </template>
    </el-dialog>
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, ref } from "vue";
//接口地址
import {
  getFileFolderAndDataSets,
  updateDataSetOrFileFolder,
  deleteDataSetOrFileFolder,
} from "@/api/dataset";
import { addDataSetType } from "../../types";
import { ElMessage, ElMessageBox } from "element-plus";

//菜单数据
const menuState = reactive({
  active: "",
  menuList: [] as Array<addDataSetType>,
});

let { active, menuList } = toRefs(menuState);

//获取数据集文件夹和数据集列表
const getAllFileFolderAndDataSets = async () => {
  const { data } = await getFileFolderAndDataSets();
  if (data && data.length > 0) {
    menuList.value = data;
    handleAllFileFolder(data);
  }
};

//新增文件夹 数据集
const emits = defineEmits(["openDialog", "getMenuValue"]);
const openDialog = (key: number, val: addDataSetType) => {
  const params = {
    key,
    val,
  };
  emits("openDialog", params);
};

//更改数据集、文件夹名称
const dialogTableVisible = ref<boolean>(false);
const fileName = ref<string | undefined>("");
let menuValue = ref<addDataSetType>({});
const changeName = (val: addDataSetType) => {
  fileName.value = val.name;
  menuValue.value = val;
  dialogTableVisible.value = true;
};

//保存重命名修改
const saveName = async () => {
  menuValue.value.name = fileName.value;
  const res = await updateDataSetOrFileFolder(menuValue.value);
  if (res) {
    ElMessage.success("修改成功");
    dialogTableVisible.value = false;
    fileName.value = "";
    menuValue.value = {};
  }
};

//取消退出重命名
const closeName = () => {
  dialogTableVisible.value = false;
  fileName.value = "";
  menuValue.value = {};
};

//删除
const deleteMenu = (val: addDataSetType) => {
  ElMessageBox.confirm("确认删除?", "提示", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      const res = await deleteDataSetOrFileFolder(val.id);
      ElMessage.success("删除成功");
    })
    .catch(() => {});
};

//移动数据集
let moveDataSetDialog = ref<boolean>(false);
let moveValue = ref<addDataSetType>({});
const moveState = ref({
  ids: [] as Array<any>,
  options: [] as Array<any>,
  title: "",
});

const props1 = ref({
  checkStrictly: true,
  value: "id",
  label: "name",
  children: "dataSetDtos",
});
const moveDataSet = (val: addDataSetType, type: number) => {
  moveState.value.title = `将${val.name}移动到`;
  moveValue.value = val;
  let ids: number | string | undefined = 0;
  if (type == 1) {
    moveState.value.options.map((item) => {
      if (item.dataSetDtos && item.dataSetDtos.length > 0) {
        item.dataSetDtos.map((it: any) => {
          if (it.id == val.parentId) {
            ids = item.id;
          }
        });
      }
    });
    moveState.value.ids.push(ids);
    moveState.value.ids.push(val.parentId);
  } else {
    ids = val.parentId;
    moveState.value.ids.push(ids);
  }

  moveDataSetDialog.value = true;
};

//移动数据保存
const saveDataSet = async () => {
  if (moveState.value.ids.length == 2) {
    moveValue.value.parentId = moveState.value.ids[1];
  } else {
    moveValue.value.parentId = moveState.value.ids[0];
  }
  const res = await updateDataSetOrFileFolder(moveValue.value);
  if (res) {
    ElMessage.success("修改成功");
    moveDataSetDialogClose();
    getAllFileFolderAndDataSets();
  }
};

//移动数据集取消
const moveDataSetDialogClose = () => {
  moveDataSetDialog.value = false;
  moveState.value.ids = [];
  moveState.value.title = "";
  moveValue.value = {};
};

//点击数据集向父组件传递数据
const menuActive = (val: addDataSetType) => {
  emits("getMenuValue", val);
};

//省略多余字符，用...显示
const ellipsis = (value: string | undefined, len = 0, tail = 0) => {
  if (!value) return "";
  var all = value.length;
  var fisrt = value.substring(0, len);
  var last = all - tail;
  var limit = len + tail;
  if (all > limit) {
    return fisrt + "..." + value.substring(last, all);
  }
  return value;
};

//所属文件夹处理
const handleAllFileFolder = (data: any) => {
  let arr = JSON.parse(JSON.stringify(data));
  let ars = [] as Array<any>;
  if (arr && arr.length > 0) {
    arr.map((item: any) => {
      if (
        item.isFileFolder != 2 &&
        item.dataSetDtos &&
        item.dataSetDtos.length > 0
      ) {
        let arrs = [] as Array<any>;
        item.dataSetDtos.map((it: any) => {
          if (
            it.isFileFolder != 2 &&
            it.dataSetDtos &&
            it.dataSetDtos.length > 0
          ) {
            delete it.dataSetDtos;
            arrs.push(it);
          }
        });
        item.dataSetDtos = arrs;
        ars.push(item);
      } else if (item.isFileFolder != 2 && !item.dataSetDtos) {
        ars.push(item);
      }
    });
    if (ars && ars.length > 0) {
      ars.forEach((it) => {
        if (it.dataSetDtos && it.dataSetDtos.length == 0) {
          delete it.dataSetDtos;
        }
      });
      moveState.value.options = ars;
    }
  }
};

onMounted(() => {
  getAllFileFolderAndDataSets();
});
</script>
<style scoped lang="scss">
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
  background: url("@/assets/data/add.png") no-repeat;
}

.data-more {
  width: 13px;
  height: 3px;
  display: block;
  background: url("@/assets/data/more.png") no-repeat;
}

.files-icon {
  width: 15px;
  height: 13px;
  display: block;
  // background: url("@/assets/data/files.png") no-repeat;
  margin-left: 12px;
}

.main-sub-menu {
  ::v-deep &.is-opened {
    background: rgba($color: #f3f5ff, $alpha: 1);

    .el-sub-menu__title {
      & span.main-sub-menu-title {
        color: #293270;
      }

      .files-icon.main-sub-menu-files {
        background: url("@/assets/data/files-open.png") no-repeat;
      }
    }
  }

  ::v-deep .el-sub-menu__title {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    position: relative;

    & span {
      // margin-top: -5px;
      margin-left: 12px;
      font-family: "PingFang SC";
      font-weight: 400;
      color: #6b797f;
    }

    .files-icon {
      width: 15px;
      height: 13px;
      display: block;
      background: url("@/assets/data/files.png") no-repeat;
      margin-left: 12px;
    }

    .dataset-add {
      width: 15px;
      height: 13px;
      display: block;
      background: url("@/assets/data/add.png") no-repeat;
      position: absolute;
      right: 30px;
    }

    .data-more {
      width: 13px;
      height: 3px;
      display: block;
      background: url("@/assets/data/more.png") no-repeat;
      position: absolute;
      right: 10px;
    }

    .el-sub-menu__icon-arrow {
      right: unset !important;
      left: 12px !important;
      background: url("@/assets/data/down.png") no-repeat;
      width: 8px;
      height: 6px;
      background-size: 100% 100%;
      margin-top: -5px;

      & svg {
        display: none;
      }
    }
  }

  & .last-sub-menu {
    ::v-deep &.is-opened {
      background: rgba($color: #f3f5ff, $alpha: 1);

      .el-sub-menu__title {
        & span.last-sub-menu-title {
          color: #293270;
        }

        .files-icon.last-sub-menu-files {
          background: url("@/assets/data/files-open.png") no-repeat;
        }
      }
    }
  }
}
::v-deep .el-menu-item {
  .files-icon {
    width: 15px;
    height: 13px;
    display: block;
    background: url("@/assets/data/files.png") no-repeat;
    margin-left: 12px;
  }

  & span {
    margin-left: 12px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #6b797f !important;
  }
  .dataMore {
    right: 20px !important;
  }
}

::v-deep .el-menu-item.is-active {
  background-color: #ecf5ff;
  span {
    color: #293270 !important;
  }
}
</style>

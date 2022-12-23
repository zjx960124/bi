<template>
  <el-menu :default-active="active" class="el-menu-vertical-demo">
    <template v-for="(item, idx) in menuList">
      <el-sub-menu
        v-if="item.dataSetDtos"
        :index="`${item.id}${idx}`"
        class="main-sub-menu"
      >
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
              <template v-if="it.dataSetDtos && it.dataSetDtos.length > 0">
                <el-menu-item
                  v-for="(is, ik) in it.dataSetDtos"
                  :index="`${is.id}${ik}`"
                >
                  <i class="files-icon"></i>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="is.name"
                    placement="top"
                  >
                    {{ ellipsis(is.name, 8) }}
                  </el-tooltip>
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
              </template>
            </el-sub-menu>
            <el-menu-item v-else :index="`${it.id}${ix}`">
              <i class="files-icon"></i>
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="it.name"
                placement="top"
              >
                {{ ellipsis(it.name, 8) }}
              </el-tooltip>
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
          </template>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="`${item.id}${idx}`">
        <i class="files-icon"></i>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="item.name"
          placement="top"
        >
          {{ ellipsis(item.name, 8) }}
        </el-tooltip>
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
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from "vue";
//接口地址
import { getFileFolderAndDataSets } from "@/api/dataset";
import { addDataSetType } from "../../types";

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
  }
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

  .el-menu-item {
    .dataMore {
      right: 20px !important;
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
</style>

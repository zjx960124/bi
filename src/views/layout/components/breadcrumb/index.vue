<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { useRouteStore } from '@/store/useRoute/useRoute';
import { ref } from 'vue';
const routeStore = useRouteStore();
const breadcrumbList = ref(routeStore.breadcrumbList);
</script>
<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="(item, index) in breadcrumbList" :key="index">
      <el-breadcrumb-item v-changeBreadcrumb="index" :to="item.path">
        <div slot="default" class="custom-breadcrumb">
          {{ item.name }}
          <span @click="routeStore.deleteBreadCrumb(index)" class="cha">+</span>
        </div>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>ss
<style lang="scss" scoped>
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  font-weight: 700;
  color: #6d79ff;
  cursor: normal;
  position: relative;
  .custom-breadcrumb:hover {
    .cha {
      opacity: 0;
    }
  }
}

:deep(.el-breadcrumb__item .el-breadcrumb__inner) {
  .custom-breadcrumb {
    padding: 10px 3px;
    box-sizing: border-box;
    position: relative;
    .cha {
      display: none;
      pointer-events: none;
    }
  }
  .custom-breadcrumb:hover {
    .cha {
      display: block;
      position: absolute;
      font-size: 16px;
      right: -5px;
      top: -5px;
      transform: rotate(45deg);
      cursor: pointer;
    }
  }
}
</style>

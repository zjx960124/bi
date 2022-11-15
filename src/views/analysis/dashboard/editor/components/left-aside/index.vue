<script lang='ts'>
export default {
  name: 'LeftAside'
};
</script>

<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';

const state = reactive({
  menuList: [
    {
      id: 0,
      icon: 'index',
      title: '指标'
    },
    {
      id: 1,
      icon: 'table',
      title: '表格'
    },
    {
      id: 2,
      icon: 'trend',
      title: '趋势'
    },
    {
      id: 3,
      icon: 'compare',
      title: '比较'
    },
    {
      id: 4,
      icon: 'distribution',
      title: '分布'
    },
    {
      id: 5,
      icon: 'space',
      title: '空间'
    },
    {
      id: 6,
      icon: 'richText',
      title: '富文本'
    }
  ]
});

const { menuList } = toRefs(state);

const activeName = ref();
</script>

<template>
  <el-menu
    default-active="0-0"
    class="el-dashboard-menu"
    :collapse="false"
    active-text-color="#FFFFFF"
    text-color="#8386A1"
    background-color="#262f47"
  >
    <el-sub-menu index="0">
      <template #title>
        <svg-icon
          class-name="icon"
          icon="component"
        ></svg-icon>
        <span>组件</span>
      </template>
      <el-menu-item
        v-for="(item,index) in menuList"
        :key="item.id"
        :index='`0-${index}`'
      >
        <svg-icon
          class-name="icon"
          :icon="item.icon"
        ></svg-icon>
        <span>{{item.title}}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
 
<style lang="scss" scoped>
.el-dashboard-menu {
  width: 103px;
  height: 100vh;
  padding: 70px 0;
  .el-sub-menu .el-sub-menu__title {
    padding: 0 15px;
    span {
      margin-left: 8px;
    }
  }
  .el-sub-menu .el-menu-item {
    min-width: 100%;
    padding: 0 15px;
    border-left: 3px solid transparent;
    background: #262f47;
    span {
      margin-left: 8px;
    }
  }
  .el-sub-menu .is-active {
    background: linear-gradient(
      90deg,
      rgba(91, 101, 195, 0.8) 0%,
      rgba(122, 133, 255, 0.3) 100%
    );
    border-left: 3px solid #7a85ff;
  }
}
.el-sub-menu__icon-arrow {
  right: 10px;
}
</style>
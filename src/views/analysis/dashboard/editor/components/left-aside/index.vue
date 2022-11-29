<script lang='ts'>
export default {
  name: 'LeftAside'
};
</script>

<script setup lang='ts'>
import { ref, reactive, toRefs, onMounted } from 'vue';
import { genreMenuOptions, genreMenuOptionsType } from '@/utils/hooks/useAside';

const emit = defineEmits(['menuSelect']);

const state = reactive({});

const {} = toRefs(state);

const activeName = ref();

onMounted(() => {});

const handleSelect = (key: string, keyPath: string[]) => {
  let data = {};
  genreMenuOptions.forEach((item: any) => {
    if (item.key === keyPath[0]) {
      data = item.list[keyPath[1]];
    }
  });
  emit('menuSelect', data);
};
</script>

<template>
  <el-scrollbar>
    <el-menu
      default-active=""
      class="el-dashboard-menu"
      :collapse="false"
      active-text-color="#FFFFFF"
      text-color="#8386A1"
      background-color="#262f47"
      @select="handleSelect"
    >
      <el-sub-menu
        v-for="(item,index) in genreMenuOptions"
        :key="item.key"
        :index='item.key'
      >
        <template #title>
          <svg-icon
            class-name="icon"
            icon="component"
          ></svg-icon>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item
          v-for="sItem in item.list"
          :key="sItem?.key"
          :index='sItem?.key'
        >
          <svg-icon
            class-name="icon"
            :icon="sItem?.key"
          ></svg-icon>
          <span>{{sItem?.label}}</span>
        </el-menu-item>

      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>
 
<style lang="scss" scoped>
.el-dashboard-menu {
  width: 110px;
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
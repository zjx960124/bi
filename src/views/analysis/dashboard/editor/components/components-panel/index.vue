<script lang='ts'>
export default {
  name: 'ComponentsPanel'
};
</script>
<template>
  <div class='components-panel'>
    <div
      v-for="item in list"
      :key="item.key"
      class="item"
    >
      <el-image
        class="item-img"
        :src="item.image"
        fit="contain"
      > </el-image>
      <div class="item-name">{{item.title}}</div>
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, toRefs, watch, PropType } from 'vue';

interface ConfigType {
  key: string;
  chartKey: string;
  conKey: string;
  title: string;
  category: string;
  categoryName: string;
  package: string;
  image: string | (() => Promise<typeof import('*.png')>);
}

const props = defineProps({
  data: {
    type: Array as PropType<ConfigType[]>,
    required: true
  }
});

const state = reactive({
  list: [] as ConfigType[]
});

const { list } = toRefs(state);

watch(
  () => props.data,
  (value) => {
    state.list = value;
  },
  {
    immediate: true,
    deep: true
  }
);
</script>
 
<style lang="scss" scoped>
.components-panel {
  margin: 0 10px;
  width: 180px;
  padding: 20px 15px;
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  .item {
    float: left;
    margin-bottom: 24px;
    width: 100%;
    padding: 0;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    .item-img {
      width: 100%;
      height: 88px;
      background-color: #e0e3e5;
      border-radius: 2px;
    }

    .item-name {
      margin-top: 15px;
      font-size: 12px;
      font-weight: 400;
      color: #6b797f;
      line-height: 1;
    }
  }
}
</style>
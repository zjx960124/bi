<script lang='ts'>
export default {
  name: 'ComponentsPanel'
};
</script>
<template>
  <div class='components-panel'>
    <div
      v-for="item in list"
      :key="item.id"
      class="item"
    >
      <!-- <img
        class="item-img"
        :src="item.imageUrl"
      /> -->
      <el-image
        class="item-img"
        :src="item.imageUrl"
        fit="contain"
      > </el-image>
      <div class="item-name">{{item.name}}</div>
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive, toRefs } from 'vue';
const state = reactive({
  list: [
    {
      id: 0,
      imageUrl: 'index',
      name: '折线面积图'
    },
    {
      id: 1,
      imageUrl: 'table',
      name: '折线图'
    }
  ]
});

const { list } = toRefs(state);
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
<script lang='ts'>
export default {
  name: 'ComponentsList'
};
</script>
<template>
  <div class='components-list'>
    <div
      v-for="item in list"
      :key="item.id"
      class="item"
    >
      <img
        class="item-img"
        :src="item.imageUrl"
      />
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
.components-list {
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
    .item-img {
      width: 100%;
      height: 88px;
      background-color: #c2c7cc;
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
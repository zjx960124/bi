<script lang='ts'>
export default {
  name: 'ThemePanel'
};
</script>
<template>
  <div class='data-panel'>
    <div class="title">数据</div>
  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue';
</script>
 
<style lang="scss" scoped>
.data-panel {
  margin: 0 10px;
  width: 145px;
  height: 100%;
  .title {
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    font-weight: bold;
    color: #293270;
    text-align: center;
    background: #ffffff;
    border-radius: 15px;
  }
}
</style>
<script setup lang="ts">
</script>
<template>
  <div class="editor-pages">
    <n-collapse arrow-placement="right">
      <n-collapse-item title="页面" name="1">
        <div>页面</div>
      </n-collapse-item>
      <n-collapse-item title="元素" name="2">
        <div>元素</div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>
<style lang='scss' scoped>
.editor-pages {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  .n-collapse {
    height: 100%;
    display: flex;
    flex-direction: column;
    .n-collapse-item {
      width: 100%;
    }
    .n-collapse-item:first-child {
      max-height: 30%;
    }
    .n-collapse-item--active {
      flex: 1;
    }
  }
}
</style>

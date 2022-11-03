<template>
  <header class="editor-header">
    <div class="editor-header-item left">
      <slot name="left"></slot>
    </div>
    <div class="editor-header-item center">
      <slot name="center"></slot>
    </div>
    <div class="editor-header-item right">
      <slot name="ri-left"> </slot>
      <slot name="ri-right"> </slot>
    </div>
  </header>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.editor-header {
  display: flex;
  align-items: center;
  height: 65px;
  .editor-header-item {
    display: flex;
    align-items: center;
    width: 0;
  }
  .left {
    flex: 309;
    flex-shrink: 0;
    padding: 0 17px 0 30px;
    box-sizing: border-box;
    ::v-deep .return-btn {
      width: 263px;
      height: 43px;
      justify-content: flex-start;
    }
  }
  .center {
    flex: 1142;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
  }
  .right {
    flex: 469;
    flex-shrink: 0;
  }
}
</style>
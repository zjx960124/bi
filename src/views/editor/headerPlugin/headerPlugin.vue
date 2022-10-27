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
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  height: 60px;
  padding: 0 60px;
  border-bottom: 1px solid #000000;
  .editor-header-item {
    display: flex;
    align-items: center;
  }
}
</style>
<template>
  <div class="narbar-container">
    <breadcrumb />
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from "../breadcrumb";
</script>
<style lang="scss" scoped>
.narbar-container {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 40px;
}
</style>

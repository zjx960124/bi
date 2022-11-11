<template>
  <JsLayout title="数据集" background="transparent">
    <template #main>
      <div class="datasource-container">
        <div class="left"><list @openSetting="openSetting" /></div>
      </div>
    </template>
  </JsLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import list from "./components/list.vue";
import { dataTypes } from "@/views/construction/types/index";

const openSetting = (val: dataTypes) => {};
</script>
<style scoped lang="scss">
.datasource-container {
  width: 100%;
  height: calc(100vh - 180px);
  .left {
    background: #fff;
    height: 100%;
    width: 100%;
    border-radius: 22px;
  }
}
</style>

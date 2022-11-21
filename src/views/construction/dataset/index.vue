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
import { useRouter } from "vue-router";
const router = useRouter();
const openSetting = (val: dataTypes) => {
  router.push("/dataset/create");
};
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

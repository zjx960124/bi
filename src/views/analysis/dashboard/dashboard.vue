<script setup lang="ts">
import folderList from "./folderlist";
import { useDataListInit } from "./folderlist/useData";

const { list } = useDataListInit();
</script>
<template>
  <div>
    仪表盘
    <template v-for="(item, index) in list" :key="index">
      <folder-list
        :folderName="item.folderName"
        :list="item.list"
      ></folder-list>
    </template>
  </div>
</template>
<style lang='scss' scoped>
</style>

<script setup lang="ts">
import folderList from "./folderlist";
import { useDataListInit } from "./folderlist/useData";
import SvgIcon  from "@/components/svg-icon/index.vue";
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
  <svg-icon class-name="icon" icon="http://www.yygnb.com/demo/car.svg"></svg-icon>
</template>
<style lang='scss' scoped>
</style>

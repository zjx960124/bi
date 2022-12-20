<script setup lang="ts">
import { reactive } from 'vue';
const layout = reactive([
  {
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    i: '0',
    resizable: true,
    draggable: true,
    static: false,
  },
  {
    x: 2,
    y: 0,
    w: 2,
    h: 4,
    i: '1',
    resizable: null,
    draggable: null,
    static: true,
  },
  {
    x: 4,
    y: 0,
    w: 2,
    h: 5,
    i: '2',
    resizable: false,
    draggable: false,
    static: false,
  },
]);
</script>
<template>
  <grid-layout
    class="layoutbcc"
    :layout.sync="layout"
    :col-num="12"
    :row-height="60"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="(item, index) in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
    >
    </grid-item>
  </grid-layout>
</template>
<style lang="scss" scoped>
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
</style>

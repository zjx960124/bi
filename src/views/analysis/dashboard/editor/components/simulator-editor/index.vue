<script lang='ts'>
export default {
  name: 'SimulatorEditor'
};
</script>
<template>
  <div class='simulator-editor'></div>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue';
</script>
 
<style lang="scss" scoped>
.simulator-editor {
  flex: 1;
  margin: 0 10px;
  height: 100%;
  background: #ffffff;
  border-radius: 25px;
}
</style>
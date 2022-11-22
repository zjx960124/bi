<script setup lang="ts">
const props = defineProps({
  target: {
    type: Array<Number | String>,
    required: true,
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    requeired: true
  }
});
</script>
<template>
  <div class="common-item">
    <div class="common-sub-title">外{{ props.label }}</div>
    <n-slider class="common-slider" v-model:value="props.target[1]" :step="1" :max="100" :min="0" />
    {{ `${props.target[1]}%` }}
  </div>
  <div class="common-item" v-show="props.type">
    <div class="common-sub-title">内{{ props.label }}</div>
    <n-slider class="common-slider" v-model:value="props.target[0]" :step="1" :max="100" :min="0" />
    {{ `${props.target[0]}%` }}
  </div>
</template>
<style lang='scss' scoped>

</style>

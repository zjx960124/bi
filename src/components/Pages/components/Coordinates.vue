<script setup lang="ts">
import { ChevronUp } from "@vicons/carbon";
import { computed } from "vue";
const props = defineProps({
  attr: {
    type: Object,
    required: true,
  },
});
const attr = computed(() => {
  return props.attr;
});
</script>
<template>
  <n-collapse-item title="坐标" name="5">
    <div class="common-item">
      <div class="common-sub-title">X</div>
      <n-input
        class="common-input"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        placeholder=""
        round
        v-model:value="attr.x"
      ></n-input>
      <div class="common-sub-title">Y</div>
      <n-input
        class="common-input"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        placeholder=""
        round
        v-model:value="attr.y"
      ></n-input>
    </div>
    <div class="common-item">
      <div class="common-sub-title">W</div>
      <n-input
        class="common-input"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        placeholder=""
        round
        v-model:value="attr.w"
      ></n-input>
      <div class="common-sub-title">H</div>
      <n-input
        class="common-input"
        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        placeholder=""
        round
        v-model:value="attr.h"
      ></n-input>
    </div>
    <template #arrow>
      <n-icon size="16" color="#869299">
        <chevron-up />
      </n-icon>
    </template>
  </n-collapse-item>
</template>
<style lang='scss' scoped>
</style>

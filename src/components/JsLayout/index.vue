<script lang="ts">
export default {
  name: "jsLayout",
};
</script>

<template>
  <div class="container">
    <div v-if="showContainerHeader" class="container-header">
      <div class="container-title">{{ title }}</div>
      <div class="container-operation">
        <slot name="operation"></slot>
      </div>
    </div>

    <div class="container-main" :style="{ background: background }">
      <slot name="main"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  showContainerHeader: {
    type: Boolean,
    default: true,
  },
  background: {
    type: String,
    default: () => "#fff",
  },
});
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  .container-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    .container-title {
      position: relative;
      margin: 30px 0 18px;
      padding-left: 10px;
      font-size: 24px;
      font-weight: bold;
      color: #293270;
      line-height: 1;
      text-align: left;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 2px;
        height: 16px;
        transform: translateY(-50%);
        background: linear-gradient(180deg, #0059e8 0%, #37e2c1 100%);
      }
    }

    .container-operation {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .container-main {
    width: 100%;
    padding: 15px;
    // background: #ffffff;
    border-radius: 25px;
  }
}
</style>

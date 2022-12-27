<script setup lang="ts">
import { ChevronUp } from "@vicons/ionicons5";
import { Coordinates, ComponentCard } from "../components";

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    requeire: true,
  },
  layout: {
    type: Object,
    required: true,
  },
  card: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <n-collapse :default-expanded-names="['1', '2', '3', '4', '5', '6']">
    <coordinates :attr="props.attr" v-show="!props.layout"></coordinates>
    <component-card
      :layout="props.layout"
      :card="props.card"
      v-show="props.layout"
    ></component-card>
    <slot name="target"></slot>
    <slot name="process"></slot>
    <slot name="label"></slot>
    <slot></slot>
  </n-collapse>
</template>
<style lang="scss" scoped>
.n-collapse {
  height: 100%;
  display: flex;
  flex-direction: column;

  .n-collapse-item {
    width: 100%;
    background: #ffffff;
    border-radius: 15px;

    :deep .n-collapse-item__header {
      color: #293270;
      font-family: "PingFang-SC-Bold";
      font-weight: bold;
      font-size: 14px;
      height: 33px;
      margin: 0 10px;
      position: relative;
      padding: 0 0 0 16px;
      background-color: #f3f5ff;
      border-radius: 6px;

      .n-collapse-item__header-main {
        .n-collapse-item-arrow {
          position: absolute;
          right: 22px;
          top: 8px;
        }
      }
    }

    :deep .n-collapse-item__content-inner {
      padding: 0 25px 2px 25px;
    }
  }

  :deep .n-collapse-item.n-collapse-item--active {
    .n-collapse-item__header.n-collapse-item__header--active {
      .n-collapse-item-arrow {
        transform: rotate(180deg);
      }
    }
  }

  .n-collapse-item:not(:first-child) {
    border-top: 0px;
  }
}
</style>

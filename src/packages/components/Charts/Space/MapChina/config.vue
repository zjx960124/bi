<template>
  <MapCommonSetting
    :option-data="optionData"
    :attr="attr"
    :layout="layout"
    :card="card"
    :themeColor="themeColor"
  ></MapCommonSetting>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { MapCommonSetting } from "@/components/Pages/ChartItemSetting";
import { option } from "./config";

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
  themeColor: {
    type: Object,
    required: true,
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

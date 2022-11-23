<template></template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { GlobalThemeJsonType } from '@/settings/chartThemes/index';

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true,
  },
});
</script>

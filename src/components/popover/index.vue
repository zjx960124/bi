<template>
  <el-popover
    :placement="placement"
    :width="width"
    :trigger="trigger"
    :popper-class="ClassName"
  >
    <template #reference>
      <slot name="reference" />
    </template>
    <slot name="content"/>
  </el-popover>
</template>

<script lang="ts" setup>
interface Props {
  placement?: string;
  width?: number;
  trigger?: string;
  ClassName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placement: "bottom",
  width: 300,
  trigger: "hover",
  ClassName: "monitor-yt-popover",
});
</script>
<style>
.el-popover.monitor-yt-popover {
  background: #f5f6f9;
  box-shadow: 0px 1px 2px 0px rgba(195, 201, 253, 0.44);
  border-radius: 4px;
}
</style>

<template>
  <logo />
  <el-menu
    :default-active="routeStore.default_navication"
    class="el-menu-vertical-demo"
    :router="true"
    background-color="#0E1337"
    text-color="#8386A1"
    active-text-color="#fff"
  >
    <template v-for="menu in menus">
      <template v-if="menu.children && menu.children.length <= 1">
        <el-menu-item
          :index="menu.path"
          v-registed="{ name: `${menu.meta?.title}`, path: `${menu.path}` }"
          ><svg-icon
            v-show="menu.meta?.icon"
            class-name="icon"
            :icon="`${menu.meta?.icon}`"
            class="mr10"
          ></svg-icon
          >{{ getMenuItem(menu) }}</el-menu-item
        >
      </template>
      <template v-else>
        <el-sub-menu :index="menu.path">
          <template #title>
            <span
              ><svg-icon
                v-show="menu.meta?.icon"
                class-name="icon"
                :icon="`${menu.meta?.icon}`"
                class="mr10"
              ></svg-icon
              >{{ menu.meta?.title }}</span
            >
          </template>

          <el-menu-item
            v-for="it in menu.children"
            v-registed="{ name: `${it.meta?.title}`, path: `${it.path}` }"
            :index="`${it.path}`"
            ><svg-icon
              v-show="it.meta?.icon"
              class-name="icon"
              :icon="`${it.meta?.icon}`"
              class="mr10"
            ></svg-icon
            >{{ it.meta?.title }}</el-menu-item
          >
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import logo from "@/views/layout/components/logo";
import SvgIcon from "@/components/svg-icon/index.vue";
import { useRouteStore } from "@/store/useRoute/useRoute";
import { useRouter, RouteRecordRaw } from "vue-router";
import { ref, watch, computed } from "vue";
const routeStore = useRouteStore();
const router = useRouter();

const { routes } = router.options;
const menus = ref<Array<RouteRecordRaw>>();
watch(
  () => routes,
  (val) => {
    if (val && val.length > 0) {
      let arr = routes;
      menus.value = arr.slice(0, arr.length - 2);
    }
  },
  { immediate: true }
);

const getMenuItem = computed(() => {
  return (arr: RouteRecordRaw) => {
    if (arr && arr.children && arr.children.length >= 1) {
      return arr.children[0].meta?.title;
    }
  };
});
</script>
<style lang="scss" scoped>
::v-deep .el-menu-item.is-active {
  background: linear-gradient(
    90deg,
    rgba(91, 101, 195, 0.8) 0%,
    rgba(122, 133, 255, 0.3) 100%
  );
}
.mr10 {
  margin-right: 10px;
}
</style>

<template>
  <logo />
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    :router="true"
    background-color="#0E1337"
    text-color="#8386A1"
    active-text-color="#fff"
  >
    <template v-for="menu in menus">
      <template v-if="menu.children && menu.children.length <= 1">
        <el-menu-item
          v-if="menu.meta?.isShow"
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
        <el-sub-menu :index="menu.path" v-if="menu.meta?.isShow">
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

          <template v-for="it in menu.children">
            <el-menu-item
              v-if="it.meta?.isShow"
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
          </template>
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
import { ref, computed, watchEffect } from "vue";
const routeStore = useRouteStore();
const router = useRouter();
const defaultActive = ref("");
const { routes } = router.options;
const menus = ref<Array<RouteRecordRaw>>();

watchEffect(() => {
  if (routes && routes.length > 0) {
    let arr = routes;
    menus.value = arr.slice(0, arr.length - 2);
  }

  if (routeStore) {
    defaultActive.value = `/${routeStore.default_navication.split("/")[1]}`;
  }
});

const getMenuItem = computed(() => {
  return (arr: RouteRecordRaw) => {
    if (arr && arr.children && arr.children.length >= 1) {
      return arr.children[0].meta?.title;
    }
  };
});
</script>
<style lang="scss" scoped>
:deep .el-menu-item.is-active {
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

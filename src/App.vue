<template>
  <n-config-provider :theme-overrides="overridesTheme">
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup lang="ts">
import { GlobalThemeOverrides } from "naive-ui";
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#FF0000",
  },
  Button: {
    textColor: "#FF0000",
  },
  Slider: {
    fillColor: "#6D79FF",
    railColor: "#6D79FF",
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
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
    fillColorHover: "#6D79FF",
    railColor: "#F3F5FF",
    railColorHover: "#F3F5FF",
    handleSize: "11px",
    dotWidth: "0px",
    dotHeight: "0px",
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: "#BBBCBB",
        border: "#DCDDE0",
        borderHover: "#6D79FF",
      },
      InternalSelectMenu: {
        optionTextColor: "#BBBCBB",
        optionTextColorActive: "#6D79FF",
      },
    },
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
:root {
  --el-color-primary: #6d79ff !important;
}
</style>

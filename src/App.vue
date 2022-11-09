<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
const themeOverrides: GlobalThemeOverrides = {
  common: {},
  Button: {
    textColor: "#BBBCBB",
    textColorHover: "#6D79FF",
    textColorFocus: "#6D79FF",
    border: "1px solid #BBBCBB",
    borderHover: "1px solid #6D79FF",
    borderFocus: "1px solid #6D79FF",
  },
  Icon: {},
  Slider: {
    fillColor: "#6D79FF",
    fillColorHover: "#6D79FF",
    railColor: "#F3F5FF",
    railColorHover: "#F3F5FF",
    handleSize: "11px",
    dotWidth: "0px",
    dotHeight: "0px",
  },
  Radio: {
    color: "#FFFFFF",
    dotColorActive: "#84DFFC",
    boxShadowFocus: "inset 0 0 0 1px #84DFFC",
    boxShadowActive: "inset 0 0 0 1px #84DFFC",
    boxShadowHover: "inset 0 0 0 1px #84DFFC",
  },
  Checkbox: {
    colorChecked: "#FFFFFF",
    border: "1px solid #84DFFC",
    borderChecked: "1px solid #84DFFC",
    borderFocus: "1px solid #84DFFC",
    checkMarkColor: "#84DFFC",
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: "#BBBCBB",
        arrowColor: "#6D79FF",
        borderHover: "#6D79FF",
        borderFocus: "#6D79FF",
        borderActive: "#6D79FF",
        boxShadowActive: "#6D79FF",
        boxShadowFocus: "#6D79FF",
      },
      InternalSelectMenu: {
        color: "#ffffff",
        optionCheckColor: "#6D79FF",
        optionTextColor: "#BBBCBB",
        optionTextColorPressed: "#FFFFFF",
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

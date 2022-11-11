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
    textColorText: "#6B797F",
    textColorTextHover: "#6D79FF",
    border: "1px solid #BBBCBB",
    borderHover: "1px solid #6D79FF",
    borderFocus: "1px solid #6D79FF",
    rippleColor: "#6D79FF",
    borderPressed: "#6D79FF",
    textColorPressed: "#6D79FF",
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
    fontSizeMedium: "12px",
    color: "#FFFFFF",
    dotColorActive: "#95A0FE",
    boxShadowFocus: "inset 0 0 0 1px #95A0FE",
    boxShadowActive: "inset 0 0 0 1px #95A0FE",
    boxShadowHover: "inset 0 0 0 1px #95A0FE",
  },
  Checkbox: {
    sizeMedium: "14px",
    fontSizeMedium: "12px",
    textColor: "#6B797F",
    colorChecked: "#FFFFFF",
    border: "1px solid #95A0FE",
    borderChecked: "1px solid #95A0FE",
    borderFocus: "1px solid #95A0FE",
    checkMarkColor: "#95A0FE",
    boxShadowFocus: "",
  },
  Select: {
    peers: {
      InternalSelection: {
        fontSizeSmall: "12px",
        heightSmall: "21px",
        textColor: "#BBBCBB",
        arrowColor: "#6D79FF",
        borderHover: "#6D79FF",
        borderFocus: "#6D79FF",
        borderActive: "#6D79FF",
        boxShadowActive: "#6D79FF",
        boxShadowFocus: "#6D79FF",
        borderRadius: "calc(var(--n-height) / 2)",
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
  Input: {
    fontSizeMedium: "12px",
    heightMedium: "21px",
    borderHover: "1px solid #95A0FE",
    borderFocus: "1px solid #95A0FE",
    boxShadowFocus: "inset 0 0 0 1px #95A0FE",
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


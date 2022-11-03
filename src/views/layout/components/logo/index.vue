<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/img/logo.png" class="sidebar-logo" />
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  margin-bottom: 5px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  margin-top: 5px;
  box-sizing: border-box;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 111px;
      height: 35px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin-left: 40px;
      color: #fff;
      font-weight: 400;
      font-family: FZYaSongS-BN-GB;
      line-height: 55px;
      font-size: 24px;
      vertical-align: middle;
    }
  }
}
</style>

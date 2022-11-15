<script lang='ts'>
export default {
  name: 'SettingPanel'
};
</script>
<template>
  <div class='setting-panel'>
    <div class="section">
      <div class="header flex">
        <img
          class="left"
          src="/src/assets/analysis/icon-arrowLeft.png"
        />
        <div class="right">
          <img
            src="/src/assets/analysis/icon-text.png"
            width="15px"
            height="15px"
          />
          <div class="spe"></div>
          <img
            src="/src/assets/analysis/icon-style.png"
            width="19px"
            height="15px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue';
</script>
 
<style lang="scss" scoped>
.setting-panel {
  margin: 0 10px;
  width: 260px;
  height: 100%;
  .section {
    width: 100%;
    padding: 10px 20px;
    background: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .left {
        width: 6px;
        height: 11px;
      }
      .right {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 66px;
        height: 25px;
        padding: 0 9px;
        border: 1px solid #bbbcbb;
        border-radius: 8px;
        img {
          cursor: pointer;
        }
        .spe {
          width: 1px;
          height: 100%;
          background-color: #bbbcbb;
        }
      }
    }
  }
}
</style>
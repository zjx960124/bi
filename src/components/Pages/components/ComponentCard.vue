<script setup lang="ts">
import { ChevronUp, ChevronDown } from "@vicons/ionicons5";
import { computed, ref } from "vue";
const props = defineProps({
  layout: {
    type: Object,
    required: true,
  },
  card: {
    type: Object,
    required: true,
  },
});

const layout = computed(() => {
  return props.layout;
});

const mainTitleFontWeightFlag = ref({ type: false });
const mainTitleFontStyleFlag = ref({ type: false });
const switchCommon = (
  target: any,
  key: string,
  form: string,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type! = !depend.type!;
};
</script>
<template>
  <n-collapse-item title="标题与卡片" name="5">
    <div class="common-item">
      <div class="common-sub-title">主标题</div>
    </div>
    <div class="common-item">
      <n-checkbox v-model:checked="card.showMainTitle">显示主标题</n-checkbox>
    </div>
    <div class="common-item">
      <div class="common-sub-title">标题</div>
      <n-input
        class="common-input"
        placeholder="主标题名称"
        round
        v-model:value="card.mainTitleContent"
      >
      </n-input>
    </div>
    <div class="common-item">
      <div class="common-sub-title">文本</div>
      <el-input-number
        v-model="card.mainTitleFontSize"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
        :disabled="!card.showMainTitle"
      />
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="card.mainTitleFontColor"
        :disabled="!card.showMainTitle"
      >
        <template #label>
          <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
        </template>
      </n-color-picker>
    </div>
    <div class="common-item">
      <div class="common-sub-title"></div>
      <div class="common-space"></div>
      <div
        class="commmon-switch-self"
        @click="
          switchCommon(
            card,
            'mainTitleFontWeight',
            mainTitleFontWeightFlag.type ? 'normal' : 'bold',
            mainTitleFontWeightFlag
          )
        "
        :class="{ commonActive: card.mainTitleFontWeight === 'bold' }"
      >
        B
      </div>
      <div
        class="commmon-switch-self"
        :class="{ commonActive: card.mainTitleFontStyle === 'oblique' }"
        @click="
          switchCommon(
            card,
            'mainTitleFontStyle',
            mainTitleFontStyleFlag.type ? 'normal' : 'oblique',
            mainTitleFontStyleFlag
          )
        "
      >
        I
      </div>
    </div>
    <div class="common-item">
      <div class="common-sub-title">备注与尾注</div>
    </div>
    <div class="common-item">
      <n-checkbox v-model:checked="card.showSubTItle">备注</n-checkbox>
    </div>
    <div class="common-item">
      <div class="common-space"></div>
      <n-input
        class="common-input"
        placeholder="备注内容"
        round
        v-model:value="card.subTitleContent"
      >
      </n-input>
    </div>
    <div class="common-item">
      <n-checkbox v-model:checked="card.showFootTitle">尾注</n-checkbox>
    </div>
    <div class="common-item">
      <div class="common-space"></div>
      <n-input
        class="common-input"
        placeholder="尾注内容"
        round
        v-model:value="card.footTitleContent"
      >
      </n-input>
    </div>
    <div class="common-item">
      <div class="common-sub-title">组件容器</div>
    </div>
    <div class="common-item">
      <n-checkbox v-model:checked="card.customBack">自定义背景填充</n-checkbox>
    </div>
    <div class="common-item">
      <span>卡片颜色</span>
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="card.customBackColor"
        :disabled="!card.customBack"
      >
        <template #label>
          <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
        </template>
      </n-color-picker>
    </div>
    <div class="common-item">
      <span>圆角</span>
      <el-input-number
        v-model="card.customBackRadius"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
        :disabled="!card.customBack"
      />
    </div>
    <template #arrow>
      <n-icon size="16" color="#869299">
        <chevron-up></chevron-up>
      </n-icon>
    </template>
  </n-collapse-item>
</template>
<style lang="scss" scoped>
.n-collapse {
  height: 100%;
  display: flex;
  flex-direction: column;

  .n-collapse-item {
    width: 100%;
    background: #ffffff;
    border-radius: 15px;

    :deep .n-collapse-item__header {
      color: #293270;
      font-family: "PingFang-SC-Bold";
      font-weight: bold;
      font-size: 14px;
      height: 33px;
      margin: 0 10px;
      position: relative;
      padding: 0 0 0 16px;
      background-color: #f3f5ff;
      border-radius: 6px;

      .n-collapse-item__header-main {
        .n-collapse-item-arrow {
          position: absolute;
          right: 22px;
          top: 8px;
        }
      }
    }

    :deep .n-collapse-item__content-inner {
      padding: 0 25px 2px 25px;
    }
  }

  :deep .n-collapse-item.n-collapse-item--active {
    .n-collapse-item__header.n-collapse-item__header--active {
      .n-collapse-item-arrow {
        transform: rotate(180deg);
      }
    }
  }

  .n-collapse-item:not(:first-child) {
    border-top: 0px;
  }
}
</style>

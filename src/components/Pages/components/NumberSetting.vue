<template>
  <n-collapse-item title="指标" name="2">
    <div class="common-item">
      <div class="common-sub-title">文本样式</div>
    </div>
    <div class="common-item">
      <div class="common-double-space"></div>
      <div class="common-sub-title">文本</div>
      <el-input-number
        v-model="optionData.numberSize"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
      />
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="optionData.numberColor"
      >
        <template #label>
          <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
        </template>
      </n-color-picker>
    </div>
    <div class="common-item">
      <div class="common-double-space"></div>
      <div class="common-double-space"></div>
      <div class="common-double-space"></div>
      <div
        class="commmon-switch-self"
        @click="
          switchCommon(
            optionData,
            'numberFontWeight',
            numberFontWeightFlag.type ? 'normal' : 'bold',
            numberFontWeightFlag
          )
        "
        :class="{ commonActive: optionData.numberFontWeight === 'bold' }"
      >
        B
      </div>
      <div
        class="commmon-switch-self"
        :class="{ commonActive: optionData.numberFontStyle === 'oblique' }"
        @click="
          switchCommon(
            optionData,
            'numberFontStyle',
            numberFontStyleFlag.type ? 'normal' : 'oblique',
            numberFontStyleFlag
          )
        "
      >
        I
      </div>
    </div>
    <div class="common-item">
      <div class="common-double-space"></div>
      <div class="common-sub-title">间距</div>
      <el-input-number
        v-model="optionData.letterSpacing"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
      />
    </div>
    <div class="common-item">
      <n-checkbox v-model:checked="optionData.showSlot">显示图例</n-checkbox>
    </div>
    <div class="common-item">
      <div class="common-sub-title">前缀</div>
      <n-input
        class="common-input"
        placeholder=""
        round
        v-model:value="optionData.prefixText"
      >
      </n-input>
    </div>
    <div class="common-item">
      <div class="common-double-space"></div>
      <div class="common-sub-title">间距</div>
      <el-input-number
        v-model="optionData.prefixMargin"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
      />
    </div>
    <div class="common-item">
      <div class="common-sub-title">后缀</div>
      <n-input
        class="common-input"
        placeholder=""
        round
        v-model:value="optionData.suffixText"
      >
      </n-input>
    </div>
    <div class="common-item">
      <div class="common-double-space"></div>
      <div class="common-sub-title">间距</div>
      <el-input-number
        v-model="optionData.suffixMargin"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
      />
    </div>
    <div class="common-item">
      <div class="common-double-space"></div>
      <div class="common-sub-title">文本</div>
      <el-input-number
        v-model="optionData.slotSize"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
      />
      <n-color-picker
        class="common-color-picker"
        style="display: inline-block"
        v-model:value="optionData.slotColor"
      >
        <template #label>
          <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
        </template>
      </n-color-picker>
    </div>
    <div class="common-item">
      <div class="common-double-space"></div>
      <div class="common-double-space"></div>
      <div class="common-double-space"></div>
      <div
        class="commmon-switch-self"
        @click="
          switchCommon(
            optionData,
            'slotFontWeight',
            slotFontWeightFlag.type ? 'normal' : 'bold',
            slotFontWeightFlag
          )
        "
        :class="{ commonActive: optionData.slotFontWeight === 'bold' }"
      >
        B
      </div>
      <div
        class="commmon-switch-self"
        :class="{ commonActive: optionData.slotFontStyle === 'oblique' }"
        @click="
          switchCommon(
            optionData,
            'slotFontStyle',
            slotFontStyleFlag.type ? 'normal' : 'oblique',
            slotFontStyleFlag
          )
        "
      >
        I
      </div>
    </div>
    <div class="common-item">
      <div class="common-sub-title">动画时间</div>
      <el-input-number
        v-model="optionData.dur"
        class="common-number-input"
        :min="1"
        :max="44"
        controls-position="right"
        size="small"
      />
    </div>
    <template #arrow>
      <n-icon size="16" color="#869299">
        <chevron-up />
      </n-icon>
    </template>
  </n-collapse-item>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown, ChevronUp } from '@vicons/ionicons5';
import { ConfigItem } from '@/components/Pages/components';

const numberFontStyleFlag = ref({ type: false });
const numberFontWeightFlag = ref({ type: false });
const slotFontStyleFlag = ref({ type: false });
const slotFontWeightFlag = ref({ type: false });

const switchCommon = (
  target: any,
  key: string,
  form: string,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type = !depend.type;
};

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
});
</script>

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
      font-family: 'PingFang-SC-Bold';
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

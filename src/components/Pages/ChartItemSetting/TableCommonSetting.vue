<script setup lang="ts">
import { ref } from 'vue';
import { ChevronUp, ChevronDown } from '@vicons/ionicons5';
import { TextAlignCenter, TextAlignLeft, TextAlignRight } from '@vicons/carbon';
import { Coordinates } from '../components';

const props = defineProps({
  optionData: {
    type: Object,
    required: true,
  },
  attr: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    requeire: true,
  },
});

const tableFontStyleFlag = ref({ type: false });
const tableFontWeightFlag = ref({ type: false });
const headerFontStyleFlag = ref({ type: false });
const headerFontWeightFlag = ref({ type: false });

const switchCommon = (
  target: any,
  key: string,
  form: string,
  depend: { type: boolean }
) => {
  target[key] = form;
  depend.type = !depend.type;
};
</script>
<template>
  <n-collapse :default-expanded-names="['1', '2', '3', '4', '5', '6']">
    <coordinates :attr="props.attr"></coordinates>
    <n-collapse-item name="1" title="表格">
      <div class="common-item">
        <div class="common-sub-title">每页显示数</div>
        <n-input-number
          class="common-number-input"
          round
          :show-button="false"
          v-model:value="optionData.pageSize"
        >
        </n-input-number>
      </div>
      <div class="common-item">
        <div class="common-sub-title">背景颜色</div>
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="optionData.backgroundColor"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
      <div class="common-item">
        <n-checkbox v-model:checked="optionData.stripe">斑马纹</n-checkbox>
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="optionData.stripeColor"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
      <div class="common-item">
        <n-checkbox v-model:checked="optionData.border">外边框</n-checkbox>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <n-input-number
          class="common-number-input"
          round
          :show-button="false"
          v-model:value="optionData.borderHeight"
        >
          <template #suffix>px</template>
        </n-input-number>
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="optionData.borderColor"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
      <div class="common-item">
        <n-checkbox v-model:checked="optionData.splitLine">行分割线</n-checkbox>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <n-input-number
          class="common-number-input"
          round
          :show-button="false"
          v-model:value="optionData.splitLineHeight"
        >
          <template #suffix>px</template>
        </n-input-number>
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="optionData.splitLineColor"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">文本</div>
        <el-input-number
          v-model="optionData.fontSize"
          class="common-number-input"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
        />
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="optionData.fontColor"
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
              'fontWeight',
              tableFontWeightFlag.type ? 'normal' : 'bold',
              tableFontWeightFlag
            )
          "
          :class="{ commonActive: tableFontWeightFlag.type }"
        >
          B
        </div>
        <div
          class="commmon-switch-self"
          :class="{ commonActive: tableFontStyleFlag.type }"
          @click="
            switchCommon(
              optionData,
              'fontStyle',
              tableFontStyleFlag.type ? 'normal' : 'oblique',
              tableFontStyleFlag
            )
          "
        >
          I
        </div>
      </div>
      <div class="common-item">
        <div class="common-sub-title">对齐</div>
        <div class="common-double-space"></div>
        <n-radio-group v-model:value="optionData.tableAlign" name="radiogroup">
          <n-radio :value="'left'"
            ><n-icon :component="TextAlignLeft" size="14"></n-icon>
          </n-radio>
          <n-radio :value="'center'">
            <n-icon :component="TextAlignCenter" size="14"></n-icon
          ></n-radio>
          <n-radio :value="'right'"
            ><n-icon :component="TextAlignRight" size="14"></n-icon>
          </n-radio>
        </n-radio-group>
      </div>
      <div class="common-item">
        <n-checkbox v-model:checked="optionData.headerFlag"
          >显示表头</n-checkbox
        >
      </div>
      <div class="common-item">
        <div class="common-sub-title">背景颜色</div>
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="optionData.headerBackgroundColor"
        >
          <template #label>
            <n-icon :component="ChevronDown" size="12" color="#6B797F"></n-icon>
          </template>
        </n-color-picker>
      </div>
      <div class="common-item">
        <div class="common-double-space"></div>
        <div class="common-sub-title">文本</div>
        <el-input-number
          v-model="optionData.headerFontSize"
          class="common-number-input"
          :min="1"
          :max="44"
          controls-position="right"
          size="small"
        />
        <n-color-picker
          class="common-color-picker"
          style="display: inline-block"
          v-model:value="optionData.headerFontColor"
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
              'headerFontWeight',
              headerFontWeightFlag.type ? 'normal' : 'bold',
              headerFontWeightFlag
            )
          "
          :class="{ commonActive: headerFontWeightFlag.type }"
        >
          B
        </div>
        <div
          class="commmon-switch-self"
          :class="{ commonActive: headerFontStyleFlag.type }"
          @click="
            switchCommon(
              optionData,
              'headerFontStyle',
              headerFontStyleFlag.type ? 'normal' : 'oblique',
              headerFontStyleFlag
            )
          "
        >
          I
        </div>
      </div>
      <template #arrow>
        <n-icon size="16" color="#869299">
          <chevron-up />
        </n-icon>
      </template>
    </n-collapse-item>
    <n-collapse-item name="2" title="序列号">
      <div class="common-item">
        <n-checkbox v-model:checked="optionData.indexColumn"
          >显示序列号</n-checkbox
        >
      </div>
      <div class="common-item">
        <div class="common-sub-title">标题</div>
        <el-input
          v-model="optionData.indexColumnLabel"
          class="common-input"
          size="small"
        />
      </div>
      <div class="common-item">
        <div class="common-sub-title">列宽</div>
        <el-input-number
          v-model="optionData.indexColumnWidth"
          class="common-number-input"
          :min="0"
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
    <slot></slot>
  </n-collapse>
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

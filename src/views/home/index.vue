<template>
  <van-field
    v-model="fieldValue"
    is-link
    label="城市"
    placeholder="选择城市"
    readonly
    @click="showPicker = true"
  />
  <van-popup v-model:show="showPicker" position="bottom" round>
    <van-picker
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 城市选项（对象数组，包含 text 和 value）
const columns = [
  { text: "杭州", value: "Hangzhou" },
  { text: "宁波", value: "Ningbo" },
  { text: "温州", value: "Wenzhou" },
  { text: "绍兴", value: "Shaoxing" },
  { text: "湖州", value: "Huzhou" }
];

// 选中的城市名（显示在 Field 中）
const fieldValue = ref("");

// 控制弹出层
const showPicker = ref(false);

// 默认高亮哪一项
const defaultIndex = ref(0);

const onConfirm = (value: { selectedOptions: any[] }) => {
  showPicker.value = false;
  fieldValue.value = value.selectedOptions[0].text;
};
</script>

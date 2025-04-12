<script lang="ts" setup>
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import { ref } from "vue";
import { setLocale } from "@/locales";
import { useRouter } from "vue-router";

const router = useRouter();
const onClickDarkMode = () => {
  useToggleDarkMode();
};

const showPopover = ref(false);
const langOptions = [
  { text: "简体中文", key: "zh-cn" },
  { text: "English", key: "en" }
];
const onSelectLang = action => {
  setLocale(action.key);
};
</script>

<template>
  <van-nav-bar fixed left-arrow placeholder @click-left="router.back()">
    <template #right>
      <van-popover
        v-model:show="showPopover"
        :actions="langOptions"
        placement="bottom-end"
        @select="onSelectLang"
      >
        <template #reference>
          <svg-icon class="text-[18px] mr-[12px]" name="lang" />
        </template>
      </van-popover>

      <svg-icon
        :name="useDarkMode() ? 'light' : 'dark'"
        class="text-[18px]"
        @click="onClickDarkMode"
      />
    </template>
  </van-nav-bar>
</template>

<style lang="less" scoped></style>

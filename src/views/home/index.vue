<script lang="ts" name="Demo" setup>
import { ref, watch } from "vue";
import { $locale, $t } from "@/locales";

const list = ref<string[]>([]);

const updateList = () => {
  list.value = [
    `✔ ⚡ ${$t("home.details.vue3")}`,
    `✔ 🍕 ${$t("home.details.typescript")}`,
    `✔ ✨ ${$t("home.details.vant")}`,
    `✔ 🌀 ${$t("home.details.tailwindcss")}`,
    `✔ 🍍 ${$t("home.details.pinia")}`,
    `✔ 🌓 ${$t("home.details.darkmode")}`,
    `✔ 🧀 ${$t("home.details.i18n")}`,
    `✔ ${$t("home.details.router")}`,
    `✔ ${$t("home.details.icon")}`,
    `✔ ${$t("home.details.vw")}`,
    `✔ ${$t("home.details.axios")}`,
    `✔ ${$t("home.details.gzip")}`,
    `✔ ${$t("home.details.mock")}`,
    `✔ ${$t("home.details.eslint")}`,
    `✔ ${$t("home.details.loading")}`,
    `✔ ${$t("home.details.eruda")}`
  ];
};
updateList();
// 监听语言变化，更新列表
watch(() => $locale.value, updateList);
</script>

<template>
  <div class="demo-content px-[12px]">
    <img
      alt="Vue logo"
      class="block w-[120px] mx-auto mb-[20px] pt-[30px]"
      src="~@/assets/logo_melomini.png"
    />
    <div class="pl-[12px] border-l-[3px] border-[color:#41b883]">
      <a
        class="flex items-center"
        href="https://github.com/yulimchen/vue3-h5-template"
        target="_blank"
      >
        <svg-icon class="text-[20px] mr-[8px]" name="github" />
        <h3 class="font-bold text-[18px] my-[4px]">Vue3-h5-template</h3>
        <svg-icon class="text-[12px] ml-[5px]" name="link" />
      </a>
    </div>
    <div
      class="text-[14px] py-[2px] px-[10px] rounded-[4px] bg-[var(--color-block-background)] mt-[14px]"
    >
      <p class="my-[14px] leading-[24px]">🌱 {{ $t("home.description") }}</p>
    </div>

    <div class="demo-main">
      <van-cell v-for="(item, idx) in list" :key="idx" :title="item" />
    </div>
  </div>
</template>

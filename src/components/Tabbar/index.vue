<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { $t } from "@/locales";

const active = ref(0);
// 使用 computed 保持视图实时更新
const tabbarData = reactive([
  {
    icon: "wap-home-o",
    title: computed(() => $t("home.tabbar.home")),
    to: {
      name: "Home"
    }
  },
  {
    icon: "gem-o",
    title: computed(() => $t("home.tabbar.audit")),
    to: {
      name: "Audit"
    }
  },
  {
    icon: "gem-o",
    title: computed(() => $t("home.tabbar.finding")),
    to: {
      name: "Finding"
    }
  },
  {
    icon: "user-o",
    title: computed(() => $t("home.tabbar.about")),
    to: {
      name: "About"
    }
  }
]);
</script>

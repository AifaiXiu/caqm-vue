<script lang="ts" name="About" setup>
import { $t } from "@/locales";
import { useRouter } from "vue-router";

const router = useRouter();
const goToPage = url => {
  console.log(url);
  router.push(url);
};
</script>

<template>
  <div class="userinfo">
    <van-image
      fit="fill"
      height="100"
      position="center"
      round
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      width="100"
    />
    <div class="userinfo" style="align-items: flex-start; margin-top: 10px">
      <div>{{ $t("home.about.username") }}：aihua</div>
      <div>{{ $t("home.about.role") }}：管理员</div>
    </div>
  </div>
  <van-cell-group>
    <van-cell :title="$t('home.about.changepwd')" is-link />
    <van-cell
      :title="$t('home.about.dataitem')"
      is-link
      @click="goToPage('/about_layout/dataitem')"
    />
    <van-cell
      :title="$t('home.about.user')"
      is-link
      @click="goToPage('/about_layout/user')"
    />
    <van-cell
      :title="$t('home.about.company')"
      is-link
      @click="goToPage('/about_layout/company')"
    />
    <van-cell
      :title="$t('home.about.file')"
      is-link
      @click="goToPage('/about_layout/file')"
    />
  </van-cell-group>
  <router-view />
</template>
<style lang="less" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;

  .userdetail {
  }
}
</style>

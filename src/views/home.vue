<template>
  <div class="home">
    <marquee behavior="alternate" class="store-name"
      >欢迎来到{{ storeName }}</marquee
    >
    <div class="wrapper">
      <div class="square one">
        <img src="../assets/images/swiper/1.png" alt="" />
      </div>
      <div class="square two">
        <img src="../assets/images/swiper/2.jpg" alt="" />
      </div>
      <div class="square three">
        <img src="../assets/images/swiper/4.png" alt="" />
      </div>
      <div class="square four">
        <img src="../assets/images/swiper/5.png" alt="" />
      </div>
      <div class="square five">
        <img src="../assets/images/swiper/6.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { findStoreInfo } from "../apis";
export default {
  data() {
    return {
      storeName : '',
    };
  },
  methods: {
    async fetchStoreInfo() {
      const resp = await findStoreInfo();
      console.log(resp);
      this.storeName = resp.data.rows[0].store_name;
    },
  },
  created() {
    this.fetchStoreInfo();
  },
};
</script>

<style lang="less">
@import "../assets/css/pages/home.less";

.store-name {
  color: #fff;
  margin-top: 18px;
  font-size: 60px;
  text-shadow: 1px 1px 10px #0af;
}
</style>

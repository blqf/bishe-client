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
import { HOST } from "../host-config";
export default {
  data() {
    return {
      storeName: "",
      imgUrl: "",
      host: HOST,
    };
  },
  methods: {
    async fetchStoreInfo() {
      const resp = await findStoreInfo();
      this.storeName = resp.data.rows[0].store_name;
      console.log(resp.data.rows[0].store_img_url);
      this.imgUrl = resp.data.rows[0].store_img_url;
    },
  },
  created() {
    this.fetchStoreInfo();
  },
};
</script>

<style lang="less">
@item-width: 300px; //元素的宽度
@item-height: 300px; //元素的高度
@item-translate: 600px; //元素距中心的距离
@wrapper-translate: -1000px; //盒子向里移动的距离

.home {
  perspective: 800px;
  transform-style: preserve-3d;
  .store-name {
    color: #fff;
    margin-top: 18px;
    font-size: 60px;
    text-shadow: 1px 1px 10px #0af;
  }
  .wrapper {
    width: @item-width;
    height: @item-height;
    margin: 100px auto 0;
    transform: translate3d(100px, 100px, @wrapper-translate);
    transform-style: preserve-3d;
    color: #fff;
    animation: xuanzhuan 15s 0s linear infinite;
    .square {
      position: absolute;
      left: 0;
      top: 0;
      width: @item-width;
      height: @item-height;
      border: 2px solid #0af;
      box-sizing: border-box;
      opacity: 0.6;
      box-shadow: 0 0 10px #0af, 0 0 15px #0af, 0 0 15px #0af;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .one {
      transform: rotateY(calc(360deg / 5 * 0)) translateZ(@item-translate);
    }
    .two {
      transform: rotateY(calc(360deg / 5 * 1)) translateZ(@item-translate);
    }
    .three {
      transform: rotateY(calc(360deg / 5 * 2)) translateZ(@item-translate);
    }
    .four {
      transform: rotateY(calc(360deg / 5 * 3)) translateZ(@item-translate);
    }
    .five {
      transform: rotateY(calc(360deg / 5 * 4)) translateZ(@item-translate);
    }
  }
  @keyframes xuanzhuan {
    0% {
      transform: translate3d(-50%, 10%, @wrapper-translate) rotateY(0);
    }
    100% {
      transform: translate3d(-50%, 10%, @wrapper-translate) rotateY(360deg);
    }
  }
}
</style>

<template>
  <div class="clothing-detail-container">
    <img class="clothing-img" :src="clothingInfo.imgUrl" />
    <div class="clothing-info-wrapper">
      <span class="clothing-description">
        {{ clothingInfo.description }}
      </span>
      <div class="clothing-info">
        优惠价：<span class="clothing-price">{{ "￥" + clothingInfo.price }}</span>
      </div>
      <div class="clothing-info">尺码：{{ clothingInfo.size }}</div>
      <div class="clothing-info">颜色：{{ clothingInfo.color }}</div>
      <el-button type="success" class="add-shopping-cart">加入购物车</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clothingInfo: {},
    };
  },
  created() {
    this.clothingInfo = this.$route.query;
  },
};
</script>

<style>
.clothing-detail-container {
  display: flex;
  padding: 18px;
  color: #fff;
}

.clothing-img {
  width: 260px;
  object-fit: cover;
}

.clothing-info-wrapper {
  margin-left: 30px;
}

.clothing-description {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}

.clothing-info {
  margin-top: 18px;
  background-color: rgba(102, 102, 102, 0.5);
  padding: 10px;
}

.add-shopping-cart {
  margin-top: 18px;
}

.clothing-price {
  font-size: 20px;
  color: #e4393c;
}
</style>

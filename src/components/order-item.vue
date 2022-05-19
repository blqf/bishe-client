<template>
  <div class="order-item-container">
    <img class="order-item-img" :src="clothesInfo.imgUrl" />
    <div class="right-content">
      <div class="order-item-description order-item-info">
        服装名字：{{ clothesInfo.goods_name }}
      </div>
      <div class="order-item-description order-item-info">
        简介：{{ clothesInfo.description }}
      </div>
      <div class="order-item-info">颜色：{{ clothesInfo.color }}</div>
      <div class="order-item-info">尺码：{{ clothesInfo.size }}</div>
      <div class="order-item-price">￥{{ clothesInfo.price }}</div>
    </div>
    <div class="btn-wrapper">
      <el-button
        class="delete-btn"
        type="danger"
        icon="el-icon-delete"
        circle
        @click="handleDelete"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["clothesInfo"],
  methods: {
    handleDelete() {
      this.$emit('deleteClothes', this.clothesInfo)
    }
  },
};
</script>

<style scoped>
.order-item-container {
  background-color: #fff;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.order-item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
}
.right-content {
  margin-left: 18px;
}
.order-item-info {
  margin-top: 8px;
  font-size: 14px;
  color: #000;
  line-height: 16px;
}
.order-item-price {
  font-size: 20px;
  color: #e4393c;
  margin-top: 8px;
}
.btn-wrapper {
  display: flex;
  flex-direction: row-reverse;
  flex-grow: 1;
}
.delete-btn {
  margin-right: 18px;
}
</style>

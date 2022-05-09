<template>
  <div class="card-container">
    <img class="card-img" :src="imgUrl" />
    <div class="price">￥{{ price }}</div>
    <div class="description">【{{size}}】【{{color}}】{{ description }}</div>
  </div>
</template>

<script>
export default {
  props: ["size",'color', "imgUrl", "price", "description"]
};
</script>

<style>
.card-container {
  width: 220px;
  background-color: #fff;
  padding: 8px;
  border-radius: 8px;
}
.card-img {
  width: 220px;
  height: 220px;
  object-fit: cover;
  cursor: pointer;
}
.price {
  font-size: 20px;
  color: #e4393c;
  margin-top: 8px;
}
.description {
  margin-top: 8px;
  font-size: 12px;
  color: #000;
  line-height: 16px;
}
</style>

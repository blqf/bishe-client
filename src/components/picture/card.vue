<template>
  <div class="card-container">
    <img class="card-img" :src="imgUrl" @click="handleClickImg" />
    <div class="name">{{ name }}</div>
    <div class="price">￥{{ price }}</div>
    <div class="description">
      【{{ size }}】【{{ color }}】{{ description }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', "size", "color", "imgUrl", "price", "description"],
  methods: {
    handleClickImg() {
      this.$emit(
        "handleClickImg",
        {
          size: this.size,
          color: this.color,
          imgUrl: this.imgUrl,
          price: this.price,
          description: this.description,
          id: this.id,
          goods_name: this.name
        }
      );
    },
  },
};
</script>

<style scoped>
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
.name {
  color: #000;
  margin-top: 8px;
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

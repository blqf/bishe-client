<template>
  <div class="clothing-mall-container">
    <span>尺寸：</span>
    <el-select v-model="selectedSize" placeholder="请选择尺寸">
      <el-option
        v-for="item in sizeList"
        :key="item.id"
        :label="item.size"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <span class="clothes-color">颜色：</span>
    <el-select v-model="selectedColor" placeholder="请选择颜色">
      <el-option
        v-for="item in colorList"
        :key="item.id"
        :label="item.color"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-button type="primary" class="search-btn" @click="handleSearchGoods"
      >搜索</el-button
    >
    <el-button
      type="primary"
      icon="el-icon-refresh"
      circle
      @click="handleResetSearchOption"
    ></el-button>
    <div v-if="clothesList.length === 0" class="tip-text">
      {{ tipText }}
    </div>
    <div class="clothing-mall-wrapper">
      <card-cmp
        v-for="(clothes, index) in clothesList"
        :key="index"
        :imgUrl="
          clothes.goods_img_url.includes('http://') ||
          clothes.goods_img_url.includes('https://')
            ? clothes.goods_img_url
            : serverUrl + clothes.goods_img_url
        "
        :price="clothes.goods_price"
        :description="clothes.goods_description"
        :size="clothes.size"
        :color="clothes.color"
        @handleClickImg="handleClickImg"
      />
    </div>
  </div>
</template>

<script>
import cardCmp from "../components/picture/card.vue";
import { findGoodsList, findAllSize, findAllColors } from "../apis";
import { SERVER_URL } from "../config";
export default {
  components: {
    cardCmp,
  },
  data() {
    return {
      clothesList: [],
      sizeList: [],
      colorList: [],
      selectedSize: "",
      selectedColor: "",
      tipText: "",
      serverUrl: SERVER_URL,
    };
  },
  methods: {
    async fetchGoodsList() {
      try {
        const loading = this.$loading({
          lock: true,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        const resp = await findGoodsList(
          0,
          0,
          this.selectedSize,
          this.selectedColor
        );
        this.clothesList = resp.rows;
        if (resp.rows.length === 0) {
          this.tipText = "暂时没有符合条件的服装";
        } else {
          this.tipText = "";
        }
        loading.close();
      } catch (err) {
        console.log(err, "请求服装列表出错");
      }
    },
    async fetchSizeList() {
      const resp = await findAllSize();
      this.sizeList = resp.data.rows;
    },
    async fetchColorList() {
      const resp = await findAllColors();
      this.colorList = resp.data.rows;
    },
    handleSearchGoods() {
      this.fetchGoodsList();
    },
    handleResetSearchOption() {
      if (this.selectedSize === "" && this.selectedColor === "") {
        return;
      }
      this.selectedSize = "";
      this.selectedColor = "";
      this.fetchGoodsList();
    },
    handleClickImg(clothingInfo) {
      this.$router.push({
        name: "clothing-detail",
        query: clothingInfo,
      });
    },
  },
  created() {
    this.fetchGoodsList();
    this.fetchSizeList();
    this.fetchColorList();
  },
};
</script>

<style lang="less" scoped>
.card-container {
  margin: 0 24px 18px 0;
}

.clothing-mall-container {
  padding: 18px 24px 0;
  color: #fff;
}

.clothing-mall-wrapper {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
}

.clothes-color {
  margin-left: 18px;
}

.search-btn {
  margin-left: 18px;
}

.tip-text {
  margin-top: 100px;
  flex-grow: 1;
  text-align: center;
}
</style>

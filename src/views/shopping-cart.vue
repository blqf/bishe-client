<template>
  <div class="shopping-cart-container">
    <div class="confirm-order-wrapper">
      <div class="total-price">
        总价：<span class="total-price-num">{{ totalPrice }}元</span>
      </div>
      <el-button
        class="confirm-buy-btn"
        type="primary"
        @click="handleSubmitOrder"
      >
        提交订单
      </el-button>
      <el-button
        class="confirm-buy-btn"
        type="primary"
        @click="handleClearCart"
      >
        清空购物车
      </el-button>
    </div>
    <div class="shopping-cart-list">
      <OrderItem
        v-for="(item, index) in selectedClothesList"
        :key="index"
        :clothesInfo="item"
        @deleteClothes="handleDeleteClothes"
      />
    </div>
    <!-- 弹出框 -->
    <el-dialog title="请填写收货信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货地址" label-width="80px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="80px">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfimBuyClothes">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OrderItem from "../components/order-item.vue";
import { addOrder } from "../apis";
export default {
  components: {
    OrderItem,
  },
  data() {
    return {
      selectedClothesList: [],
      totalPrice: 0,
      dialogFormVisible: false,
      form: {
        address: "",
        phone: "",
      },
    };
  },
  methods: {
    async createOrder() {
      try {
        const resp = await addOrder({
          selectedClothesList: this.selectedClothesList,
          form: this.form,
        });
        if (resp.code === 0) {
          this.$message({
            message: "购买成功",
            type: "success",
            showClose: true,
          });
          this.dialogFormVisible = false;
          this.$store.commit("shoppingCart/clearClothes");
          this.selectedClothesList = [];
          this.totalPrice = 0;
        } else {
          this.$message({
            message: "购买失败，请稍后重试",
            type: "error",
            showClose: true,
          });
        }
      } catch (err) {
        this.$message({
          message: "购买失败，请稍后重试",
          type: "error",
          showClose: true,
        });
      }
    },
    handleSubmitOrder() {
      if (this.selectedClothesList.length === 0) {
        this.$message({
          message: "你还没有添加商品哦！",
          type: "warning",
          showClose: true,
        });
        return;
      }
      this.dialogFormVisible = true;
    },
    handleConfimBuyClothes() {
      if (!this.form.address || !this.form.phone) {
        this.$message({
          message: "请把信息填写完整哦！",
          type: "warning",
          showClose: true,
        });
        return;
      }
      if (this.form.phone.toString().length !== 11) {
        this.$message({
          message: "请填写合法的联系方式哦！",
          type: "warning",
          showClose: true,
        });
        return;
      }
      this.createOrder();
    },
    handleClearCart() {
      this.$store.commit("shoppingCart/clearClothes");
      this.selectedClothesList = [];
      this.totalPrice = 0;
    },
    handleDeleteClothes(clothesInfo) {
      this.$store.commit("shoppingCart/removeClothes", clothesInfo.id);
      this.totalPrice = 0;
      this.selectedClothesList = this.$store.state.shoppingCart.selectedClothes;
      for (let i = 0; i < this.selectedClothesList.length; i++) {
        this.totalPrice += this.selectedClothesList[i].price;
      }
    },
  },
  created() {
    this.selectedClothesList = this.$store.state.shoppingCart.selectedClothes;
    for (let i = 0; i < this.selectedClothesList.length; i++) {
      this.totalPrice += this.selectedClothesList[i].price;
    }
  },
};
</script>

<style lang="less" scoped>
.order-item-container {
  margin-top: 18px;
}

.shopping-cart-container {
  padding: 18px;
}

.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 100px;
  height: 100px;
  background-color: #0af;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 200px;
  box-shadow: 0 0 20px #0af;
}
.to-register {
  margin-left: 100px;
}

.confirm-order-wrapper {
  display: flex;
}

.total-price {
  color: #fff;
  font-size: 20px;
  background-color: rgba(0, 170, 255, 0.5);
  padding: 8px;
}

.total-price-num {
  color: #e1251b;
}

.confirm-buy-btn {
  margin-left: 18px;
}
</style>

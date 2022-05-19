<template>
  <div class="my-order-container">
    <el-collapse accordion class="el-collapse">
      <el-collapse-item title="配送中" name="1" class="el-collapse-item">
        <div
          class="my-order-item"
          v-for="(item, index) in orderList"
          :key="index"
        >
          <img class="order-item-img" :src="item.goods_img_url" />
          <div class="right-content">
            <div class="goods-name">
              {{ item.goods_name }}
            </div>
            <div class="order-item-description order-item-info">
              {{ item.goods_description }}
            </div>
            <div class="order-item-price">￥{{ item.goods_price }}</div>
            <div class="btns">
              <el-button type="danger" @click="handleDeleteOrder(item)">
                删除
              </el-button>
              <el-button
                type="success"
                class="finish-btn"
                @click="handleFinishOrder(item)"
              >
                完成
              </el-button>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="已完成" name="2" class="el-collapse-item">
        <div
          class="my-order-item"
          v-for="(item, index) in finishOrderList"
          :key="index"
        >
          <img class="order-item-img" :src="item.goods_img_url" />
          <div class="right-content">
            <div class="goods-name">
              {{ item.goods_name }}
            </div>
            <div class="order-item-description order-item-info">
              {{ item.goods_description }}
            </div>
            <div class="order-item-price">￥{{ item.goods_price }}</div>
            <div class="btns">
              <el-button type="primary" @click="handleComment(item)">
                评论
              </el-button>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog title="收货地址" :visible="dialogFormVisible">
      <el-form>
        <el-form-item label="评论内容" label-width="100px">
          <el-input
            v-model="commentContent"
            autocomplete="off"
            type="textarea"
            placeholder="在这里输入评论内容哦"
          ></el-input>
        </el-form-item>
        <el-form-item label="评论星级" label-width="100px">
          <el-select v-model="commentLevel" placeholder="评论星级">
            <el-option
              v-for="level in 5"
              :key="level"
              :label="level"
              :value="level"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmComment">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {
  findUserOrderList,
  finishCurrentOrderById,
  deleteOrderById,
  findFinishOrderList,
  addComment,
} from "../apis";
import OrderItem from "../components/order-item.vue";
export default {
  components: {
    OrderItem,
  },
  data() {
    return {
      orderList: [],
      finishOrderList: [],
      commentContent: "",
      commentLevel: 1,
      dialogFormVisible: false,
      commentGoodId: "",
    };
  },
  methods: {
    async fetchOrderList() {
      const resp = await findUserOrderList(this.$store.state.userInfo.userId);
      this.orderList = resp.rows;
    },
    async fetchFinishOrderList() {
      const resp = await findFinishOrderList(this.$store.state.userInfo.userId);
      this.finishOrderList = resp.rows;
    },
    handleFinishOrder(item) {
      this.$confirm("确认完成该订单吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const {
            id,
            user_id,
            goodId,
            user_name,
            user_sex,
            user_birthday,
          } = item;
          finishCurrentOrderById(id, {
            user_id,
            goodId,
            user_name,
            user_sex,
            user_birthday: dayjs(user_birthday).valueOf(),
            sale_time: dayjs(new Date()).valueOf(),
          }).then((resp) => {
            if (resp.code === 0) {
              this.fetchOrderList();
              this.$message({
                type: "success",
                message: "订单已完成",
              });
            }
          });
        })
        .catch((_) => {});
    },
    handleDeleteOrder(item) {
      this.$confirm("确认删除该订单吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const { id } = item;
          deleteOrderById(id).then((resp) => {
            if (resp.code === 0) {
              this.fetchOrderList();
              this.$message({
                type: "success",
                message: "删除订单成功",
              });
            }
          });
        })
        .catch((_) => {});
    },
    handleComment(item) {
      this.commentGoodId = item.goodId;
      this.dialogFormVisible = true;
    },
    async handleConfirmComment() {
      const resp = await addComment({
        comment_content: this.commentContent,
        comment_level: +this.commentLevel,
        goodId: this.commentGoodId,
        userId: this.$store.state.userInfo.userId,
        comment_date_time: dayjs().valueOf(),
      });
      if (resp.code === 0) {
        this.$message({
          type: "success",
          message: "评论成功",
        });
      } else {
        this.$message({
          type: "error",
          message: "评论失败，请重试",
        });
      }
      this.dialogFormVisible = false;
    },
  },
  created() {
    this.fetchOrderList();
    this.fetchFinishOrderList();
  },
};
</script>

<style lang="less" scoped>
.my-order-container {
  padding: 18px;
  .el-collapse {
    .my-order-item {
      margin-top: 18px;
      background-color: #fff;
      padding: 8px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      margin-bottom: 18px;
      .order-item-img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        cursor: pointer;
      }
      .right-content {
        margin-left: 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        .goods-name {
          font-size: 20px;
          font-weight: 700;
        }
        .order-item-info {
          font-size: 14px;
          color: #000;
          line-height: 16px;
          margin-top: 8px;
        }
        .order-item-price {
          font-size: 20px;
          color: #e4393c;
        }
        .btns {
          display: flex;
          margin-top: 8px;
          flex-direction: row-reverse;
          .finish-btn {
            margin-right: 18px;
          }
        }
      }
    }
  }
}
</style>

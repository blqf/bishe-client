<template>
  <!-- 默认布局,上中 -->
  <div class="default">
    <el-container>
      <el-header height="">
        <img src="../assets/images/logo.jpg" alt="logo" />
        <ul class="nav-list">
          <li v-for="(item, index) in navList" :key="index">
            <router-link class="nav-title" :to="{ name: item.name }">{{
              item.title
            }}</router-link>
          </li>
          <li class="user-info">
            <el-avatar
              class="avatar"
              size="medium"
              :src="this.$store.state.userInfo.avatar"
            ></el-avatar>
            <div class="username">
              {{ this.$store.state.userInfo.username }}
            </div>
          </li>
        </ul>
      </el-header>

      <el-main class="main">
        <keep-alive>
          <router-view v-if="needKeepActive.includes($route.name)" />
        </keep-alive>
        <router-view v-if="!needKeepActive.includes($route.name)" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: "首页",
          name: "home",
        },
        {
          title: "服装商城",
          name: "clothing-mall",
        },
        {
          title: "购物车",
          name: "shopping-cart",
        },
        {
          title: "我的订单",
          name: "my-order",
        },

        {
          title: "我的",
          name: "about",
        },
      ],
      needKeepActive: ["article"],
      avatar: "",
      username: "",
    };
  },
  mounted() {
    this.username = this.$store.state.userInfo.username;
    this.avatar = this.$store.state.userInfo.avatar;
  },
};
</script>

<style lang="less" scoped>
@header-height: 50px;

/* init */
a {
  color: inherit;
  text-decoration: none;
}

/* header */
header {
  width: 100%;
  height: @header-height;
  background: rgba(102, 102, 102, 0.5);
  position: sticky;
  top: 0;
  z-index: 10;
  animation: slide-down 1s 0s linear;
  img {
    width: 50px;
    height: 50px;
    margin-left: 100px;
    user-select: none;
    animation: swing 3s 0s linear infinite;
  }
  @keyframes swing {
    0% {
      transform: rotateZ(0);
    }
    25% {
      transform: rotateZ(20deg);
    }
    50% {
      transform: rotateZ(0deg);
    }
    75% {
      transform: rotateZ(-20deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
  span {
    color: #fff;
    display: inline-block;
    margin-left: 10px;
    line-height: 50px;
  }
  .nav-list {
    float: right;
    color: #fff;
    margin-right: 25px;
    font-size: 14px;
    li {
      float: left;
      line-height: @header-height;
      cursor: pointer;
      transition: 100ms linear;
      border-radius: 10px;
      user-select: none;
      color: #fff;
      .nav-title {
        display: block;
        padding: 0 30px;
      }
    }
    li:hover {
      color: #0fa;
      text-shadow: 0 0 10px #0af;
    }
    // li.active{
    //   color: #0af;
    //   text-shadow: 0 0 10px #0af;
    // }
  }
}

/* main */
.main {
  padding: 0;
  overflow: unset;
}

/* footer */
footer {
  width: 100%;
  height: 50px;
  p {
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
  }
  p::selection {
    background-color: rgba(0, 255, 255, 0.2);
  }
}

.user-info {
  display: flex;
  align-items: center;
  cursor: default !important;
}

.user-info:hover {
  color: #fff !important;
}

.avatar {
  cursor: default;
}

.avatar:hover {
  color: #fff;
}

.username {
  margin-left: 8px;
  cursor: default;
}

.username:hover {
  color: #fff;
}
</style>

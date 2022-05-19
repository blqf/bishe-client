import JsCookie from "js-cookie";
import NProgress from "nprogress"; // progress bar
import router from "./router";
import store from "./store";
import { whoami } from "./apis";
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: true }); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const token = JsCookie.get("authorization");
  const userId = store.state.userInfo.userId;

  if (userId) {
    if (to.path === "/login") {
      next("/home");
    } else {
      next();
    }
    NProgress.done();
  } else {
    if (token) {
      const data = await whoami(token);
      console.log(data, "whoami");
      if (data.code === 0) {
        store.commit("userInfo/setUserInfo", {
          userId: data.data.id,
          username: data.data.username,
          avatar: data.data.avatar,
        });
        if (to.path === "/login") {
          next("/home");
        } else {
          next();
        }
      } else {
        JsCookie.remove("authorization");
        if (to.meta.auth) {
          next("/login");
        } else {
          next();
        }
      }
    } else {
      if (to.meta.auth) {
        next("/login");
      } else {
        next();
      }
    }
  }
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});

import Vue from "vue";
import Vuex from "vuex";
import { userInfo } from "./user-info";
import { shoppingCart } from "./shopping-cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userInfo,
    shoppingCart,
  },
});

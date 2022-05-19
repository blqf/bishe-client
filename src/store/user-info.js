export const userInfo = {
  namespaced: true,
  state: () => ({
    userId: "",
    username: "未登录",
    avatar:
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  }),
  mutations: {
    setUserInfo(state, payload) {
      state.userId = payload.userId;
      state.username = payload.username;
      state.avatar = payload.avatar;
    },
    resetUserInfo(state, payload) {
      state.userId = "";
      state.username = "未登录";
      state.avatar =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    },
  },
};

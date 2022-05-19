export const shoppingCart = {
  namespaced: true,
  state: () => ({
    selectedClothes: [],
  }),
  mutations: {
    addClothes(state, payload) {
      state.selectedClothes.push(payload);
    },
    removeClothes(state, clothesId) {
      for (let i = 0; i < state.selectedClothes.length; i++) {
        if (state.selectedClothes[i].id === clothesId) {
          state.selectedClothes.splice(i, 1);
          break;
        }
      }
    },
    clearClothes(state) {
      state.selectedClothes = [];
    },
  },
};

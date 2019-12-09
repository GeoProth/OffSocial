const state = () => ({
  showSideNav: false
});
const mutations = {
  TOGGLE_SIDE_NAV(state) {
    state.showSideNav = !state.showSideNav;
  }
};
const actions = {
  toggleSideNav({ commit }, visible) {
    commit("TOGGLE_SIDE_NAV");
  }
};
const getters = {
  showSideNav: ({ showSideNav }) => showSideNav
};
export default {
  state,
  mutations,
  actions,
  getters
};

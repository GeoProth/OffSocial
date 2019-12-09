import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
/* eslint-disable no-useless-escape */
const validEmail = (str) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);

const state = () => ({
  isLoggedIn: false
});
const mutations = {
  SET_LOGGED_IN(state) {
    state.isLoggedIn = true;
  },
  SET_LOGGED_OUT(state) {
    state.isLoggedIn = false;
  }
};
const actions = {
  async login({ commit }, credentials) {
    const hashedCreds = {
      email: credentials.username,
      passhash: Base64.stringify(sha256(credentials.password + "DMDL"))
    };
    try {
      const response = await this.$axios.post(`${this.$env.api}/users/login`, hashedCreds);
      if (response.status === 200) {
        commit("SET_LOGGED_IN");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (e) {
      throw e;
    };
  },
  logout({ commit, rootGetters }) {
    if (rootGetters["layout/showSideNav"]) {
      commit("layout/TOGGLE_SIDE_NAV", null, { root: true });
    }
    commit("SET_LOGGED_OUT");
    commit("facebook/SET_FB_LOGOUT", null, { root: true });

    this.$router.push("/");
  },
  async createUser({ commit }, payload) {
    if (!validEmail(payload.email)) {
      throw new Error("Please enter a valid email");
    }
    const passhash = Base64.stringify(sha256(payload.password + "DMDL"));
    let response;
    try {
      response = await this.$axios.post(`${this.$env.api}/users`, {
        email: payload.email,
        passhash
      });
      return response;
    } catch (e) {
      throw new Error("Something went wrong trying to create your account");
    }
  },
  async resetPassword({ commit }, payload) {
    if (!validEmail(payload.email)) {
      throw new Error("Please enter a valid email");
    }
    try {
      const response = await this.$axios.post(`${this.$env.api}/users/reset-password`, { email: payload.email });
      return response;
    } catch (e) {
      throw new Error("Something went wrong trying to reset your password");
    }
  },
  /* eslint-disable */
  async finishResetPassword(context, payload) {
    try {
      const response = await this.$axios.post(`${this.$env.api}/users/reset-password/${encodeURIComponent(payload.resetCode)}`, {
        email: payload.email,
        passhash: Base64.stringify(sha256(payload.password))
      });
      return response;
    } catch (e) {
      throw new Error('Something went wrong trying to reset your password');
    };
  }
};
const getters = {
  isLoggedIn: ({ isLoggedIn }) => isLoggedIn
};
export default {
  state,
  mutations,
  actions,
  getters
};

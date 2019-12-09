/* eslint-disable */
import axios from "axios";

const state = () => ({
  FB: {},
  UserInfo: {},
  UserEvents: [],
  albumsApi: {},
  albums: [],
  loggedIn: false,
  grams: []
});
const mutations = {
  SET_FB_API(state, api) {
    state.FB = api;
  },
  SET_USER_INFO(state, user) {
    state.UserInfo = user;
  },
  SET_USER_EVENTS(state, payload) {
    state.UserEvents = payload;
  },
  SET_ALBUMS(state, albums) {
    state.albums = albums;
  },
  SET_FB_LOGIN(state) {
    state.loggedIn = true;
  },
  SET_FB_LOGOUT(state) {
    state.loggedIn = false;
  },
  SET_GRAMS(state, grams) {
    state.grams = grams;
  }
};
const actions = {
  setSDK({ commit }, fbSDK) {
    commit("SET_FB_API", fbSDK);
  },
  async getUserInfo({ commit }) {
    /* eslint-disable no-console */
    await window.FB.api(
      "/me",
      "GET",
      { fields: "name, id, first_name, last_name, picture, email" },
      user => {
        console.log("User info: ", user);
        commit("SET_USER_INFO", user);
      }
    );
  },
  async getEvents({ commit }) {
    await window.FB.api(
      "/me/events",
      { fields: "name, place, description, start_time, end_time, rsvp_status" },
      response => {
        commit("SET_USER_EVENTS", response);
      }
    );
  },
  async getGrams({ commit }) {
    /* eslint-disable no-console */
    const {
      data: { data }
    } = await axios.get(
      "https://api.instagram.com/v1/users/self/media/recent/?",
      {
        params: {
          access_token: "AccessTokenHERE"
        }
      }
    );
    console.log("response instagram: ", data);

    const grams = data;
    commit("SET_GRAMS", grams);
  },
  async getAlbums({ commit }) {
    await window.FB.api(
      `me?fields=albums.fields(id,count,name,cover_photo.fields(id,name,source,picture),photos.fields(name,picture,source))`,
      response => {
        const albums = response.albums.data.map(album => ({
          count: album.count,
          cover_photo: album.cover_photo.source,
          id: album.id,
          name: album.name,
          photos: album.photos.data
        }));
        commit("SET_ALBUMS", albums);
      }
    );
    // commit('SET_ALBUMS', response.albums.data.map(album => { album.cover_photo = album.cover_photo.picture; }));
  },
  setUserLoggedIn({ commit }) {
    commit("SET_FB_LOGIN");
  },
  setUserLoggedOut({ commit }) {
    commit("SET_FB_LOGOUT");
  }
};
const getters = {
  FB: ({ FB }) => FB,
  UserInfo: ({ UserInfo }) => UserInfo,
  UserEvents: ({ UserEvents }) => UserEvents,
  Albums: ({ albums }) => albums,
  FBLoggedIn: ({ loggedIn }) => loggedIn,
  Grams: ({ grams }) => grams
};
export default {
  state,
  mutations,
  actions,
  getters
};

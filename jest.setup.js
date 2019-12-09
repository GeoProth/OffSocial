import "@babel/polyfill";
import path from "path";
import Vue from "vue";
import Vuex from "vuex";
import Icon from "vue-awesome";
import VueTestUtils, { RouterLinkStub } from "@vue/test-utils";
const read = require("fs-readdir-recursive");

// Register global components => `/utils/globals.js`
const globalComponentFiles = read(
  path.join(__dirname, "./components/ui")
).filter((fileName) => /.+\.vue$/.test(fileName));

for (const fileName of globalComponentFiles) {
  const componentConfig = require(path.join(
    __dirname,
    "./components/ui",
    fileName
  ));
  const componentName = path.parse(fileName).name;
  Vue.component(componentName, componentConfig.default || componentConfig);
}
Vue.component("Icon", Icon);
global.routerPush = jest.fn();
global.shallow = (component) => VueTestUtils.shallowMount(component, {
  stubs: {
    RouterLink: RouterLinkStub,
    "router-view": true,
    "nuxt-link": true
  }
});
global.mount = (component) => VueTestUtils.mount(component, {
  stubs: {
    RouterLink: RouterLinkStub,
    "router-view": true,
    "nuxt-link": true
  }
});
global.shallowMock = (component, options = {}) =>
  VueTestUtils.shallowMount(component, mockOptions(options));
global.mountMock = (component, options = {}) =>
  VueTestUtils.mount(component, mockOptions(options));

function mockOptions(options) {
  const localVue = VueTestUtils.createLocalVue();
  const mocked = {
    mocks: {
      $router: { push: global.routerPush }
    },
    stubs: {
      RouterLink: RouterLinkStub,
      "router-view": true,
      "nuxt-link": true
    }
  };
  if (options.store) {
    localVue.use(Vuex);
    mocked.store = new Vuex.Store({
      modules: Object.keys(options.store)
        .map((moduleName) => {
          const storeModule = options.store[moduleName];
          return {
            [moduleName]: {
              state: storeModule.state || {},
              getters: storeModule.getters || {},
              actions: storeModule.actions || {},
              namespaced:
                typeof storeModule.namespaced === "undefined"
                  ? true
                  : storeModule.namespaced
            }
          };
        })
        .reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {})
    });
  }
  // mock the axios module
  jest.mock("axios");
  localVue.use((Vue, options) => {
    Vue.$axios = {
      request: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
      head: jest.fn(),
      options: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn()
    };
  });
  mocked.localVue = localVue;

  if (options.props) {
    mocked.propsData = options.props;
  }
  if (options.stubs) {
    Object.assign(mocked.stubs, options.stubs);
  }
  if (options.slots) {
    mocked.slots = options.slots;
  }
  if (options.mocks) {
    mocked.mocks = options.mocks;
  }
  if (options.sync) {
    mocked.sync = options.sync;
  }
  return mocked;
}

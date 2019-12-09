
import axios from "axios";
import facebook from "./facebook";

jest.mock("axios");
describe("Facebook store", () => {
  const mockFB = {
    api: jest.fn()
  };
  Object.defineProperty(window, "FB", {
    value: mockFB,
    writable: true
  });
  const ctx = {
    commit: jest.fn(),
    setState(state) {
      this.state = state;
    },
    resetState() {
      this.state = undefined;
    }
  };

  beforeEach(() => {
    axios.post.mockReset();
    axios.get.mockReset();
    axios.put.mockReset();
    axios.patch.mockReset();
    axios.delete.mockReset();

    facebook.actions.$axios = axios;
    facebook.getters.$axios = axios;
    facebook.mutations.$axios = axios;

    ctx.commit.mockReset();
    ctx.resetState();
    mockFB.api.mockReset();
  });
  test("has correct shape", () => {
    expect(facebook.state).toBeFunction();
    expect(facebook.mutations).toBeObject();
    expect(facebook.actions).toBeObject();
    expect(facebook.getters).toBeObject();
  });
  test("state has the correct shape", () => {
    const state = facebook.state();
    expect(state.FB).toBeObject();
    expect(state.UserInfo).toBeObject();
    expect(state.UserEvents).toBeArray();
    expect(state.albums).toBeArray();
    expect(state.grams).toBeArray();
  });
  // ACTIONS -----------------------------------------------------
  describe("Actions", () => {
    // Set FB SDK
    test("setSDK passes correct arguments", () => {
      facebook.actions.setSDK(ctx, { fizz: "buzz" });
      expect(ctx.commit).toHaveBeenCalledWith("SET_FB_API", { fizz: "buzz" });
    });
    // Set User Info
    test("setUserInfo passes correct arguments", async () => {
      mockFB.api.mockImplementation((...args) => args.map((arg) => arg instanceof Function ? arg({ fizz: "buzz" }) : null));
      await facebook.actions.getUserInfo(ctx, { fizz: "buzz" });
      expect(ctx.commit).toHaveBeenCalledWith("SET_USER_INFO", { fizz: "buzz" });
    });
    test("getEvents passes correct args", async () => {
      ctx.setState({});
      mockFB.api.mockImplementation((...args) => args.map((arg) => arg instanceof Function ? arg({ spam: "eggs" }) : null));
      await facebook.actions.getEvents(ctx);
      expect(mockFB.api).toBeCalled();
      expect(ctx.commit).toBeCalledWith("SET_USER_EVENTS", { spam: "eggs" });
    });

    test("getAlbums calls the facebook api", async () => {
      await facebook.actions.getAlbums(ctx);
      expect(mockFB.api).toBeCalled();
    });
    // set grams
    test("getGrams calls instagram api", async () => {
      await facebook.actions.getGrams(ctx);
      expect(mockFB.api).toBeCalled();
    });
  });

  // MUTATIONS ---------------------------------------------------
  describe("Mutations", () => {
    // Set FB ABI
    test("SET_FB_API adds the fb object to the state", () => {
      const mockState = {};
      facebook.mutations.SET_FB_API(mockState, { fizz: "buzz" });
      expect(mockState.FB).toContainAllKeys(["fizz"]);
    });
    // set User Info
    test("SET_USER_INFO adds the user object to the state", () => {
      const mockState = {};
      facebook.mutations.SET_USER_INFO(mockState, { fizz: "buzz" });
      expect(mockState.UserInfo).toContainAllKeys(["fizz"]);
    });
    // set Albums
    test("SET_ALBUMS adds the albums array to the state", () => {
      const mockState = {
        albums: []
      };
      const mockAlbum = {
        data: [{ fizz: "buzz" }]
      };
      facebook.mutations.SET_ALBUMS(mockState, mockAlbum);
      expect(mockState).toMatchSnapshot();
    });
    // Set User Events
    test("SET_USER_EVENTS adds the user Events array to the state", () => {
      const mockState = [];
      facebook.mutations.SET_USER_EVENTS(mockState, ["1", "2", "3"]);
      expect(mockState.UserEvents).toContainAllValues(["1", "2", "3"]);
    });
    // set Insta gram
    test("SET_GRAMS adds user instagram array to state", () => {
      const mockState = [];
      facebook.mutations.SET_GRAMS(mockState, ["1", "2", "3"]);
      expect(mockState.grams).toContainAllValues(["1", "2", "3"]);
    });
  });
  // GETTERS ------------------------------------------------------------
  describe("Getters", () => {
    // GET FB state
    test("FB Getter should return correct property", () => {
      const mockState = { FB: "spam" };
      expect(facebook.getters.FB(mockState)).toBe("spam");
    });
    // GET UserInfo state
    test("UserInfo Getter should return correct property", () => {
      const mockState = { UserInfo: "spam" };
      expect(facebook.getters.UserInfo(mockState)).toBe("spam");
    });
    // GET User Albums state
    test("UserAlbums getter should return correct array", () => {
      const mockState = { albums: ["1", "2", "3"] };
      expect(facebook.getters.Albums(mockState)).toEqual(["1", "2", "3"]);
    });
    // GET UserEvents state
    test("UserEvents getters should return correct array", () => {
      const mockState = { UserEvents: ["1", "2", "3"] };
      expect(facebook.getters.UserEvents(mockState)).toEqual(["1", "2", "3"]);
    });
    // GET Grams state
    test("grams getter shoudl return correct array", () => {
      const mockState = { grams: ["1", "2", "3"] };
      expect(facebook.getters.grams(mockState)).toEqual(["1", "2", "3"]);
    });
  });
});

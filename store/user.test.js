import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import User from "./user";

describe("User Store", () => {
  test("has the correct shape", () => {
    expect(User.state).toBeFunction();
    expect(User.getters).toBeObject();
    expect(User.mutations).toBeObject();
    expect(User.actions).toBeObject();
  });
  test("State has expected properties", () => {
    const state = User.state();
    expect(state.isLoggedIn).toBeBoolean();
    expect(state.isLoggedIn).toBe(false);
  });
  const mockGet = jest.fn();
  const mockDelete = jest.fn();
  const mockHead = jest.fn();
  const mockOptions = jest.fn();
  const mockPost = jest.fn();
  const mockPut = jest.fn();
  const mockPatch = jest.fn();
  const mockPush = jest.fn();
  const ctx = {
    commit: jest.fn(),
    rootGetters: {}
  };

  User.actions = Object.assign(User.actions, {
    $axios: {
      request: jest.fn(),
      get: mockGet,
      delete: mockDelete,
      head: mockHead,
      options: mockOptions,
      post: mockPost,
      put: mockPut,
      patch: mockPatch
    },
    $env: { api: "" },
    $router: { push: mockPush }
  });
  beforeEach(() => {
    mockPush.mockReset();
    mockGet.mockReset();
    mockDelete.mockReset();
    mockHead.mockReset();
    mockOptions.mockReset();
    mockPost.mockReset();
    mockPut.mockReset();
    mockPatch.mockReset();
    ctx.commit.mockReset();
  });
  describe("Login", () => {
    test("set logged out should operate as expected", () => {
      const { SET_LOGGED_IN } = User.mutations;
      const MockState = { isLoggedIn: false };
      SET_LOGGED_IN(MockState);
      expect(MockState.isLoggedIn).toBe(true);
    });
    test("set logged in should operate as expected", () => {
      const { SET_LOGGED_OUT } = User.mutations;
      const MockState = { isLoggedIn: true };
      SET_LOGGED_OUT(MockState);
      expect(MockState.isLoggedIn).toBe(false);
    });
    test("login action should call correct mutation", async () => {
      mockPost.mockImplementation(() => {
        return { status: 200 };
      });
      await User.actions.login(ctx, { username: "test", password: "test" });
      expect(ctx.commit).toHaveBeenCalledWith("SET_LOGGED_IN");
    });

    test("getter exist for isLoggedIn and returns correctly", () => {
      const { isLoggedIn } = User.getters;
      const mockState = { isLoggedIn: false };
      expect(isLoggedIn(mockState)).toBe(false);
    });
    test("Rethrows an error when the post fails", () => {
      mockPost.mockImplementation(() => { throw new Error("stub-error"); });
      expect(User.actions.login(ctx, { username: "test", password: "test" })).toReject();
    });
    test("Doesn't commit if API status isn't 200", () => {
      mockPost.mockImplementation(() => ({ status: 401 }));
      expect(User.actions.login(ctx, { username: "test", password: "test" })).toReject();
      expect(ctx.commit).not.toBeCalled();
    });
  });
  describe("Logout", () => {
    test("logout action should call correct mutation and send to login", () => {
      User.actions.logout(ctx);
      expect(ctx.commit).toHaveBeenCalledWith("SET_LOGGED_OUT");
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
  describe("Create User", () => {
    test("create user is a function", () => {
      expect(User.actions.createUser).toBeFunction();
    });
    test("bails out immediately if payload doesn't have an email and pass", () => {
      User.actions.createUser({}, {});
      expect(mockPost).not.toBeCalled();
    });
    test("calls /user when given a username and password", () => {
      User.actions.createUser(ctx, { email: "admin@test.test", password: "qwerty123" });
      const passhash = Base64.stringify(sha256("qwerty123" + "DMDL"));
      expect(mockPost).toHaveBeenCalledWith("/users", { email: "admin@test.test", passhash });
    });
    test("Throws if there is an error with the API", () => {
      mockPost.mockImplementation(() => { throw new Error("stub-error"); });
      expect(User.actions.createUser(ctx, { email: "admin@test.test", password: "qwerty123" })).toReject();
    });
  });
  describe("Reset Password", () => {
    test("Should throw an error and bail if no email present", () => {
      expect(mockPost).not.toBeCalled();
    });
    test("Should make a call to /users/reset-password", () => {
      User.actions.resetPassword(ctx, { email: "fizz@buzz.com" });
      expect(mockPost).toHaveBeenCalledWith("/users/reset-password", { email: "fizz@buzz.com" });
    });
    test("Throws when given a bad email", () => {
      expect(User.actions.resetPassword(ctx, { email: "badEmail" })).toReject();
    });
    test("When the post fails, throws another error", () => {
      mockPost.mockImplementation(() => { throw new Error("stub-error"); });
      expect(User.actions.resetPassword(ctx, { email: "test@test.co" })).toReject();
    });
  });
  describe("Finish reset password", () => {
    test("Calls api as expected", async () => {
      await User.actions.finishResetPassword(ctx, {
        resetCode: "123456",
        email: "fizz@buzz.com",
        password: "test123"
      });
      expect(mockPost).toHaveBeenCalledWith(
        "/users/reset-password/123456",
        {
          "email": "fizz@buzz.com",
          "passhash": "7NcYcNGWMxapfjrDQIyYNa2M8PPBvHA1J8MCZVNPda4="
        }
      );
    });
    test("Throws another error when the post fails", () => {
      mockPost.mockImplementation(() => { throw new Error("stub-error"); });
      expect(User.actions.finishResetPassword(ctx, {
        resetCode: "123456",
        email: "fizz@buzz.com",
        password: "test123"
      })).toReject();
    });
  });
});

import Auth from "./auth";
describe("Auth middleware", () => {
  const redirect = jest.fn();

  beforeEach(() => {
    redirect.mockReset();
  });
  test("Should redirect to root when not logged in", () => {
    const ctx = {
      store: {
        getters: {
          "user/isLoggedIn": false
        }
      },
      redirect
    };
    Auth(ctx);
    expect(redirect).toHaveBeenCalledWith(307, "/");
  });
  test("Should not redirect to root when logged in", () => {
    const ctx = {
      store: {
        getters: {
          "user/isLoggedIn": true
        }
      },
      redirect
    };
    Auth(ctx);
    expect(redirect).not.toHaveBeenCalledWith(307, "/");
  });
});

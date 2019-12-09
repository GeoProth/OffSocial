import FlushPromises from "flush-promises";
import Login from "./Login";
describe("Login", () => {
  let wrapper;
  const mockLogin = jest.fn();
  beforeEach(() => {
    mockLogin.mockReset();
    wrapper = mountMock(Login, {
      store: {
        user: {
          actions: {
            login: mockLogin
          }
        }
      }
    });
  });
  test("renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("clicking submit calls the function", async () => {
    wrapper.find(".login-form-submit").trigger("click");

    await wrapper.vm.$nextTick();
    await FlushPromises();

    expect(mockLogin).toBeCalled();
  });
  test("When the login throws an error, surface an error to the user", async () => {
    mockLogin.mockImplementation(() => {
      throw new Error("test");
    });
    wrapper = mountMock(Login, {
      store: {
        user: {
          actions: {
            login: mockLogin
          }
        }
      }
    });
    wrapper.find(".login-form-submit").trigger("click");

    await wrapper.vm.$nextTick();
    await FlushPromises();

    expect(mockLogin).toBeCalled();
    expect(wrapper.find(".error-message").isVisible()).toBe(true);
  });
});

import FBLogin from "./FBLogin";
describe("FBLogin", () => {
  let wrapper;
  const RouterPush = jest.fn();
  beforeEach(() => {
    wrapper = shallowMock(FBLogin, {
      mocks: {
        $router: {
          push: RouterPush
        },
        $env: {
          app_id: ""
        }
      }
    });
  });
  test("Renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

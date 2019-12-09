import Header from "./Header";

describe("Header component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMock(Header, {
      store: {
        layout: {
          actions: {
            toggleSideNav: jest.fn()
          }
        },
        user: {
          getters: {
            isLoggedIn: jest.fn()
          }
        }
      }
    });
  });
  test("Should render", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

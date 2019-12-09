import SideNav from "./SideNav";
describe("Side nav menu", () => {
  let wrapper;
  const mockToggle = jest.fn();
  beforeEach(() => {
    mockToggle.mockReset();
    wrapper = shallowMock(SideNav, {
      store: {
        layout: {
          actions: {
            toggleSideNav: mockToggle
          }
        }
      }
    });
  });
  test("can render", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("clicking a link in the SideNav will route to the new page and then close the SideNav", () => {
    wrapper.find(".dashboard").trigger("click");
    expect(mockToggle).toBeCalled();
    expect(routerPush).toBeCalledWith("/dashboard");
  });
});

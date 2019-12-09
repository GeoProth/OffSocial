import Button from "./Button";

describe("UI Button", () => {
  let wrapper;
  const clickAction = jest.fn();
  beforeEach(() => {
    wrapper = mountMock(Button, {
      props: {
        clickAction
      }
    });
  });
  test("the component can render", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("the button will fire the click action when clicked", () => {
    const button = wrapper.find("button");
    button.trigger("click");
    expect(clickAction).toBeCalled();
  });
  test("clickAction prop defaults to a null function", () => {
    wrapper = mount(Button);
    expect(wrapper.props("clickAction")).toBeFunction();
    expect(wrapper.props("clickAction")()).toBe(null);
  });
});

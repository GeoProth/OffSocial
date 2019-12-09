import Logo from "./Logo";

describe("Logo", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(Logo);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

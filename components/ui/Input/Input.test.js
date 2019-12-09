import Input from "./Input";
describe("Input", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(Input);
  });
  test("renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("Emits an input event when typed into", async () => {
    wrapper.find(".ui-input").setValue("Hello");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().input.length).toBe(1);
  });
});

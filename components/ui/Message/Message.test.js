import Message from "./Message";
describe("Message", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(Message);
  });
  test("renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

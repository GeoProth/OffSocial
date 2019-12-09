import PhotoCard from "./PhotoCard";
describe("PhotoCard", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(PhotoCard);
  });
  test("Renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

import VideoCard from "./VideoCard";
describe("VideoCard", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(VideoCard);
  });
  test("renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

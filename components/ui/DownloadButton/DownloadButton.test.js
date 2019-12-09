import DownloadButton from "./DownloadButton";
describe("DownloadButton", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(DownloadButton);
  });
  test("Renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

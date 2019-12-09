import AlbumCard from "./AlbumCard";

describe("Album Card", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(AlbumCard);
  });
  test("can render", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

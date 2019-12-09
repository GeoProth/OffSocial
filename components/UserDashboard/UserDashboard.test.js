import UserDashboard from "./UserDashboard";
describe("UserDashboard", () => {
  let wrapper;
  const mockGetAlbums = jest.fn();
  beforeEach(() => {
    mockGetAlbums.mockReset();
    wrapper = shallowMock(UserDashboard, {
      store: {
        facebook: {
          actions: {
            getAlbums: mockGetAlbums
          },
          getters: {
            UserInfo: () => ({
              first_name: "Test"
            }),
            Albums: jest.fn()
          }
        }
      }
    });
  });
  test("Renders", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

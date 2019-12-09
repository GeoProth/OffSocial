import Layout from "./layout";

describe("Store - Layout", () => {
  test("Layout has correct structure", () => {
    expect(typeof Layout.state).toBe("function");
    expect(typeof Layout.getters).toBe("object");
    expect(typeof Layout.mutations).toBe("object");
    expect(typeof Layout.actions).toBe("object");

    expect(typeof Layout.state().showSideNav).toBe("boolean");
    expect(typeof Layout.getters.showSideNav({ showSideNav: true })).toBe(
      "boolean"
    );
  });
  test("actions should call commit correctly", () => {
    const mockCommit = jest.fn();
    Layout.actions.toggleSideNav({ commit: mockCommit });

    expect(mockCommit).toHaveBeenCalled();
    expect(mockCommit).toHaveBeenCalledWith("TOGGLE_SIDE_NAV");
  });
});

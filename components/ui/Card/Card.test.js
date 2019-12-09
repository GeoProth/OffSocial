import { shallowMount } from "@vue/test-utils";
import Card from "./Card";
describe("Card component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Card);
  });
  test("component can render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import { render, screen } from "@testing-library/react";
import CategoryList from "./CategoryList";
import { getIconForCategory } from "@/components/common/IconText";

jest.mock("@/components/common/IconText", () => ({
  getIconForCategory: jest.fn(),
}));

describe("CategoryList", () => {
  const categories = ["vegan", "tiefkühlgeeignet", "schnell"];

  it("renders the correct number of CategoryCard components", async () => {
    render(<CategoryList categories={categories} />);
    const categoryCards = screen.getAllByText(/vegan|tiefkühlgeeignet|schnell/);
    expect(categoryCards).toHaveLength(categories.length);
  });

  it("passes the correct category and icon to each CategoryCard", async () => {
    (getIconForCategory as jest.Mock).mockImplementation((category) => (
      <div data-testid={`icon-${category}`}>{`icon-${category}`}</div>
    ));

    render(<CategoryList categories={categories} />);

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
      expect(screen.getByTestId(`icon-${category}`)).toBeInTheDocument();
    });
  });

  it("renders nothing if no categories are passed", async () => {
    const { container } = render(<CategoryList categories={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

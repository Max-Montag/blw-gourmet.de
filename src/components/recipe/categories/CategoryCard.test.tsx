import { render } from "@testing-library/react";
import CategoryCard from "./CategoryCard";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

describe("CategoryCard", () => {
  const category = "Vegan";
  const icon = <div data-testid="icon">Icon</div>;

  const renderComponent = () =>
    render(<CategoryCard category={category} icon={icon} />, {
      wrapper: MemoryRouterProvider,
    });

  it("renders the correct category text", () => {
    const { getByText } = renderComponent();
    expect(getByText(category)).toBeInTheDocument();
  });

  it("renders the icon", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  it("renders a link with the correct href", () => {
    const { container } = renderComponent();
    const linkElement = container.querySelector("a");
    expect(linkElement).toHaveAttribute("href", "/rezepte/vegan");
  });
});

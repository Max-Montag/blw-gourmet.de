import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import ArticleDisplay from "./ArticleDisplay";
import { ArticleData } from "@/types/articleTypes";
import { Descendant } from "slate";

describe("ArticleDisplay", () => {
  const mockArticle: ArticleData = {
    url: "/article/test-article",
    title: "Test Artikel",
    optimized_image: undefined,
    content: [
      {
        type: "paragraph",
        children: [
          { text: "Testsatz. Dies ist ein Testsatz1 §$%&/()=?.", bold: true },
        ],
      },
      {
        type: "heading-one",
        children: [{ text: "Große Testüberschrift äöüÖÜÄ!§$%&/()=?" }],
      },
      {
        type: "heading-two",
        children: [{ text: "Kleine Testüberschrift", italic: true }],
      },
    ] as Descendant[],
  };

  it("renders the article title", () => {
    render(<ArticleDisplay article={mockArticle} />);
    const titleElement = screen.getByText("Test Artikel");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders a placeholder if the optimized image is not available", () => {
    render(<ArticleDisplay article={mockArticle} />);
    const placeholder = screen.getByText("Bild nicht gefunden");
    expect(placeholder).toBeInTheDocument();
  });

  it("renders the article content with correct formatting", () => {
    render(<ArticleDisplay article={mockArticle} />);

    const paragraphElement = screen.getByText(
      "Testsatz. Dies ist ein Testsatz1 §$%&/()=?."
    );
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.tagName).toBe("STRONG");

    const headingOneElement = screen.getByText(
      "Große Testüberschrift äöüÖÜÄ!§$%&/()=?"
    );
    expect(headingOneElement.parentElement?.tagName).toBe("H2");
    expect(headingOneElement).parentElement?.toHaveClass("font-semibold");
    expect(headingOneElement).parentElement?.toHaveClass("text-2xl");

    const headingTwoElement = screen.getByText("Kleine Testüberschrift");
    expect(headingTwoElement.tagName).toBe("EM");
    expect(headingTwoElement).parentElement?.parentElement?.tagName.toBe("H3");
    expect(headingTwoElement).parentElement?.parentElement?.toHaveClass(
      "font-semibold"
    );
    expect(headingTwoElement).parentElement?.parentElement?.toHaveClass(
      "text-xl"
    );
  });

  it("renders multiple content blocks correctly", () => {
    render(<ArticleDisplay article={mockArticle} />);

    const paragraphs = screen.getAllByText(
      "Testsatz. Dies ist ein Testsatz1 §$%&/()=?."
    );
    expect(paragraphs.length).toBe(1);

    const headings = screen.getAllByText(
      "Große Testüberschrift äöüÖÜÄ!§$%&/()=?"
    );
    expect(headings.length).toBe(1);
  });
});

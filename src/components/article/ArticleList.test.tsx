import { render, screen } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import ArticleList from "./ArticleList";
import { ArticlePreviewData } from "@/types/articleTypes";

const mockArticles: ArticlePreviewData[] = [
  {
    url: "artikel-1",
    title: "Erster Artikel",
    preview: "Dies ist eine Vorschau des ersten Artikels.",
  },
  {
    url: "artikel-2",
    title: "Zweiter Artikel",
    preview: "Dies ist eine Vorschau des zweiten Artikels.",
  },
  {
    url: "artikel-3",
    title: "Dritter Artikel",
    preview: "",
  },
];

describe("ArticleList", () => {
  it("renders the correct list of articles", () => {
    render(
      <MemoryRouterProvider>
        <ArticleList articles={mockArticles} />
      </MemoryRouterProvider>
    );

    const article1 = screen.getByText("Erster Artikel");
    const article2 = screen.getByText("Zweiter Artikel");
    const article3 = screen.getByText("Dritter Artikel");

    expect(article1).toBeInTheDocument();
    expect(article2).toBeInTheDocument();
    expect(article3).toBeInTheDocument();
  });

  it("shows the correct placeholder if no preview is available", () => {
    render(
      <MemoryRouterProvider>
        <ArticleList articles={mockArticles} />
      </MemoryRouterProvider>
    );

    const previews = screen.getAllByText(/Keine Vorschau verfügbar.../i);
    expect(previews).toHaveLength(1);
  });

  it("links to the correct article URLs", () => {
    render(
      <MemoryRouterProvider>
        <ArticleList articles={mockArticles} />
      </MemoryRouterProvider>
    );

    const articleLinks = screen.getAllByRole("link");
    expect(articleLinks).toHaveLength(mockArticles.length);
    expect(articleLinks[0]).toHaveAttribute("href", "/artikel/artikel-1");
    expect(articleLinks[1]).toHaveAttribute("href", "/artikel/artikel-2");
    expect(articleLinks[2]).toHaveAttribute("href", "/artikel/artikel-3");
  });
});

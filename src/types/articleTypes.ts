import { Descendant } from "slate";

export interface ArticleData {
  url: string;
  title: string;
  optimized_image?: string;
  content: Descendant[];
}

export interface ArticlePreviewData {
  url: string;
  title: string;
  thumbnail?: string;
  preview: string;
}

export interface AdminArticlePreview {
  url: string;
  title: string;
  preview: string;
  creation_time: string;
  last_changed: string;
  owner: number;
  thumbnail?: string;
  published: boolean;
}

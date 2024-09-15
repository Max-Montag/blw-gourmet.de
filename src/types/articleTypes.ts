export interface ArticlePreviewData {
  url: string;
  title: string;
  thumbnail?: string;
}

export interface ArticleData {
  url: string;
  title: string;
  optimized_image?: string;
  content: any;
}
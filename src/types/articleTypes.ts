export interface ArticleData {
  url: string;
  title: string;
  optimized_image?: string;
  content: any;
}

export interface ArticlePreviewData {
  url: string;
  title: string;
  thumbnail?: string;
}

export interface AdminArticlePreview {
  url: string;
  title: string;
  creation_time: string;
  last_changed: string;
  owner: number;
  thumbnail?: string;
  published: boolean;
}

export interface SlateTextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface SlateNode {
  type: string;
  children: SlateTextNode[];
  url?: string;
  alt?: string;
}

/** Blog row for manage list / forms (API shape may vary; map in service). */
export interface ManageBlog {
  id: string;
  title: string;
  slug: string;
  teaser: string;
  coverImageUrl: string | null;
  contentHtml: string;
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ManageBlogPayload {
  title: string;
  slug: string;
  teaser: string;
  coverImageUrl: string | null;
  contentHtml: string;
  author: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

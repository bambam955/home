export interface LayoutProps {
  title: string;
  description?: string;
  showBreadcrumbs?: boolean;
  theme?: 'default' | 'dev';
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

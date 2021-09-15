export type Date = number;

export interface Preview {
  url: string;
  mediaType: string;
  contentType: string | undefined;
  favicons: string[];
  title?: string;
  siteName?: string | undefined;
  description?: string | undefined;
  images?: string[];
  videos?: {
    url: string | undefined;
    secureUrl: string | null | undefined;
    type: string | null | undefined;
    width: string | undefined;
    height: string | undefined;
  }[];
}

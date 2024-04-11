interface Props {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Determines if a URL is secure (HTTPS).
 * @param url The URL to check.
 * @returns true if the URL is secure, false otherwise.
 */
function isSecureUrl(url: string): boolean {
  return url.startsWith("https://");
}

export default function myImageLoader({ src, width, quality }: Props) {
  // Define both possible base URLs.
  const secureBaseUrl = "https://sai-fe.vercel.app";
  const nonSecureBaseUrl = "http://52.55.132.54";

  // Determine if the source URL is secure and select the base URL accordingly.
  const baseUrl = isSecureUrl(src) ? secureBaseUrl : nonSecureBaseUrl;

  // Construct the loader URL.
  return `https://wsrv.nl/?url=${baseUrl}${src}?w=${width}&q=${
    quality || 75
  }&output=webp`;
}

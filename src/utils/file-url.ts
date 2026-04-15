export function toClientFileUrl(rawUrl: string): string {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

  try {
    // If it's already a valid absolute URL (e.g., http://localhost:8000/files/...),
    // simply return it as-is.
    return new URL(rawUrl).toString();
  } catch {
    // If it throws, it's likely a relative path (e.g., files/123).
    // We prepend the base URL to ensure it routes correctly.
    if (!apiBaseUrl) return rawUrl;

    try {
      const parsedApiBase = new URL(apiBaseUrl);
      const normalizedPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
      return `${parsedApiBase.origin}${normalizedPath}`;
    } catch {
      // Fallback if env variables are misconfigured
      return rawUrl;
    }
  }
}

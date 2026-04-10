const DEV_FILE_PROXY_PREFIX = "/__files_proxy";

export function toClientFileUrl(rawUrl: string): string {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

  try {
    const parsedUrl = new URL(rawUrl);

    if (import.meta.env.DEV) {
      if (apiBaseUrl) {
        const parsedApiBase = new URL(apiBaseUrl);
        if (parsedUrl.origin === parsedApiBase.origin) {
          return `${DEV_FILE_PROXY_PREFIX}${parsedUrl.pathname}${parsedUrl.search}`;
        }
      }

      if (
        (parsedUrl.hostname === "127.0.0.1" ||
          parsedUrl.hostname === "localhost") &&
        parsedUrl.port === "8000"
      ) {
        return `${DEV_FILE_PROXY_PREFIX}${parsedUrl.pathname}${parsedUrl.search}`;
      }
    }

    return parsedUrl.toString();
  } catch {
    if (!apiBaseUrl) {
      return rawUrl;
    }

    try {
      const parsedApiBase = new URL(apiBaseUrl);
      const normalizedPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;

      if (import.meta.env.DEV) {
        return `${DEV_FILE_PROXY_PREFIX}${normalizedPath}`;
      }

      return `${parsedApiBase.origin}${normalizedPath}`;
    } catch {
      return rawUrl;
    }
  }
}

import { GET } from "@/lib/api/client";

/**
 * Fetches a file securely using the configured API client and opens it in a new tab.
 */
export async function printSecureFile(url: string) {
  try {
    const blob = await GET<Blob>(url, { responseType: "blob" });
    const objectUrl = window.URL.createObjectURL(blob);
    window.open(objectUrl, "_blank");

    // Revoke the URL after a delay to free memory, giving the new tab time to load
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 10000);
  } catch (err) {
    console.error("Print error:", err);
    window.alert("Failed to load file for printing.");
  }
}

/**
 * Fetches a file securely using the configured API client and triggers a download.
 */
export async function downloadSecureFile(url: string, fileName: string) {
  try {
    const blob = await GET<Blob>(url, { responseType: "blob" });
    const objectUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error("Download error:", err);
    window.alert("Failed to download file.");
  }
}

import { apiClient } from "@/lib/api/client";
import type { QuotationFileResource } from "../types/quotations.types";

export async function fetchQuotationFiles(
  id: string,
  type: "REQUESTED" | "PROPOSAL" = "REQUESTED",
): Promise<QuotationFileResource[]> {
  const response = await apiClient.get<{
    data: QuotationFileResource[] | string;
  }>(`/quotations/${id}/files`, { params: { type } });

  if (typeof response.data.data === "string") return [];
  return response.data.data;
}

export async function fetchQuotationProposalFile(
  quotationId: string,
): Promise<QuotationFileResource | null> {
  // Reuse the function above to fetch PROPOSAL files
  const files = await fetchQuotationFiles(quotationId, "PROPOSAL");
  return files.length > 0 ? files[0] : null;
}

/**
 * Returns the download URL for a file by its id (for secure download).
 */
export function getQuotationFileDownloadUrl(fileId: number) {
  // Use relative path for client-side fetch
  return `/files/${fileId}/download`;
}

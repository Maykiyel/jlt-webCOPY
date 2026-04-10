import { apiClient } from "@/lib/api/client";

export async function fetchQuotationProposalFile(quotationId: string) {
  const response = await apiClient.get(`/quotations/${quotationId}/files`, {
    params: { type: "PROPOSAL" },
  });
  // Return the first PROPOSAL file if present
  const files = response.data?.data ?? [];
  return files.length > 0 ? files[0] : null;
}

import { fetchQuotationProposalFile } from "@/features/quotations/api/quotationFiles.api";

/**
 * Opens the proposal PDF for printing, or alerts if not found.
 */
export async function handlePrintProposalFile(quotationId: string) {
  const file = await fetchQuotationProposalFile(quotationId);
  if (file && file.file_url) {
    window.open(file.file_url, "_blank");
  } else {
    window.alert("No proposal PDF found for this quotation.");
  }
}

/**
 * Downloads the proposal PDF as a Blob, or alerts if not found.
 */
export async function handleDownloadProposalFile(
  quotationId: string,
  fileName?: string,
) {
  const file = await fetchQuotationProposalFile(quotationId);
  if (file && file.file_url) {
    try {
      const response = await fetch(file.file_url, { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch file");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || file.file_name || "quotation-proposal.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.alert("Failed to download file.");
    }
  } else {
    window.alert("No proposal PDF found for this quotation.");
  }
}

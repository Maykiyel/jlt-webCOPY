import {
  fetchQuotationProposalFile,
  getQuotationFileDownloadUrl,
} from "@/features/quotations/api/quotationFiles.api";
import { printSecureFile, downloadSecureFile } from "@/utils/secureFileActions";

/**
 * Opens the proposal PDF for printing by delegating to the generic secure file action.
 */
export async function handlePrintProposalFile(quotationId: string) {
  const file = await fetchQuotationProposalFile(quotationId);

  if (file && file.id) {
    const url = getQuotationFileDownloadUrl(file.id);

    // Use the shared secure print action
    await printSecureFile(url);
  } else {
    window.alert("No proposal PDF found for this quotation.");
  }
}

/**
 * Downloads the proposal PDF by delegating to the generic secure file action.
 */
export async function handleDownloadProposalFile(
  quotationId: string,
  fileName?: string,
) {
  const file = await fetchQuotationProposalFile(quotationId);

  if (file && file.id) {
    const url = getQuotationFileDownloadUrl(file.id);
    const finalFileName =
      fileName || file.file_name || "quotation-proposal.pdf";

    // Use the shared secure download action
    await downloadSecureFile(url, finalFileName);
  } else {
    window.alert("No proposal PDF found for this quotation.");
  }
}

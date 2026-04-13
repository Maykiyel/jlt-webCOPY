import { createElement } from "react";
import type { QuotationViewerState } from "@/features/quotations/types/compose.types";
import { toClientFileUrl } from "@/utils/file-url";

export function usePDFActions(
  state: QuotationViewerState | null,
  logoSrc: string,
) {
  if (!state) {
    return {
      handleDownload: async () => undefined,
      handlePrint: async () => undefined,
    };
  }

  const viewerState = state;

  const props = {
    quotation: viewerState.quotation,
    template: viewerState.template,
    clientInformationFields: viewerState.clientInformationFields,
    quotationDetails: viewerState.quotationDetails,
    billingDetails: viewerState.billingDetails,
    terms: viewerState.terms,
    signatory: viewerState.signatory,
    logoSrc,
  };

  async function generateBlob(): Promise<Blob> {
    const [{ pdf }, { QuotationPDF }] = await Promise.all([
      import("@react-pdf/renderer"),
      import("@/features/quotations/pdf/QuotationPDF"),
    ]);

    const hasSignatureFile = Boolean(viewerState.signatory.signature_file);
    const signatureFileUrl = viewerState.signatory.signature_file_url;
    const signatorySignatureSrc = hasSignatureFile
      ? URL.createObjectURL(viewerState.signatory.signature_file as File)
      : signatureFileUrl
        ? toClientFileUrl(signatureFileUrl)
        : null;

    try {
      const doc = createElement(QuotationPDF, {
        ...props,
        signatorySignatureSrc,
      });
      return await pdf(doc as never).toBlob();
    } finally {
      if (hasSignatureFile && signatorySignatureSrc) {
        URL.revokeObjectURL(signatorySignatureSrc);
      }
    }
  }

  async function handleDownload() {
    const blob = await generateBlob();
    const pdfBlob =
      blob.type === "application/pdf"
        ? blob
        : new Blob([blob], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${viewerState.quotation.reference_number ?? "quotation"}.pdf`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 2000);
  }


  async function handlePrint() {
    const blob = await generateBlob();
    const pdfBlob =
      blob.type === "application/pdf"
        ? blob
        : new Blob([blob], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);

    // Open PDF in a new window and trigger print
    const printWindow = window.open(url);
    if (printWindow) {
      // Wait for the PDF to load, then print
      const onLoad = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.removeEventListener("load", onLoad);
        setTimeout(() => {
          URL.revokeObjectURL(url);
          printWindow.close();
        }, 1000);
      };
      printWindow.addEventListener("load", onLoad);
    } else {
      // Fallback: open PDF and let user print manually
      window.open(url);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }
  }

  return { handleDownload, handlePrint };
}

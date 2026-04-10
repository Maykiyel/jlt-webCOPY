import { Box } from "@mantine/core";
import { useState } from "react";
import {
  useComposeStandardTemplate,
  useComposeStandardTemplates,
} from "@/features/quotations/hooks/useComposeReferenceData";
import { ComposeStepLoader } from "@/features/quotations/pages/compose/components/ComposeStepLoader";
import { TermsTemplateSelector } from "@/features/quotations/pages/compose/components/TermsTemplateSelector";
import type { TermsValues } from "@/features/quotations/schemas/compose.schema";
import { TermsViewer } from "@/features/quotations/pages/compose/TermsViewer";

interface TermsStepProps {
  onChange: (values: TermsValues) => void;
  savedData?: TermsValues | null;
}

export function TermsStep({ onChange, savedData }: TermsStepProps) {
  const { data: standardTemplates = [], isLoading: isTemplatesLoading } =
    useComposeStandardTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    () => savedData?.template_id ?? null,
  );
  const { data: selectedTemplate, isLoading: isTemplateLoading } =
    useComposeStandardTemplate(selectedTemplateId ?? undefined);

  function handleSelect(templateId: string) {
    setSelectedTemplateId(templateId);
  }

  if (!selectedTemplateId) {
    return (
      <>
        {isTemplatesLoading ? (
          <ComposeStepLoader
            label="Loading terms templates..."
            minHeight="14rem"
          />
        ) : (
          <TermsTemplateSelector
            templates={standardTemplates}
            onSelect={handleSelect}
          />
        )}
      </>
    );
  }

  if (isTemplateLoading || !selectedTemplate) {
    return (
      <ComposeStepLoader label="Loading terms template..." minHeight="14rem" />
    );
  }

  return (
    <Box>
      <TermsViewer
        template={selectedTemplate}
        initialValues={savedData}
        onChange={onChange}
      />
    </Box>
  );
}

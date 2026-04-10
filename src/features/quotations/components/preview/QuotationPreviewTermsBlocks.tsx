import { Box, Stack, Text } from "@mantine/core";
import type { QuotationDocumentTermsBlock } from "@/features/quotations/utils/quotationDocumentViewModel";

interface QuotationPreviewTermsBlocksProps {
  blocks: QuotationDocumentTermsBlock[];
}

export function QuotationPreviewTermsBlocks({
  blocks,
}: QuotationPreviewTermsBlocksProps) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <Stack gap="md" mb="xl">
      {blocks.map((block) => (
        <Box key={block.key}>
          <Text size="xs" fw={700} tt="uppercase" mb={4}>
            {block.label}
          </Text>
          <Text size="xs" style={{ whiteSpace: "pre-wrap" }}>
            {block.content}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}

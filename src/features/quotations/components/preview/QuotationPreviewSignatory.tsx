import { Image, SimpleGrid, Stack, Text } from "@mantine/core";

interface QuotationPreviewSignatoryProps {
  complementaryClose: string;
  authorizedSignatoryName: string;
  positionTitle: string;
  companyName: string;
  clientName: string;
  signaturePreviewUrl: string | null;
}

export function QuotationPreviewSignatory({
  complementaryClose,
  authorizedSignatoryName,
  positionTitle,
  companyName,
  clientName,
  signaturePreviewUrl,
}: QuotationPreviewSignatoryProps) {
  return (
    <SimpleGrid cols={2} mb="xl">
      <Stack gap="xs">
        <Text size="xs">{complementaryClose}</Text>
        {signaturePreviewUrl && (
          <Image src={signaturePreviewUrl} w="8rem" h="3rem" fit="contain" />
        )}
        <Text size="xs" fw={700} tt="uppercase">
          {authorizedSignatoryName}
        </Text>
        <Text size="xs">{positionTitle}</Text>
        <Text size="xs">{companyName}</Text>
      </Stack>
      <Stack gap="xs">
        <Text size="xs">CONFORME:</Text>
        <Text size="xs" mt="xl" fw={700} tt="uppercase">
          {clientName}
        </Text>
        <Text size="xs">Client</Text>
      </Stack>
    </SimpleGrid>
  );
}

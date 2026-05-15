import { Accordion, ActionIcon, Avatar, Grid, Stack, Text } from "@mantine/core";
import {
  Chat,
  Description,
  History,
  Inventory,
  LocalShipping,
} from "@nine-thirty-five/material-symbols-react/rounded";
import { DetailCard } from "@/components/DetailCard";
import { DetailGrid } from "@/components/DetailGrid";
import type { JobOrderDetail } from "../types/jobOrderDetail";

type JobOrderClientDetailSectionsProps = {
  detail: JobOrderDetail;
};

const em = "—";

export default function JobOrderClientDetailSections({
  detail,
}: JobOrderClientDetailSectionsProps) {
  const consigneeRows = [
    { label: "Company Name", value: detail.client.consignee || em },
    { label: "Company Address", value: em },
    { label: "Contact Person", value: em },
    { label: "Contact Number", value: em },
    { label: "Email Address", value: em },
  ];

  const shipmentRows = [
    { label: "Service Type", value: detail.service?.service_type || em },
    { label: "Freight Transport Mode", value: detail.service?.type || em },
    { label: "Service", value: detail.service?.service_level || em },
    { label: "Commodity", value: detail.shipment?.commodity || em },
    {
      label: "Volume (Dimension)",
      value:
        [detail.shipment?.cargo_type, detail.shipment?.container_size]
          .filter(Boolean)
          .join(" - ") || em,
    },
    { label: "Origin", value: em },
    { label: "Destination", value: em },
    { label: "Details/Remarks", value: detail.shipment?.special_remarks || em },
  ];

  return (
    <Stack gap="lg">
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <DetailCard
            headerLeft={<Avatar radius="xl" size="md" color="jltBlue">C</Avatar>}
            title={detail.client.shipper || "Client Name"}
            headerRight={
              <ActionIcon variant="subtle" color="jltBlue" aria-label="Open chat">
                <Chat width={18} height={18} />
              </ActionIcon>
            }
            headerBg="#EFF0F4"
          >
            <DetailGrid
              rows={[
                { label: "Company Name", value: detail.client.consignee || em },
                { label: "Contact No.", value: em },
                { label: "Email", value: em },
              ]}
            />
          </DetailCard>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <DetailCard title=" " headerBg="#EFF0F4">
            <DetailGrid
              rows={[
                { label: "Job Order", value: detail.reference_number || em },
                { label: "Quotation", value: String(detail.quotation_id ?? em) },
                { label: "PIC", value: em },
              ]}
            />
          </DetailCard>
        </Grid.Col>
      </Grid>

      <Accordion variant="separated" radius="md">
        <Accordion.Item value="consignee">
          <Accordion.Control bg="#EFF0F4" icon={<Inventory width={18} height={18} />}>
            <Text fw={700} tt="uppercase" size="sm" c="var(--mantine-color-jltBlue-8)">
              Consignee Details
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <DetailGrid rows={consigneeRows} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="shipment">
          <Accordion.Control bg="#EFF0F4" icon={<LocalShipping width={18} height={18} />}>
            <Text fw={700} tt="uppercase" size="sm" c="var(--mantine-color-jltBlue-8)">
              Shipment Details
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <DetailGrid rows={shipmentRows} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="documents">
          <Accordion.Control bg="#EFF0F4" icon={<Description width={18} height={18} />}>
            <Text fw={700} tt="uppercase" size="sm" c="var(--mantine-color-jltBlue-8)">
              Documents
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text size="sm" c="dimmed">
              No document details available yet.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="history">
          <Accordion.Control bg="#EFF0F4" icon={<History width={18} height={18} />}>
            <Text fw={700} tt="uppercase" size="sm" c="var(--mantine-color-jltBlue-8)">
              History
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text size="sm" c="dimmed">
              No history details available yet.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}

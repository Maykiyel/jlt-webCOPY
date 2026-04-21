import {
  Paper,
  Group,
  Text,
  Box as MantineBox,
  UnstyledButton,
} from "@mantine/core";
import {
  ChevronRight,
  InboxTextPerson,
} from "@nine-thirty-five/material-symbols-react/outlined";
import { DetailGrid } from "@/components/DetailGrid";
import type { ShipmentResource } from "@/features/shipments/types/shipments.types";

interface BillingSummaryProps {
  shipment: ShipmentResource;
  expanded: boolean;
  onToggle: () => void;
}

export function BillingSummary({
  shipment,
  expanded,
  onToggle,
}: BillingSummaryProps) {
  return (
    <UnstyledButton w="100%" onClick={onToggle} style={{ textAlign: "left" }}>
      <Paper
        radius="md"
        p={0}
        style={{
          border: "1px solid var(--mantine-color-gray-2)",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <MantineBox
          w="100%"
          bg="#D4DAE0"
          p="lg"
          style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
        >
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <MantineBox
                style={{
                  color: "var(--mantine-color-jltBlue-8)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InboxTextPerson width="1.5rem" height="1.5rem" />
              </MantineBox>
              <Text fw={700} tt="uppercase" c="jltBlue.8">
                General Details
              </Text>
            </Group>
            <ChevronRight
              width="1.5rem"
              height="1.5rem"
              style={{
                transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </Group>
        </MantineBox>

        {expanded && (
          <MantineBox p="lg" pb="sm">
            <DetailGrid
              rows={[
                {
                  label: "Reference Number",
                  value: shipment.general_info.reference_number,
                },
                {
                  label: "Current Destination",
                  value: shipment.general_info.destination,
                },
                {
                  label: "Origin",
                  value: shipment.shipment_information.origin,
                },
                { label: "Status", value: shipment.general_info.status },
              ]}
            />
          </MantineBox>
        )}
      </Paper>
    </UnstyledButton>
  );
}

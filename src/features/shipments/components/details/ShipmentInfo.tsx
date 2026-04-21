import {
  Paper,
  Group,
  Text,
  Box as MantineBox,
  UnstyledButton,
} from "@mantine/core";
import {
  ChevronRight,
  Box,
} from "@nine-thirty-five/material-symbols-react/outlined";
import { DetailGrid } from "@/components/DetailGrid";
import type { ShipmentResource } from "@/features/shipments/types/shipments.types";

interface ShipmentInformationProps {
  shipment: ShipmentResource;
  expanded: boolean;
  onToggle: () => void;
}

export function ShipmentInformation({
  shipment,
  expanded,
  onToggle,
}: ShipmentInformationProps) {
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
                <Box width="1.5rem" height="1.5rem" />
              </MantineBox>
              <Text fw={700} tt="uppercase" c="jltBlue.8">
                Shipment Information
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
                  label: "Origin",
                  value: shipment.shipment_information.origin,
                },
                {
                  label: "Destination",
                  value: shipment.shipment_information.destination,
                },
                {
                  label: "Account Handler",
                  value: shipment.shipment_information.account_handler,
                },
                { label: "Shipment Date", value: shipment.general_info.date },
                {
                  label: "Created At",
                  value: shipment.shipment_information.created_at,
                },
                {
                  label: "Updated At",
                  value: shipment.shipment_information.updated_at,
                },
              ]}
            />
          </MantineBox>
        )}
      </Paper>
    </UnstyledButton>
  );
}

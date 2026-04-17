import {
  Paper,
  Group,
  Text,
  Box as MantineBox,
  UnstyledButton,
} from "@mantine/core";
import {
  ChevronRight,
  AccountBox,
} from "@nine-thirty-five/material-symbols-react/outlined";
import { DetailGrid } from "@/components/DetailGrid";
import type { ShipmentResource } from "@/features/shipments/types/shipments.types";

interface PersonInChargeProps {
  shipment: ShipmentResource;
  expanded: boolean;
  onToggle: () => void;
}

export function PersonInCharge({
  shipment,
  expanded,
  onToggle,
}: PersonInChargeProps) {
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
                <AccountBox width="1.5rem" height="1.5rem" />
              </MantineBox>
              <Text fw={700} tt="uppercase" c="jltBlue.8">
                Contact Person
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
          <MantineBox p="lg" pb="xs">
            <DetailGrid
              rows={[
                {
                  label: "Name",
                  value: shipment.contact_person.full_name || "—",
                },
                {
                  label: "Contact Number",
                  value: shipment.contact_person.contact_number || "—",
                },
                { label: "Email", value: shipment.contact_person.email || "—" },
              ]}
            />
          </MantineBox>
        )}
      </Paper>
    </UnstyledButton>
  );
}

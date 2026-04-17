import {
  Group,
  Paper,
  Stack,
  Text,
  Image,
  ActionIcon,
  Box as MantineBox,
} from "@mantine/core";
import chatbubble from "@/assets/icons/chatbubble.svg";
import shipmentLogo from "@/assets/logos/ShipmentLogo.png";
import type { ShipmentResource } from "@/features/shipments/types/shipments.types";

interface ReferenceHeaderProps {
  shipment: ShipmentResource;
}

export function ReferenceHeader({ shipment }: ReferenceHeaderProps) {
  return (
    <Group align="stretch" grow>
      <Paper
        radius="md"
        withBorder
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MantineBox
          bg="#D4DAE0"
          p="xs"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text fw={700} size="xl" c="jltBlue.8">
            {shipment.general_info.reference_number}
          </Text>
          <ActionIcon
            variant="transparent"
            color="transparent"
            radius="xxl"
            size="lg"
            aria-label="Chat"
            onClick={() => console.log("Chat clicked")}
          >
            <Image src={chatbubble} alt="Chat Icon" width={35} height={35} />
          </ActionIcon>
        </MantineBox>

        <MantineBox p="lg" bg="white" style={{ flex: 1 }}>
          <Stack gap="sm">
            <Group style={{ minHeight: "1rem" }}>
              <Text c="gray.6">CLIENT:</Text>
              <Text fw={450}>{shipment.general_info.client || "—"}</Text>
            </Group>
            <Group style={{ minHeight: "1rem" }}>
              <Text c="gray.6">JOB ORDER ID:</Text>
              <Text fw={450}>{shipment.general_info.job_order_id || "—"}</Text>
            </Group>
            <Group style={{ minHeight: "1rem" }}>
              <Text c="gray.6">QUOTATION FILE:</Text>
              <Text fw={450} truncate>
                {shipment.general_info.quotation_file || "—"}
              </Text>
            </Group>
          </Stack>
        </MantineBox>
      </Paper>

      <Paper
        radius="md"
        withBorder
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MantineBox
          bg="#D4DAE0"
          p="md"
          style={{
            flex: "0 0 20%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text fw={600} size="xl" c="green">
            {shipment.general_info.status || "—"}
          </Text>
          <Text c="jltBlue.8">#{shipment.general_info.id}</Text>
        </MantineBox>

        <MantineBox
          p="lg"
          bg="white"
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <Stack gap="sm" style={{ zIndex: 2, position: "relative" }}>
            <Group gap="xs" wrap="nowrap" style={{ minHeight: "1rem" }}>
              <Text c="gray.6">COMMODITY:</Text>
              <Text fw={450}>{shipment.general_info.commodity || "—"}</Text>
            </Group>
            <Group gap="xs" wrap="nowrap" style={{ minHeight: "1rem" }}>
              <Text c="gray.6">ETA:</Text>
              <Text fw={450}>{shipment.general_info.eta || "—"}</Text>
            </Group>
            <Group gap="xs" wrap="nowrap" style={{ minHeight: "1rem" }}>
              <Text c="gray.6">ETD:</Text>
              <Text fw={450}>{shipment.general_info.etd || "—"}</Text>
            </Group>
          </Stack>

          <Image
            src={shipmentLogo}
            alt="Shipment Logo"
            width={110}
            height={110}
            fit="contain"
            style={{
              position: "absolute",
              right: "-10rem",
              bottom: "0rem",
              zIndex: 1,
            }}
          />
        </MantineBox>
      </Paper>
    </Group>
  );
}

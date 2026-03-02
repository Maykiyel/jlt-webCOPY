import { Card, Group, Text } from "@mantine/core";
export interface SocialCardProps {
  label: string;
  color: string;
  Icon: React.ComponentType;
  count: string;
}

export default function SocialCard({
  label,
  color,
  Icon,
  count,
}: SocialCardProps) {
  return (
    <Card padding={0} radius={"md"} withBorder={false} shadow="sm">
      <Card.Section
        bg={color}
        p={"md"}
        mih={"5rem"}
        display={"flex"}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon />
      </Card.Section>
      <Group justify="space-between" px="sm" py={"xs"}>
        <Text size="xs" tt={"uppercase"}>
          {label}
        </Text>
        <Text size="xs">{count}</Text>
      </Group>
    </Card>
  );
}

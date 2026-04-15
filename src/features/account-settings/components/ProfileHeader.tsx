import { Avatar, Group, Stack, Text, ActionIcon, Tooltip } from "@mantine/core";
import type { User } from "@/types/api";
import { AddTwo } from "@nine-thirty-five/material-symbols-react/rounded";
import { Button } from "@mantine/core";

interface ProfileHeaderProps {
  user: User;
  onChangeAvatar: () => void;
  isEditing: boolean;
  onEdit: () => void;
}

export function ProfileHeader({
  user,
  onChangeAvatar,
  isEditing,
  onEdit,
}: ProfileHeaderProps) {
  const initials = [user.firstName?.[0], user.lastName?.[0]]
    .filter(Boolean)
    .join("")
    .toUpperCase();

  return (
    <Group justify="space-between" px="3.125rem" py="xl">
      {/* Left — avatar + name */}
      <Group gap="lg">
        <div style={{ position: "relative" }}>
          <Avatar
            src={user.imageUrl ?? undefined}
            alt={user.fullName ?? ""}
            size={"5.375rem"}
            color="jltOrange"
          >
            {initials}
          </Avatar>

          <Tooltip label="Change profile photo" withArrow>
            <ActionIcon
              size={"1.75rem"}
              radius="xl"
              color="jltAccent.1"
              variant="filled"
              style={{
                position: "absolute",
                bottom: "0.125rem",
                right: 0,
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
              }}
              onClick={onChangeAvatar}
              aria-label="Change profile photo"
            >
              <AddTwo width="0.875rem" height="0.875rem" color="black" />
            </ActionIcon>
          </Tooltip>
        </div>

        <Stack gap={2}>
          <Text fw={700} size="xl" tt="uppercase">
            {user.fullName}
          </Text>
          <Text size="sm" c="dimmed" fw={600} tt="uppercase">
            {user.companyName}
          </Text>
        </Stack>
      </Group>

      {/* Right — edit / save buttons */}

      {isEditing ? (
        <Button
          h={"2.625rem"}
          type="submit"
          form="profile-form"
          color="jltAccent.6"
        >
          SAVE
        </Button>
      ) : (
        <Button h={"2.625rem"} onClick={onEdit} color="jltAccent.6">
          EDIT
        </Button>
      )}
    </Group>
  );
}

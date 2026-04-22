// src/features/accounts/components/employees/EmployeesList.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { PageCard } from "@/components/PageCard";
import { AppTable, type AppTableColumn } from "@/components/AppTable";
import type { AccountListItem } from "../../types/accounts.types";
import {
  Avatar,
  Group,
  Text,
  Switch,
  Menu,
  ActionIcon,
  Center,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { accountsService } from "../../services/accounts.service";

// Utility to format "minutes ago", "hours ago", "days ago"
function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${diffDay}d ago`;
}

export function EmployeesList() {
  const navigate = useNavigate();
  const { category } = useParams();
  const tab = category || "employees";
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [employees, setEmployees] = useState<AccountListItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    accountsService.getAccountsList(1, perPage).then((data) => {
      setEmployees(data);
      setTotal(data.length);
    });
  }, [perPage]);

  const COLUMNS: AppTableColumn<AccountListItem>[] = [
    {
      key: "name",
      label: "NAME",
      width: "25%",
      render: (row) => (
        <Group>
          <Avatar src={row.avatarUrl ?? undefined} radius="xl" size="md" />
          <Text fw={500} lineClamp={1} size="sm">
            {row.name}
          </Text>
        </Group>
      ),
    },
    {
      key: "email",
      label: "EMAIL",
      width: "17%",
      render: (row) => row.email,
    },
    {
      key: "contactNumber",
      label: "CONTACT NO.",
      width: "15%",
      render: (row) => row.contactNumber,
    },
    {
      key: "role",
      label: "ROLE",
      width: "15%",
      render: (row) => row.role ?? "—",
    },
    {
      key: "isLead",
      label: "LEAD",
      width: "10%",
      render: (row) => (
        <Switch
          checked={row.isLead}
          size="sm"
          disabled
          styles={{
            track: {
              backgroundColor: row.isLead
                ? "var(--mantine-color-green-8)"
                : "var(--mantine-color-gray-4)",
            },
          }}
        />
      ),
    },
    {
      key: "status",
      label: "STATUS",
      width: "10%",
      render: (row) =>
        row.status.state === "ACTIVE" ? (
          <Text c="green" size="xs" fw={800}>
            Active
          </Text>
        ) : (
          <Text c="gray" size="xs">
            Off ({formatRelativeTime(row.status.lastSeen)})
          </Text>
        ),
    },
    {
      key: "action",
      label: "ACTION",
      width: "5%",
      render: () => (
        <Center>
          <Menu shadow="md" width={180}>
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={(e) => e.stopPropagation()} // prevent row click navigation
              >
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item color="orange">Deactivate</Menu.Item>
              <Menu.Item color="red">Archive</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Center>
      ),
    },
  ];

  return (
    <PageCard
      title="LIST OF EMPLOYEES"
      subtext="all employees"
      subtextColor="#17314B"
    >
      <AppTable
        columns={COLUMNS}
        data={employees}
        rowKey={(row) => row.id.toString()}
        withEntryControls
        perPage={perPage}
        onPerPageChange={setPerPage}
        total={total}
        showingCount={employees.length}
        searchPlaceholder="SEARCH EMPLOYEE NAME OR EMAIL"
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={setSearchQuery}
        onRowClick={(row) => navigate(`/accounts/${tab}/${row.id}`)}
      />
    </PageCard>
  );
}

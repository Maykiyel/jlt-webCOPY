import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageCard } from "@/components/PageCard";
import { AppTable, type AppTableColumn } from "@/components/AppTable";
import { accountsService } from "../../services/accounts.service";
import type { AccountListItem } from "../../types/accounts.types";
import { Avatar, Group, Text, Switch, Menu, ActionIcon } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";

const COLUMNS: AppTableColumn<AccountListItem>[] = [
  {
    key: "name",
    label: "NAME",
    width: "25%",
    render: (row) => (
      <Group>
        <Avatar src={row.avatarUrl ?? undefined} radius="xl" size="sm" />
        <Text fw={500}>{row.name}</Text>
      </Group>
    ),
  },
  {
    key: "email",
    label: "EMAIL",
    width: "20%",
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
    render: (row) => row.role,
  },
  {
    key: "isLead",
    label: "LEAD",
    width: "10%",
    render: (row) => {
      const queryClient = useQueryClient();
      const toggleLead = useMutation({
        mutationFn: async () =>
          accountsService.updateAccount(row.id, { isLead: !row.isLead }),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["accounts", "employees", "finance"],
          });
        },
      });

      return (
        <Switch
          checked={row.isLead}
          onChange={() => toggleLead.mutate()}
          size="sm"
          color="green"
        />
      );
    },
  },
  {
    key: "status",
    label: "STATUS",
    width: "10%",
    render: (row) =>
      row.status.state === "ACTIVE" ? (
        <Text c="green">ACTIVE</Text>
      ) : (
        <Text c="gray">OFFLINE ({row.status.lastSeen.toLocaleString()})</Text>
      ),
  },
  {
    key: "action",
    label: "ACTION",
    width: "5%",
    render: (row) => {
      const navigate = useNavigate();
      const queryClient = useQueryClient();

      const deactivate = useMutation({
        mutationFn: () => accountsService.deactivateAccount(row.id),
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ["accounts", "employees", "finance"],
          }),
      });

      const archive = useMutation({
        mutationFn: () => accountsService.archiveAccount(row.id),
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ["accounts", "employees", "finance"],
          }),
      });

      return (
        <Menu shadow="md" width={180}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() =>
                navigate(`/accounts/employees/finance/${row.id}`)
              }
            >
              See Profile
            </Menu.Item>
            <Menu.Item color="orange" onClick={() => deactivate.mutate()}>
              Deactivate Account
            </Menu.Item>
            <Menu.Item color="red" onClick={() => archive.mutate()}>
              Archive Account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    },
  },
];

export function FinanceEmployees() {
  const navigate = useNavigate();
  const { category } = useParams();
  const tab = category || "employees";
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["accounts", "employees", "finance", searchQuery, perPage],
    queryFn: () => accountsService.getAccountsList(1, perPage),
  });

  const employees = data ?? [];
  const total = employees.length;
  const count = employees.length;

  return (
    <PageCard
      title="LIST OF EMPLOYEES"
      subtext="finance"
      subtextColor="#17314B"
    >
      <AppTable
        columns={COLUMNS}
        data={isLoading ? [] : employees}
        rowKey={(row) => row.id.toString()}
        withEntryControls
        perPage={perPage}
        onPerPageChange={setPerPage}
        total={total}
        showingCount={count}
        searchPlaceholder="SEARCH EMPLOYEE NAME OR EMAIL"
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={setSearchQuery}
        onRowClick={(row) =>
          navigate(`/accounts/${tab}/finance/${row.id}`)
        }
      />
    </PageCard>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageCard } from "@/components/PageCard";
import { AppTable, type AppTableColumn } from "@/components/AppTable";
import { accountsService } from "../../services/accounts.service";
import type { AccountListItem } from "../../types/accounts.types";
import { Avatar, Group, Text, Menu, ActionIcon } from "@mantine/core";
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
    key: "companyName",
    label: "COMPANY",
    width: "15%",
    render: (row) => row.companyName ?? "—",
  },
  {
    key: "position",
    label: "POSITION",
    width: "15%",
    render: (row) => row.position ?? "—",
  },
  {
    key: "action",
    label: "ACTION",
    width: "10%",
    render: (row) => {
      const navigate = useNavigate();
      const queryClient = useQueryClient();

      const deactivate = useMutation({
        mutationFn: () => accountsService.deactivateAccount(row.id),
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["accounts", "clients", "new"] }),
      });

      const archive = useMutation({
        mutationFn: () => accountsService.archiveAccount(row.id),
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["accounts", "clients", "new"] }),
      });

      return (
        <Menu shadow="md" width={180}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDotsVertical size={18} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => navigate(`/accounts/clients/new/${row.id}`)}>
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

export function NewClients() {
  const navigate = useNavigate();
  const { category, subCategory } = useParams();
  const tab = category || "clients";
  const sub = subCategory || "new";
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["accounts", "clients", "new", searchQuery, perPage],
    queryFn: () => accountsService.getAccountsList(1, perPage),
  });

  const clients = data ?? [];
  const total = clients.length;
  const count = clients.length;

  return (
    <PageCard
      title="LIST OF NEW CLIENTS"
      subtext="clients"
      subtextColor="#17314B"
    >
      <AppTable
        columns={COLUMNS}
        data={isLoading ? [] : clients}
        rowKey={(row) => row.id.toString()}
        withEntryControls
        perPage={perPage}
        onPerPageChange={setPerPage}
        total={total}
        showingCount={count}
        searchPlaceholder="SEARCH CLIENT NAME OR EMAIL"
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={setSearchQuery}
        onRowClick={(row) => navigate(`/accounts/${tab}/${sub}/${row.id}`)}
      />
    </PageCard>
  );
}

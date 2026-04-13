// src/features/accounts/components/clients/ClientsList.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { PageCard } from "@/components/PageCard";
import { AppTable, type AppTableColumn } from "@/components/AppTable";
import type { AccountListItem } from "../../types/accounts.types";
import {
  Avatar,
  Group,
  Text,
  Menu,
  ActionIcon,
  Center,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { accountsService } from "../../services/accounts.service";

const COLUMNS: AppTableColumn<AccountListItem>[] = [
  {
    key: "name",
    label: "NAME",
    width: "25%",
    render: (row) => (
      <Group>
        <Avatar src={row.avatarUrl ?? undefined} radius="xl" size="md" />
        <Text fw={500} size="sm">{row.name}</Text>
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
    width: "8%",
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
            <Menu.Item color="orange">Deactivate Account</Menu.Item>
            <Menu.Item color="red">Archive Account</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Center>
    ),
  },
];

export function ClientsList() {
  const navigate = useNavigate();
  const { category } = useParams();
  const tab = category || "clients";
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [clients, setClients] = useState<AccountListItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    accountsService.getAccountsList(1, perPage).then((data) => {
      setClients(data);
      setTotal(data.length);
    });
  }, [perPage]);

  return (
    <PageCard
      title="LIST OF ACCOUNTS"
      subtext="clients"
      subtextColor="#17314B"
    >
      <AppTable
        columns={COLUMNS}
        data={clients}
        rowKey={(row) => row.id.toString()}
        withEntryControls
        perPage={perPage}
        onPerPageChange={setPerPage}
        total={total}
        showingCount={clients.length}
        searchPlaceholder="SEARCH CLIENT NAME OR EMAIL"
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={setSearchQuery}
        onRowClick={(row) => navigate(`/accounts/${tab}/${row.id}`)}
      />
    </PageCard>
  );
}

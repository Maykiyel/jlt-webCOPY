import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { PageCard } from "@/components/PageCard";
import { AppTable, type AppTableColumn } from "@/components/AppTable";
import { fetchOngoingShipments } from "../../services/shipments.service";
import {
  SHIPMENT_STATUS,
  type ShipmentListItem,
} from "../../types/shipments.types";

const COLUMNS: AppTableColumn<ShipmentListItem>[] = [
  {
    key: "reference_number",
    label: "REFERENCE",
    width: "18%",
    render: (row) => row.reference_number,
  },
  {
    key: "client",
    label: "CLIENT NAME",
    width: "24%",
    render: (row) => row.client,
  },
  {
    key: "destination",
    label: "DESTINATION",
    width: "24%",
    render: (row) => row.destination,
  },
  {
    key: "eta",
    label: "ETA",
    width: "10%",
    render: (row) => row.eta,
  },
  {
    key: "etd",
    label: "ETD",
    width: "10%",
    render: (row) => row.etd,
  },
  {
    key: "status",
    label: "STATUS",
    width: "14%",
    render: (row) => row.status,
  },
];

export function OngoingShipments() {
  const navigate = useNavigate();
  const { category } = useParams();
  const tab = category || "logistics";
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["shipments", SHIPMENT_STATUS.ONGOING, searchQuery, perPage],
    queryFn: () =>
      fetchOngoingShipments({
        search: searchQuery || undefined,
        perPage,
      }),
  });

  const shipments = data?.shipments ?? [];
  const total = data?.pagination.total ?? 0;
  const count = data?.pagination.count ?? 0;

  return (
    <PageCard
      title="LIST OF SHIPMENTS"
      subtext="ongoing"
      subtextColor="#17314B"
    >
      <AppTable
        columns={COLUMNS}
        data={isLoading ? [] : shipments}
        rowKey={(row) => row.id}
        withEntryControls
        perPage={perPage}
        onPerPageChange={setPerPage}
        total={total}
        showingCount={count}
        searchPlaceholder="SEARCH REFERENCE OR CLIENT NAME"
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={setSearchQuery}
        onRowClick={(row) => navigate(`/shipments/${tab}/client/0/${row.id}`)}
      />
    </PageCard>
  );
}

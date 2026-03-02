import { Divider, Paper } from "@mantine/core";
import {
  RequestQuote,
  DeliveryTruckSpeed,
} from "@nine-thirty-five/material-symbols-react/outlined";
import DonutCard from "./DonutCard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatsOverviewProps {
  quotations: {
    responded_count: number;
    requested_count: number;
  };
  shipments: {
    ongoing_count: number;
    delivered_count: number;
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StatsOverview({
  quotations,
  shipments,
}: StatsOverviewProps) {
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      shadow="sm"
    >
      <DonutCard
        label="Quotations"
        icon={<RequestQuote width="5rem" height="5rem" fill="#bebebe" />}
        primaryLabel="Responded"
        primaryCount={quotations.responded_count}
        primaryColor="jltOrange.5"
        secondaryLabel="Requested"
        secondaryCount={quotations.requested_count}
        secondaryColor="jltAccent.7"
      />
      <Divider orientation="vertical" />
      <DonutCard
        label="Shipments"
        icon={<DeliveryTruckSpeed width="5rem" height="5rem" fill="#bebebe" />}
        primaryLabel="Ongoing"
        primaryCount={shipments.ongoing_count}
        primaryColor="jltOrange.5"
        secondaryLabel="Delivered"
        secondaryCount={shipments.delivered_count}
        secondaryColor="jltAccent.7"
      />
    </Paper>
  );
}

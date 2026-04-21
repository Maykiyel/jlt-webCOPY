import { apiClient } from "@/lib/api/client";
import type {
  ShipmentsIndexResponse,
  ShipmentResource,
  ShipmentStatus,
  PermitsIndexResponse,
  PermitResource,
  LicensesIndexResponse,
  LicenseResource,
  ShipmentApiEnvelope,
  ShipmentListItem,
} from "../types/shipments.types";

// ─── Shipments API ─────────────────────────────────────────────────────────────

export interface FetchShipmentsParams {
  status?: ShipmentStatus;
  search?: string;
  perPage?: number;
}

const DEFAULT_PER_PAGE = 10;

function toShipmentListItem(item: unknown): ShipmentListItem | null {
  if (!item || typeof item !== "object") return null;

  const typedItem = item as {
    id?: number;
    reference_number?: string;
    client?: string;
    destination?: string;
    eta?: string;
    etd?: string;
    status?: string;
    general_info?: {
      id?: number;
      reference_number?: string;
      client?: string;
      destination?: string;
      eta?: string;
      etd?: string;
      status?: string;
    };
  };

  const source = typedItem.general_info ?? typedItem;

  if (!source.reference_number || source.id == null) {
    return null;
  }

  return {
    id: source.id,
    reference_number: source.reference_number,
    client: source.client ?? "—",
    destination: source.destination ?? "—",
    eta: source.eta ?? "—",
    etd: source.etd ?? "—",
    status: source.status ?? "—",
  };
}

function normalizeShipmentsIndexResponse(
  payload: unknown,
  perPage: number,
): ShipmentsIndexResponse {
  const emptyResponse: ShipmentsIndexResponse = {
    shipments: [],
    pagination: {
      count: 0,
      per_page: perPage,
      total: 0,
    },
  };

  if (!payload || typeof payload !== "object") return emptyResponse;

  const typedPayload = payload as {
    shipments?: unknown[];
    data?: unknown[];
    pagination?: { count?: number; per_page?: number; total?: number };
    meta?: { total?: number; per_page?: number };
  };

  const sourceItems =
    typedPayload.shipments ??
    (Array.isArray(typedPayload.data)
      ? typedPayload.data
      : Array.isArray(payload)
        ? payload
        : []);

  const shipments = sourceItems
    .map((item) => toShipmentListItem(item))
    .filter((item): item is ShipmentListItem => item !== null);

  const total =
    typedPayload.pagination?.total ??
    typedPayload.meta?.total ??
    shipments.length;
  const perPageValue =
    typedPayload.pagination?.per_page ?? typedPayload.meta?.per_page ?? perPage;

  return {
    shipments,
    pagination: {
      count: typedPayload.pagination?.count ?? shipments.length,
      per_page: perPageValue,
      total,
    },
  };
}

export async function fetchOngoingShipments(params: Omit<FetchShipmentsParams, "status">): Promise<ShipmentsIndexResponse> {
  return fetchShipments({ ...params, status: "ONGOING" });
}

export async function fetchDeliveredShipments(params: Omit<FetchShipmentsParams, "status">): Promise<ShipmentsIndexResponse> {
  return fetchShipments({ ...params, status: "DELIVERED" });
}

export async function fetchShipments(
  params: FetchShipmentsParams,
): Promise<ShipmentsIndexResponse> {
  const perPage = params.perPage ?? DEFAULT_PER_PAGE;

  try {
    const response = await apiClient.get<ShipmentApiEnvelope<unknown>>(
      "/shipments",
      {
        params: {
          ...(params.status ? { "filter[status]": params.status } : {}),
          ...(params.search ? { search: params.search } : {}),
          ...(params.perPage ? { perPage: params.perPage } : {}),
        },
      },
    );

    return normalizeShipmentsIndexResponse(response.data.data, perPage);
  } catch {
    return {
      shipments: [],
      pagination: {
        count: 0,
        per_page: perPage,
        total: 0,
      },
    };
  }
}

export async function fetchShipment(id: string): Promise<ShipmentResource> {
  const response = await apiClient.get<ShipmentApiEnvelope<ShipmentResource>>(
    `/shipments/${id}`,
  );

  if (!response.data.data) {
    throw new Error(`Shipment with ID ${id} not found`);
  }

  return response.data.data;
}

// ─── Permits API ──────────────────────────────────────────────────────────────

export interface FetchPermitsParams {
  search?: string;
  perPage?: number;
  clientId?: number;
}

export async function fetchPermits(
  params: FetchPermitsParams,
): Promise<PermitsIndexResponse> {
  try {
    const response = await apiClient.get<{ data: PermitsIndexResponse }>(
      "/permits",
      {
        params: {
          ...(params.search ? { search: params.search } : {}),
          ...(params.perPage ? { perPage: params.perPage } : {}),
          ...(params.clientId ? { client_id: params.clientId } : {}),
        },
      },
    );
    return (
      response.data.data || {
        permits: [],
        pagination: {
          count: 0,
          per_page: params.perPage || 10,
          total: 0,
        },
      }
    );
  } catch {
    return {
      permits: [],
      pagination: {
        count: 0,
        per_page: params.perPage || 10,
        total: 0,
      },
    };
  }
}

export async function fetchPermit(id: string): Promise<PermitResource> {
  const response = await apiClient.get<{ data: PermitResource }>(
    `/permits/${id}`,
  );
  return response.data.data;
}

// ─── Licenses API ─────────────────────────────────────────────────────────────

export interface FetchLicensesParams {
  search?: string;
  perPage?: number;
  clientId?: number;
}

export async function fetchLicenses(
  params: FetchLicensesParams,
): Promise<LicensesIndexResponse> {
  try {
    const response = await apiClient.get<{ data: LicensesIndexResponse }>(
      "/licenses",
      {
        params: {
          ...(params.search ? { search: params.search } : {}),
          ...(params.perPage ? { perPage: params.perPage } : {}),
          ...(params.clientId ? { client_id: params.clientId } : {}),
        },
      },
    );
    return (
      response.data.data || {
        licenses: [],
        pagination: {
          count: 0,
          per_page: params.perPage || 10,
          total: 0,
        },
      }
    );
  } catch {
    return {
      licenses: [],
      pagination: {
        count: 0,
        per_page: params.perPage || 10,
        total: 0,
      },
    };
  }
}

export async function fetchLicense(id: string): Promise<LicenseResource> {
  const response = await apiClient.get<{ data: LicenseResource }>(
    `/licenses/${id}`,
  );
  return response.data.data;
}

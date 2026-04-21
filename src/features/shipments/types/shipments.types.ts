// ─── Shipment API shape ───────────────────────────────────────────────────────

export interface ShipmentGeneralInfo {
  id: number;
  reference_number: string;
  job_order_id: number;
  quotation_file: string;
  client: string;
  status: string;
  commodity: string;
  destination: string;
  eta: string;
  etd: string;
  date: string;
}

export interface ShipmentCommodityDetails {
  commodity: string;
  consignee_name: string;
  cargo_type: string;
  container_size: string;
}

export interface ShipmentContactPerson {
  full_name: string;
  contact_number: string;
  email: string;
}

export interface ShipmentInformationDetails {
  origin: string;
  destination: string;
  account_handler: string;
  created_at: string;
  updated_at: string;
}

export interface ShipmentResource {
  general_info: ShipmentGeneralInfo;
  commodity_details: ShipmentCommodityDetails;
  contact_person: ShipmentContactPerson;
  shipment_information: ShipmentInformationDetails;
}

export interface ShipmentApiEnvelope<T> {
  message: string;
  data: T;
  code: number;
  error: boolean;
}

// ─── UI-friendly list shape ───────────────────────────────────────────────────

export interface ShipmentListItem {
  id: number;
  reference_number: string;
  client: string;
  destination: string;
  eta: string;
  etd: string;
  status: string;
}

export interface ShipmentsPagination {
  count: number;
  per_page: number;
  total: number;
}

export interface ShipmentsIndexResponse {
  shipments: ShipmentListItem[];
  pagination: ShipmentsPagination;
}

// ─── Status filter ─────────────────────────────────────────────────────────────

export const SHIPMENT_STATUS = {
  ONGOING: "ONGOING",
  DELIVERED: "DELIVERED",
} as const;

export type ShipmentStatus =
  (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];

//Confirmation for details regarding Permits and Licenses is still pending, so these are just placeholders for now.
// ─── Permits ──────────────────────────────────────────────────────────────────

export interface PermitListItem {
  id: string;
  permit_number: string;
  client_name: string;
  permit_type: string;
  issued_date: string;
  expiry_date: string;
  status: string;
}

export interface PermitClientGroup {
  client_id: number;
  name: string;
  permit_count: number;
  permits: PermitListItem[];
}

export interface PermitsIndexResponse {
  permits: PermitClientGroup[];
  pagination: ShipmentsPagination;
}

export interface PermitResource {
  id: string;
  permit_number: string;
  client: {
    full_name: string;
    company_name: string;
    contact_number: string;
    email: string;
  } | null;
  permit_type: string;
  issued_date: string;
  expiry_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  remarks: string | null;
}

// ─── Licenses ─────────────────────────────────────────────────────────────────

export interface LicenseListItem {
  id: string;
  license_number: string;
  client_name: string;
  license_type: string;
  issued_date: string;
  expiry_date: string;
  status: string;
}

export interface LicenseClientGroup {
  client_id: number;
  name: string;
  license_count: number;
  licenses: LicenseListItem[];
}

export interface LicensesIndexResponse {
  licenses: LicenseClientGroup[];
  pagination: ShipmentsPagination;
}

export interface LicenseResource {
  id: string;
  license_number: string;
  client: {
    full_name: string;
    company_name: string;
    contact_number: string;
    email: string;
  } | null;
  license_type: string;
  issued_date: string;
  expiry_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  remarks: string | null;
}

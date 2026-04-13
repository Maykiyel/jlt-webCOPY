import type { AccountListItem } from "../types/accounts.types";

export const mockEmployees: AccountListItem[] = [
  {
    id: 101,
    avatarUrl: null,
    name: "Daniel Cruz",
    email: "danielcruz.jltcb@gmail.com",
    contactNumber: "+63-917-111-2222",
    role: "Finance Specialist",
    isLead: true,
    status: { state: "ACTIVE" },
    lifecycle: "ACTIVE",
  },
  {
    id: 102,
    avatarUrl: null,
    name: "Ella Tan",
    email: "ellatan.jltcb@gmail.com",
    contactNumber: "+63-917-333-4444",
    role: "HR Coordinator",
    isLead: false,
    status: { state: "OFFLINE", lastSeen: new Date("2026-04-07T20:00:00") },
    lifecycle: "ACTIVE",
  },
  {
    id: 103,
    avatarUrl: null,
    name: "Francis Lee",
    email: "francislee.jltcb@gmail.com",
    contactNumber: "+63-917-555-6666",
    role: "IT Engineer",
    isLead: false,
    status: { state: "ACTIVE" },
    lifecycle: "INACTIVE",
  },
];

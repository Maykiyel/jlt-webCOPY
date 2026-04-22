import type { AccountDetails } from "../types/accounts.types";

export const mockClients: AccountDetails[] = [
  {
    id: 1,
    accountInfo: {
      fullName: "Alice Johnson",
      username: "alice.j",
      email: "alice.johnson@example.com",
      contactNumber: "+1-555-1234",
    },
    security: {
      passwordHash: "hashed-password-1",
    },
    companyInfo: {
      companyName: "Acme Corp",
      position: "Purchasing Manager",
      companyAddress: "123 Main St, Springfield",
      businessType: "Manufacturing",
    },
    identification: {
      idImageUrl: "/static/id-alice.png",
      profileImageUrl: null,
    },
    isLead: false,
    lifecycle: "ACTIVE",
    status: { state: "ACTIVE" },
  },
  {
    id: 2,
    accountInfo: {
      fullName: "Brian Smith",
      username: "brian.s",
      email: "brian.smith@example.com",
      contactNumber: "+1-555-5678",
    },
    security: {
      passwordHash: "hashed-password-2",
    },
    companyInfo: {
      companyName: "Globex Inc",
      position: "Operations Director",
      companyAddress: "456 Market St, Metropolis",
      businessType: "Logistics",
    },
    identification: {
      idImageUrl: "/static/id-brian.png",
      profileImageUrl: null,
    },
    isLead: true,
    lifecycle: "ACTIVE",
    status: { state: "OFFLINE", lastSeen: new Date("2026-04-07T15:30:00") },
  },
  {
    id: 3,
    accountInfo: {
      fullName: "Carla Reyes",
      username: "carla.r",
      email: "carla.reyes@example.com",
      contactNumber: "+63-912-345-6789",
    },
    security: {
      passwordHash: "hashed-password-3",
    },
    companyInfo: {
      companyName: "Innotech Solutions",
      position: "Finance Officer",
      companyAddress: "789 Innovation Blvd, Manila",
      businessType: "Technology",
    },
    identification: {
      idImageUrl: "/static/id-carla.png",
      profileImageUrl: null,
    },
    isLead: false,
    lifecycle: "INACTIVE",
    status: { state: "ACTIVE" },
  },
];

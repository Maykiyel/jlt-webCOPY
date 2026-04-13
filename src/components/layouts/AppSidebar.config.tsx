import {
  Dashboard,
  DiversityTwo,
  Box as BoxIcon,
  RequestQuote,
  ManageAccounts,
  FolderManaged,
} from "@nine-thirty-five/material-symbols-react/rounded";
import type { NavItem } from "./AppSidebarUtils";
import { ROLES } from "@/types/roles";

// Default items (for all roles except IT)
const DEFAULT_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    icon: <Dashboard width="2rem" height="2rem" />,
    label: "Dashboard",
    path: "/",
  },
  {
    id: "leads",
    icon: <DiversityTwo width="2rem" height="2rem" />,
    label: "Leads",
    subItems: [
      { label: "Queries", path: "/leads/queries" },
      { label: "New", path: "/leads/new" },
      { label: "Replied", path: "/leads/replied" },
    ],
  },
  {
    id: "shipments",
    icon: <BoxIcon width="2rem" height="2rem" />,
    label: "Shipments",
    subItems: [
      {
        label: "Logistics",
        path: "/shipments/logistics",
        subItems: [
          { label: "Ongoing", path: "/shipments/logistics/ongoing" },
          { label: "Delivered", path: "/shipments/logistics/delivered" },
        ],
      },
      {
        label: "Regulatory",
        path: "/shipments/regulatory",
        subItems: [
          { label: "Permits", path: "/shipments/regulatory/permits" },
          { label: "Licenses", path: "/shipments/regulatory/licenses" },
        ],
      },
    ],
  },
  {
    id: "quotations",
    icon: <RequestQuote width="2rem" height="2rem" />,
    label: "Quotations",
    subItems: [
      { label: "Requests", path: "/quotations/requested" },
      { label: "Responded", path: "/quotations/responded" },
      { label: "Accepted", path: "/quotations/accepted" },
      { label: "Discarded", path: "/quotations/discarded" },
    ],
  },
  {
    id: "accounts",
    icon: <ManageAccounts width="2rem" height="2rem" />,
    label: "Accounts",
    subItems: [
      { label: "Clients",
        path: "/accounts/clients", 
        subItems: [
          { label: "Old", path: "/accounts/clients/old" },
          { label: "New", path: "/accounts/clients/new" },
        ],
      },
      { 
        label: "Employees", 
        path: "/accounts/employees",
        subItems: [
          { label: "Operations", path: "/accounts/employees/operations" },
          { label: "Account Specialists", path: "/accounts/employees/account-specialists" },
          { label: "Human Resources", path: "/accounts/employees/hr" },
          { label: "IT", path: "/accounts/employees/it" },
          { label: "Finance", path: "/accounts/employees/finance" },
        ],
      },
    ],
  },
  {
    id: "tools",
    icon: <FolderManaged width="2rem" height="2rem" />,
    label: "Tools",
    path: "/tools",
  },
];

// Role-aware builder
export function getNavItems(role: string): NavItem[] {
  if (role === ROLES.IT) {
    // IT role: only Dashboard + Accounts
    return [
      {
        id: "dashboard",
        icon: <Dashboard width="2rem" height="2rem" />,
        label: "Dashboard",
        path: "/",
      },
      {
        id: "accounts",
        icon: <ManageAccounts width="2rem" height="2rem" />,
        label: "Accounts",
        subItems: [
          { label: "Clients",
            path: "/accounts/clients", 
            subItems: [
              { label: "Old", path: "/accounts/clients/old" },
              { label: "New", path: "/accounts/clients/new" },
            ],
          },
          { 
            label: "Employees", 
            path: "/accounts/employees",
            subItems: [
              { label: "AS", path: "/accounts/employees/account-specialists" },
              { label: "HR", path: "/accounts/employees/human-resources" },
              { label: "IT", path: "/accounts/employees/it" },
              { label: "Marketing", path: "/accounts/employees/marketing" },
              { label: "Operations", path: "/accounts/employees/operations" },
              { label: "Finance", path: "/accounts/employees/finance" },
            ],
          },
        ],
      },
    ];
  }

  // No roles return default menu
  return DEFAULT_ITEMS;
}

export const BTN_HEIGHT_REM = 5;
export const PILL_HEIGHT_REM = 3.5;
export const RAIL_PADDING_TOP_REM = 1.125;
export const PANEL_BASE_PADDING_REM = 1;
export const PANEL_INDENT_STEP_REM = 1;

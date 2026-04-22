// src/features/accounts/pages/AccountsPage.tsx
import { Navigate, useParams } from "react-router";
import { OldClients } from "@/features/accounts/components/clients/OldClients";
import { NewClients } from "@/features/accounts/components/clients/NewClients";
import { ClientsList } from "@/features/accounts/components/clients/ClientsList";
import { OperationsEmployees } from "@/features/accounts/components/employees/OperationsEmployees";
import { AccountSpecialistsEmployees } from "@/features/accounts/components/employees/AccountSpecialistsEmployees";
import { HumanResourcesEmployees } from "@/features/accounts/components/employees/HumanResourcesEmployees";
import { ITEmployees } from "@/features/accounts/components/employees/ITEmployees";
import { FinanceEmployees } from "@/features/accounts/components/employees/FinanceEmployees";
import { MarketingEmployees } from "@/features/accounts/components/employees/MarketingEmployees";
import { EmployeesList } from "@/features/accounts/components/employees/EmployeesList";
import { AccountsProfile } from "@/features/accounts/pages/AccountsProfile";

export default function AccountsPage() {
  const { category, subCategory, id } = useParams();

  // Default route: /accounts -> redirect to /accounts/clients
  if (!category) {
    return <Navigate to="/accounts/clients" replace />;
  }

  // If an ID is present, show the profile view
  if (id) {
    return <AccountsProfile />;
  }

  // Clients routes
  if (category === "clients") {
    switch (subCategory) {
      case "old":
        return <OldClients />;
      case "new":
        return <NewClients />;
      default:
        return <ClientsList />;
    }
  }

  // Employees routes
  if (category === "employees") {
    switch (subCategory) {
      case "account-specialists":
        return <AccountSpecialistsEmployees />;
      case "human-resources":
        return <HumanResourcesEmployees />;
      case "it":
        return <ITEmployees />;
      case "marketing":
        return <MarketingEmployees />;
      case "operations":
        return <OperationsEmployees />;
      case "finance":
        return <FinanceEmployees />;
      default:
        return <EmployeesList />;
    }
  }

  // Fallback: redirect to /accounts/clients
  return <Navigate to="/accounts/clients" replace />;
}

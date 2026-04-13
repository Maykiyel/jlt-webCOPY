// src/features/accounts/pages/AccountsProfile.tsx
import { useParams } from "react-router";
import { ClientProfile } from "../components/clients/ClientProfile";
import { EmployeeProfile } from "../components/employees/EmployeeProfile";  

export function AccountsProfile() {
  const { category } = useParams();

  if (category === "clients") {
    return <ClientProfile />;
  }

  if (category === "employees") {
     return <EmployeeProfile />;
  }

  return <div>Profile not found</div>;
}

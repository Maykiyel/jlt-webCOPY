import { useParams } from "react-router";
import { ClientsList } from "../components/clients/ClientsList";
import { EmployeesList } from "../components/employees/EmployeesList";

export function AccountsList() {
  const { category } = useParams();

  if (category === "clients") {
    return <ClientsList />;
  }

  if (category === "employees") {
    return <EmployeesList />;
  }

  // fallback if no category
  return <div>Select a category</div>;
}

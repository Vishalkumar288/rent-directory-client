import { getAllTenants } from "../Rent/service";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllTenants = () => {
  const AllTenantData = useQuery(
    ["query-get-all-tenants"],
    () => getAllTenants(),
    {
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false
    }
  );

  return AllTenantData;
};

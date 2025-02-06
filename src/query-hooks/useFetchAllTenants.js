import { getAllTenants } from "../Rent/service";
import { useQuery } from "@tanstack/react-query";
import Storage from "../shared/utils/Storage";
import { StorageKeys } from "../constants/storageKeys";

export const useFetchAllTenants = () => {
  const isDemoUser = Storage.getItem(StorageKeys.DEMO_LOGIN);
  const AllTenantData = useQuery(
    ["query-get-all-tenants", Boolean(isDemoUser)],
    () => getAllTenants(Boolean(isDemoUser) ? { demoLogin: true } : {}),
    {
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false
    }
  );

  return AllTenantData;
};

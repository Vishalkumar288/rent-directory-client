import { getFormData } from "../Rent/service";
import { useQuery } from "@tanstack/react-query";
import Storage from "../shared/utils/Storage";
import { StorageKeys } from "../constants/storageKeys";

export const useFetchAllTenantFormData = () => {
  const isDemoUser = Storage.getItem(StorageKeys.DEMO_LOGIN);
  const AllTenantData = useQuery(
    ["query-get-form-data", Boolean(isDemoUser)],
    () => getFormData(Boolean(isDemoUser) ? { demoLogin: true } : {}),
    {
      enabled: true,
      refetchOnWindowFocus: false
    }
  );

  return AllTenantData;
};

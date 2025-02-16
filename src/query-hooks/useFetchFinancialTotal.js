import { getFinancialTotal } from "../Rent/service";
import { useQuery } from "@tanstack/react-query";
import Storage from "../shared/utils/Storage";
import { StorageKeys } from "../constants/storageKeys";

export const useFetchFinancialTotal = (params) => {
  const isDemoUser = Storage.getItem(StorageKeys.DEMO_LOGIN);
  const TenantData = useQuery(
    ["query-get-Financial-Total", params, Boolean(isDemoUser)],
    () =>
      getFinancialTotal({
        ...params,
        ...{ ...(Boolean(isDemoUser) ? { demoLogin: true } : {}) }
      }),
    {
      enabled: Boolean(params),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  );

  return TenantData;
};

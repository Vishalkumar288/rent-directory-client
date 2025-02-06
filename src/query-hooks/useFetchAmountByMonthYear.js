import { getAmounts } from "../Rent/service";
import { useQuery } from "@tanstack/react-query";
import Storage from "../shared/utils/Storage";
import { StorageKeys } from "../constants/storageKeys";

export const useFetchAmountByMonthYear = (params) => {
  const isDemoUser = Storage.getItem(StorageKeys.DEMO_LOGIN);
  const AmountData = useQuery(
    ["query-get-amount-by-month-year", params, Boolean(isDemoUser)],
    () =>
      getAmounts({
        ...params,
        ...{ ...(Boolean(isDemoUser) ? { demoLogin: true } : {}) }
      }),
    {
      enabled: Boolean(params),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  );

  return AmountData;
};

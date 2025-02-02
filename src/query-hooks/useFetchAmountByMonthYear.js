import { getAmounts } from "../Rent/service";
import { useQuery } from "@tanstack/react-query";

export const useFetchAmountByMonthYear = (params) => {
  const AmountData = useQuery(
    ["query-get-amount-by-month-year", params],
    () => getAmounts(params),
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

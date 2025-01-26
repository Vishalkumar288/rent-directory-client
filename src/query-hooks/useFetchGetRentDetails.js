import { getTenantDetails } from "../Rent/service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchGetRentDetails = (sheetId) => {
  const TenantData = useInfiniteQuery(
    ["query-get-tenants-details", sheetId],
    ({ pageParam = 1 }) => getTenantDetails(sheetId, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage?.data?.rows?.length > 0 &&
          lastPage?.data?.rows?.length === lastPage?.data?.pageSize
            ? allPages.length + 1
            : undefined;
        return nextPage;
      },
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false,
      keepPreviousData: true
    }
  );

  return TenantData;
};

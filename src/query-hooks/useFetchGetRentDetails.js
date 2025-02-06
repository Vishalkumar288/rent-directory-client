import { getTenantDetails } from "../Rent/service";
import { useInfiniteQuery } from "@tanstack/react-query";
import Storage from "../shared/utils/Storage";
import { StorageKeys } from "../constants/storageKeys";

export const useFetchGetRentDetails = (sheetId) => {
  const isDemoUser = Storage.getItem(StorageKeys.DEMO_LOGIN);
  const TenantData = useInfiniteQuery(
    ["query-get-tenants-details", sheetId, Boolean(isDemoUser)],
    ({ pageParam = 1 }) =>
      getTenantDetails(
        sheetId,
        pageParam,
        Boolean(isDemoUser) ? { demoLogin: true } : {}
      ),
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

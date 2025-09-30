import { TierInfoResponse } from "@/components/types";
import { tierInfoApi } from "@/utils/tierInfo";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const TIER_INFO_KEYS = {
  all: ["tierInfo"] as const,
  tracker: (trackerId: string) =>
    [...TIER_INFO_KEYS.all, "tracker", trackerId] as const,
};

export const useTierInfo = (
  trackerId: string,
  options?: Omit<
    UseQueryOptions<TierInfoResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<TierInfoResponse, Error>({
    queryKey: TIER_INFO_KEYS.tracker(trackerId),
    queryFn: () => tierInfoApi.getProgressTracker(trackerId),
    enabled: !!trackerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

// useTierInfoData hook to extract and return only the data part
export const useTierInfoData = (trackerId: string) => {
  const { data, isLoading, isError, error, refetch } = useTierInfo(trackerId);
  return {
    tierData: data?.data,
    status: data?.status,
    message: data?.message,
    isLoading,
    isError,
    error,
    refetch,
  };
};

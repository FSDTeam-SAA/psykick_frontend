import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tmcService } from "@/lib/tmc-service";

export function useActiveTMCTarget() {
  return useQuery({
    queryKey: ["activeTMCTarget"],
    queryFn: tmcService.getActiveTarget,
    refetchInterval: 1000 * 60, // Refetch every minute
  });
}

export function useTMCSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tmcService.submitChoices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeTMCTarget"] });
    },
  });
}

export function useTMCResult(targetId: string) {
  return useQuery({
    queryKey: ["tmcResult", targetId],
    queryFn: () => tmcService.getResult(targetId),
    enabled: !!targetId,
    refetchInterval: 1000 * 30, // Refetch every 30s
    refetchIntervalInBackground: true,
    retry: true,
    retryDelay: 5000, // Retry every 5s if failed
  });
}

import { useQuery } from "@tanstack/react-query";

export function useActiveARVTarget() {
  return useQuery({
    queryKey: ["activeARVTarget"],
    queryFn: async () => {
      const response = await fetch("/api/challenges/arv/active");
      if (!response.ok) {
        throw new Error("Failed to fetch active ARV target");
      }
      const data = await response.json();
      return {
        ...data.data,
        targetId: data.data._id,
      };
    },
  });
}

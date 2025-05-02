import { useQuery, useMutation } from "@tanstack/react-query";
// import { queryClient } from "@/lib/react-query";

export function useActiveARVTarget() {
  return useQuery({
    queryKey: ["activeARVTarget"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ARVTarget/get-activeARVTarget`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch active ARV target");
      }
      const data = await response.json();
      return {
        ...data.data,
        targetId: data.data._id,
        revealTime: data.data.revealTime,
        eventTime: data.data.eventTime,
      };
    },
  });
}

export function useSubmitARVTarget() {
  return useMutation({
    mutationFn: async ({
      submittedImage,
      ARVTargetId,
    }: {
      submittedImage: string;
      ARVTargetId: string;
    }) => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/submit-ARVTarget`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ submittedImage, ARVTargetId }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit ARV target");
      }
      return response.json();
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["activeARVTarget"]);
    // },
  });
}

export function useUpdateARVPoints(arvId: string) {
  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/update-ARVPoints/${arvId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update ARV points");
      }
      return response.json();
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["arvResult"]);
    // },
  });
}

export function useARVResult(arvId: string) {
  return useQuery({
    queryKey: ["arvResult", arvId],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/get-ARVResult/${arvId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch ARV result");
      }
      return response.json();
    },
    enabled: !!arvId,
  });
}

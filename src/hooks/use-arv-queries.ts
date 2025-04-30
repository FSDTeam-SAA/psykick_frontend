import { useQuery, useMutation } from "@tanstack/react-query";

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
      };
    },
  });
}

export function useSubmitARVTarget() {
  return useMutation({
    mutationKey: ["submitARVTarget"],
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
  });
}

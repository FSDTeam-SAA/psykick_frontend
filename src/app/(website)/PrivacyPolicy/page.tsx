"use client";

import { PrivacyPolicyData } from "@/components/types/PrivacyPolicy";
import { useQuery } from "@tanstack/react-query";

const PrivacyPolicyPage = () => {
  const { data, isLoading, isError, error } = useQuery<PrivacyPolicyData>({
    queryKey: ["privacy-policy"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/privacy-policy/get-privacy-policies`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch privacy policy");
      }

      return res.json();
    },
  });

  const privacyPolicyContent = data?.data?.[0]?.content;
  // console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <p className="text-white text-lg animate-pulse">
          Loading Privacy Policy...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500">
        <p className="text-white text-lg font-semibold">
          Error:{" "}
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 container mx-auto  mt-10">
      <div className="">
        {privacyPolicyContent ? (
          <div className="space-y-6 leading-relaxed text-lg text-white">
            {/* Render HTML content safely */}
            <div dangerouslySetInnerHTML={{ __html: privacyPolicyContent }} />
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No privacy policy content available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

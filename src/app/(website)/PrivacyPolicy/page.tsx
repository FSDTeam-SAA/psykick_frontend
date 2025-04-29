"use client";

import { PrivacyPolicyData } from "@/components/types/PrivacyPolicy";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

const PrivacyPolicyPage = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Ensuring token is fetched only on the client-side
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const { data, isLoading, isError, error } = useQuery<PrivacyPolicyData>({
    queryKey: ["privacy-policy"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token is not available");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/privacy-policy/get-privacy-policies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch privacy policy");
      }

      return res.json();
    },
    enabled: !!token, // Only run the query if token is available
  });

  const privacyPolicyContent = data?.data?.[0]?.content;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <p className="text-white text-lg animate-pulse">Loading Privacy Policy...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500">
        <p className="text-white text-lg font-semibold">
          Error: {error instanceof Error ? error.message : "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#371B77] py-12 px-6">
      <div className="bg-white/90 backdrop-blur-md border border-blue-200 p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Privacy Policy</h1>
        {privacyPolicyContent ? (
          <div className="text-gray-800 space-y-6 leading-relaxed text-lg">
            {/* Render HTML content safely */}
            <div dangerouslySetInnerHTML={{ __html: privacyPolicyContent }} />
          </div>
        ) : (
          <p className="text-center text-gray-500">No privacy policy content available.</p>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

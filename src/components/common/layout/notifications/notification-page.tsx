"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { Pagination } from "../../pagination-component";
import { PaginationInfo } from "../../pagination-info";

interface NotificationItem {
  _id: string;
  userId: string | null;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PaginationData {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

interface NotificationsResponse {
  status: boolean;
  message: string;
  data: NotificationItem[];
  pagination: PaginationData;
}

const NotificationPage = () => {
  const { user } = useAuth();
  const userId = user?._id;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useQuery<NotificationsResponse>({
    queryKey: ["notifications", userId, currentPage, itemsPerPage],
    enabled: !!userId,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/get-notifications/${userId}?page=${currentPage}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch notifications");
      }

      return res.json();
    },
  });

  const notifications = notificationsData?.data || [];
  const pagination = notificationsData?.pagination || {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 10,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#300070] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-purple-700/50 rounded mb-4"></div>
          <div className="h-4 w-64 bg-purple-700/50 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#300070] flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg max-w-md text-center">
          <p className="font-medium">Failed to load notifications</p>
          <p className="text-sm mt-2">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#300070]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white smallTextShadow mb-4 mt-20">
          Notifications
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white text-center max-w-4xl mx-auto mb-12 px-2">
          Stay informed with the latest updates from Psykick Club! Here,
          you&apos;ll find notifications about your ARV and TMC results, new
          challenges, special offers, upcoming features, and important
          announcements. Check back regularly to stay up to date and make the
          most of your Psykick experience!
        </p>

        {notifications.length === 0 ? (
          <div className="bg-white/10 border border-white/20 rounded-xl p-8 text-center backdrop-blur-sm">
            <Bell className="text-yellow-400 mx-auto mb-4 h-12 w-12 opacity-50" />
            <p className="text-gray-300 text-lg">No notifications available.</p>
            <p className="text-gray-400 text-sm mt-2">
              Check back later for updates!
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {notifications.map((notification: NotificationItem) => (
                <div
                  key={notification._id}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 sm:px-6 sm:py-5 shadow-md backdrop-blur-sm flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center transition-all hover:bg-white/15"
                >
                  <div className="flex gap-4 items-start sm:items-center">
                    <Bell className="text-yellow-400 mt-1 sm:mt-0 shrink-0" />
                    <h2 className="text-white font-medium text-sm sm:text-base">
                      {notification.message}
                    </h2>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm sm:whitespace-nowrap">
                    {new Date(notification.updatedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <PaginationInfo
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                totalItems={pagination.totalItems}
                onItemsPerPageChange={handleItemsPerPageChange}
              />

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

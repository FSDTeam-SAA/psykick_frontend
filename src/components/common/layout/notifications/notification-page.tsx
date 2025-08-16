"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Trash2, Loader2 } from "lucide-react";
import { Pagination } from "../../pagination-component";
import { PaginationInfo } from "../../pagination-info";
import { useChallengeStore } from "@/store/use-challenge-store";
import { useRouter } from "next/navigation";

interface NotificationItem {
  _id: string;
  userId: string | null;
  message: string;
  targetCode?: string;
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
  const { setActiveTab } = useChallengeStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    notificationId: string | null;
    notificationMessage: string;
  }>({
    isOpen: false,
    notificationId: null,
    notificationMessage: "",
  });

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

  // Delete mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/delete-notification/${notificationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete notification");
      }

      return res.json();
    },
    onMutate: (notificationId: string) => {
      // Add to deleting set to show loading state
      setDeletingIds((prev) => new Set(prev).add(notificationId));
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: Error) => {
      console.error("Delete notification error:", error);
      // You can add toast notification here if you have a toast system
      alert(`Failed to delete notification: ${error.message}`);
    },
    onSettled: (_, __, notificationId: string) => {
      // Remove from deleting set
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    },
  });

  const notifications = notificationsData?.data || [];

  const handleDelete = (
    e: React.MouseEvent,
    notificationId: string,
    notificationMessage: string,
  ) => {
    e.stopPropagation(); // Prevent triggering the notification click

    setDeleteModal({
      isOpen: true,
      notificationId,
      notificationMessage,
    });
  };

  const confirmDelete = () => {
    if (deleteModal.notificationId) {
      deleteNotificationMutation.mutate(deleteModal.notificationId);
    }
    closeDeleteModal();
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      notificationId: null,
      notificationMessage: "",
    });
  };

  const handelRrdc = (rdc: string) => {
    if (rdc === "New TMC game has started") {
      router.push("/challenges");
      setActiveTab("tmc");
    } else if (rdc === "New ARV game has started") {
      router.push("/challenges");
      setActiveTab("arv");
    }
  };

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
                  onClick={() => handelRrdc(notification.message)}
                  key={notification._id}
                  className="bg-white/10 cursor-pointer border border-white/20 rounded-xl px-4 py-4 sm:px-6 sm:py-5 shadow-md backdrop-blur-sm flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center transition-all hover:bg-white/15 group"
                >
                  <div className="flex gap-4 items-start sm:items-center flex-1">
                    <Bell className="text-yellow-400 mt-1 sm:mt-0 shrink-0" />
                    <h2 className="text-white font-medium text-sm sm:text-base">
                      {notification.message}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <p className="text-gray-300 text-xs sm:text-sm sm:whitespace-nowrap">
                      {new Date(notification.updatedAt).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        },
                      )}
                    </p>

                    <button
                      onClick={(e) =>
                        handleDelete(e, notification._id, notification.message)
                      }
                      disabled={deletingIds.has(notification._id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 sm:opacity-100"
                      title="Delete notification"
                    >
                      {deletingIds.has(notification._id) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
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

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl max-w-md w-full mx-4 shadow-2xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/20 rounded-full">
                    <Trash2 className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Delete Notification
                  </h3>
                </div>

                <p className="text-gray-300 mb-2 ">
                  Are you sure you want to delete this notification?
                </p>

                <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-6 bg-gradient">
                  <p className="text-sm text-gray-200 line-clamp-3">
                    &apos;{deleteModal.notificationMessage}&apos;
                  </p>
                </div>

                <p className="text-sm text-gray-400 mb-6">
                  This action cannot be undone.
                </p>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={closeDeleteModal}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
                    disabled={deleteNotificationMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleteNotificationMutation.isPending}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {deleteNotificationMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

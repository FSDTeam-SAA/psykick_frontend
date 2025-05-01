/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import { X } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { NotificationModal } from "@/components/common/layout/notifications/notifications-modal";
// import { useAuth } from "@/hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";

// interface Notification {
//   id: string;
//   avatar: string;
//   message: string;
//   date: string;
//   read: boolean;
//   content: string;
//   hasGraph?: boolean;
//   hasImage?: boolean;
// }

// // const dummyNotifications: Notification[] = [
// //   {
// //     id: "1",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "3,643 tasks was moved to a new workflow",
// //     date: "March 1, 2026",
// //     read: false,
// //     content:
// //       "In libero erat, finibus eu interdum at, faucibus facilisis leo. In libero erat, finibus eu interdum at, faucibus facilisis leo. In libero erat, finibus eu interdum at, faucibus facilisis leo. In libero erat, finibus eu interdum at, faucibus facilisis leo. In libero erat, finibus eu interdum at, faucibus facilisis leo. In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //     hasGraph: true,
// //     hasImage: true,
// //   },
// //   {
// //     id: "2",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "3,643 tasks was moved to a new workflow",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "3",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "23 task was returned from the workflow",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "4",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "3,643 tasks was moved to a new workflow",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "5",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "243 products was returned from THD",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "6",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "243 products was returned from THD",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "7",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "3,643 tasks was moved to a new workflow",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "8",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "23 task was returned from the workflow",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "9",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "SANJ replied to your comment",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "10",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "23 task was returned from the workflow",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "11",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "23 task was returned from the workflow",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "12",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "54 products was accepted by the Amazon",
// //     date: "March 1, 2026",
// //     read: false,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   // Earlier notifications
// //   {
// //     id: "13",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "54 products was accepted by the Amazon",
// //     date: "March 1, 2023",
// //     read: true,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "14",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "SANJ replied to your comment",
// //     date: "March 1, 2023",
// //     read: true,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// //   {
// //     id: "15",
// //     avatar: "/placeholder.svg?height=40&width=40",
// //     message: "54 products was accepted by the Amazon",
// //     date: "March 1, 2023",
// //     read: true,
// //     content: "In libero erat, finibus eu interdum at, faucibus facilisis leo.",
// //   },
// // ];

// export default function NotificationsPage() {
//   const { user } = useAuth();
//   console.log(user)

//   const { data: notificationsData } = useQuery({
//     queryKey: ["notifications"],
//     queryFn: async () => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/get-notifications/${user?._id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         },
//       );
//       const data = await response.json();
//       if (response.ok) {
//         return data;
//       } else {
//         throw new Error(data.message || "Failed to fetch notifications");
//       }
//     },
//   });

//   console.log("Notifications data:", notificationsData);
//   const [notifications, setNotifications] =
//     useState<Notification[]>(notificationsData);
//   const [selectedNotification, setSelectedNotification] =
//     useState<Notification | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const newNotifications = notifications.filter(
//     (n) => !n.read && n.date.includes("2026"),
//   );
//   const earlierNotifications = notifications.filter(
//     (n) => n.read || n.date.includes("2023"),
//   );

//   const handleNotificationClick = (notification: Notification) => {
//     setSelectedNotification(notification);
//     setIsModalOpen(true);
//   };

//   const { user } = useAuth();

//   console.log(user?._id);

//   const handleDismiss = (id: string) => {
//     setNotifications(
//       notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
//     );
//   };

//   // console.log(notificationsData);

//   return (
//     <div className="min-h-screen bg-[#300070]">
//       <main className="container mx-auto pt-24 pb-16 px-4">
//         <h1 className="!text-4xl font-bold text-center text-white smallTextShadow mb-4">
//           Notifications
//         </h1>
//         <p className="text-white text-center max-w-3xl mx-auto mb-12">
//           Stay informed with the latest updates from Psykick Club! Here,
//           you&apos;ll find notifications about your ARV and TMC results, new
//           challenges, special offers, upcoming features, and important
//           announcements. Check back regularly to stay up to date and make the
//           most of your Psykick experience!
//         </p>

//         <div className="max-w-3xl mx-auto bg-[#300070]/80 rounded-lg p-6">
//           {newNotifications.length > 0 && (
//             <>
//               <h2 className="text-white text-xl font-medium mb-4">New</h2>
//               <div className="space-y-2 mb-8">
//                 {newNotifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className="flex items-center gap-3 border-b border-purple-700 py-3"
//                   >
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={notification.avatar} alt="User" />
//                       <AvatarFallback>U</AvatarFallback>
//                     </Avatar>
//                     <div
//                       className="flex-1 cursor-pointer"
//                       onClick={() => handleNotificationClick(notification)}
//                     >
//                       <p className="text-white">{notification.message}</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-300 text-sm">
//                         {notification.date}
//                       </span>
//                       <button
//                         onClick={() => handleDismiss(notification.id)}
//                         className="text-gray-300 hover:text-white"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {earlierNotifications.length > 0 && (
//             <>
//               <h2 className="text-white text-xl font-medium mb-4">Earlier</h2>
//               <div className="space-y-2">
//                 {earlierNotifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className="flex items-center gap-3 border-b border-purple-700 py-3"
//                   >
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src={notification.avatar} alt="User" />
//                       <AvatarFallback>U</AvatarFallback>
//                     </Avatar>
//                     <div
//                       className="flex-1 cursor-pointer"
//                       onClick={() => handleNotificationClick(notification)}
//                     >
//                       <p className="text-white">{notification.message}</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-gray-300 text-sm">
//                         {notification.date}
//                       </span>
//                       <button
//                         onClick={() => handleDismiss(notification.id)}
//                         className="text-gray-300 hover:text-white"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </main>

//       {selectedNotification && (
//         <NotificationModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           notification={{
//             title: selectedNotification.message,
//             content: selectedNotification.content,
//             date: selectedNotification.date,
//             hasGraph: selectedNotification.hasGraph,
//             hasImage: selectedNotification.hasImage,
//           }}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";

const NotificationPage = () => {
  const { user } = useAuth();
  const userId = user?._id;

  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/get-notifications/${userId}`,
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

  if (isLoading) {
    return (
      <p className="text-white text-center mt-8">Loading notifications...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-8">
        Failed to load notifications.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white smallTextShadow mb-4 mt-20">
        Notifications
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-white text-center max-w-4xl mx-auto mb-12 px-2">
        Stay informed with the latest updates from Psykick Club! Here,
        you&apos;ll find notifications about your ARV and TMC results, new
        challenges, special offers, upcoming features, and important
        announcements. Check back regularly to stay up to date and make the most
        of your Psykick experience!
      </p>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-center">No notifications available.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification: any, idx: number) => (
            <div
              key={idx}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-4 sm:px-6 sm:py-5 shadow-md backdrop-blur-sm flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center"
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
      )}
    </div>
  );
};

export default NotificationPage;

"use client";

import { Bell, X } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import notificationImage from "../../../../../public/assets/img/flower.png";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    title: string;
    content: string;
    date?: string;
    hasGraph?: boolean;
    hasImage?: boolean;
  };
}

export function NotificationModal({
  isOpen,
  onClose,
  notification,
}: NotificationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white rounded-lg">
        <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
          <Bell className="h-5 w-5" />
          <DialogTitle className="text-lg font-medium">
            Notification
          </DialogTitle>
          <button
            onClick={onClose}
            className="ml-auto rounded-full p-1 hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <h3 className="text-lg font-medium mb-2">{notification.title}</h3>
          <p className="text-gray-700 mb-6">{notification.content}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notification.hasGraph && (
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">About Graph</h4>
                <div className="h-[200px] bg-gradient-to-r from-blue-100 to-purple-100 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end">
                    <div
                      className="h-[80%] w-full bg-gradient-to-r from-blue-400/70 to-purple-400/70 rounded-md"
                      style={{
                        clipPath:
                          "path('M0,100 Q50,20 100,80 T200,60 T300,80 T400,20 L400,200 L0,200 Z')",
                      }}
                    ></div>
                    <div
                      className="h-[60%] w-full bg-gradient-to-r from-blue-500/70 to-purple-500/70 rounded-md absolute"
                      style={{
                        clipPath:
                          "path('M0,100 Q100,60 200,100 T400,60 L400,200 L0,200 Z')",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {notification.hasImage && (
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">About Image</h4>
                <div className="rounded-md overflow-hidden">
                  <Image
                    src={notificationImage}
                    alt="Notification image"
                    width={300}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

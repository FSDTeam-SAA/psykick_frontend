import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NotificationsPage from "@/components/common/layout/notifications/notification-page";

export default function Page() {
  return (
    <ProtectedRoute>
      <NotificationsPage />
    </ProtectedRoute>
  );
}

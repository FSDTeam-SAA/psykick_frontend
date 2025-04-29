"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { resetPassword } = useAuth();

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      // Redirect to forgot password if no email is found
      router.push("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await resetPassword(email, newPassword);

      if (result.success) {
        toast.success(result.message || "Password reset successful!");
        // Clear the email from sessionStorage
        sessionStorage.removeItem("resetEmail");
        // Navigate to login page
        router.push("/login");
      } else {
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: 'url("/assets/img/backloging.png")', // 👈 image path ekhane
        backgroundSize: "cover", // pura div e image fill korbe
        backgroundRepeat: "no-repeat", // repeat korbe na
        backgroundPosition: "center", // image ke center e rakhbe
      }}
    >
      <div
        className="w-full max-w-[618px] p-8 rounded-lg bg-[#FFFFFF33]/50% backdrop-blur-lg text-white border border-white/10"
        style={{
          backgroundImage: 'url("/assets/img/loginUpimg.png")', // 👈 image path ekhane
          backgroundSize: "cover", // pura div e image fill korbe
          backgroundRepeat: "no-repeat", // repeat korbe na
          backgroundPosition: "center", // image ke center e rakhbe
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
        <p className="text-sm text-center text-gray-300 mb-6">
          Create your new password
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newPassword">New Password</label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-600 bg-slate-700/50 p-3 text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-600 bg-slate-700/50 p-3 text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="w-[260px] mx-auto">
              <button
                type="submit"
                className="btn mt-10 rounded-md bg-purple-600 py-3 font-medium text-white transition-colors hover:bg-purple-700"
              >
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

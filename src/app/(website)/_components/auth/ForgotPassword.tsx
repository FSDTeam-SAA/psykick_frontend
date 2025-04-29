"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await forgotPassword(email);

      if (result.success) {
        toast.success(result.message || "OTP sent successfully!");
        // Store email in sessionStorage for later use
        sessionStorage.setItem("resetEmail", email);
        router.push("/verify-otp");
      } else {
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error: Error | unknown) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/space-background.png')] bg-cover bg-center">
      <div className="w-full max-w-md p-8 rounded-lg backdrop-blur-sm bg-black/30 text-white border border-white/10">
        <h1 className="text-2xl font-bold text-center mb-2">
          Forget Password?
        </h1>
        <p className="text-sm text-center text-gray-300 mb-6">
          You may receive email notifications from us to reset your password for
          security and login purposes.
        </p>

        <h2 className="text-xl font-bold mb-4">
          Enter your Personal Information
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Write your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-600 bg-slate-700/50 p-3 text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-purple-600 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:bg-purple-400"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

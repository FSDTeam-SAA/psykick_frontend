"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const { verifyOTP, resendOTP } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if we have an email in sessionStorage
    const email = sessionStorage.getItem("resetEmail");
    if (!email) {
      // Redirect to forgot password if no email is found
      router.push("/forgot-password");
    }
  }, [router]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user types
    if (error) setError(null);

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      const result = await verifyOTP(otpString);

      if (result.success) {
        toast.success(result.message || "OTP verified successfully!");
        router.push("/reset-password");
      } else {
        setError("Invalid OTP");
        toast.error(result.message || "Failed to verify OTP");
      }
    } catch (error: Error | unknown) {
      setError("Something went wrong");
      toast.error(
        error instanceof Error ? error.message : "Failed to verify OTP",
      );
    }
  };

  const handleResend = async () => {
    const email = sessionStorage.getItem("resetEmail");
    if (email) {
      const result = await resendOTP(email);
      if (result.success) {
        toast.success(result.message || "OTP has been resent");
      } else {
        toast.error(result.message || "Failed to resend OTP");
      }
    } else {
      router.push("/forgot-password");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[url('/space-background.png')] bg-cover bg-center"
      style={{
        backgroundImage: 'url("/assets/img/backloging.png")', // 👈 image path ekhane
        backgroundSize: "cover", // pura div e image fill korbe
        backgroundRepeat: "no-repeat", // repeat korbe na
        backgroundPosition: "center", // image ke center e rakhbe
      }}
    >
      <div
        className="w-full max-w-[618px] p-8 rounded-lg backdrop-blur-sm bg-black/30 text-white border border-white/10"
        style={{
          backgroundImage: 'url("/assets/img/loginUpimg.png")', // 👈 image path ekhane
          backgroundSize: "cover", // pura div e image fill korbe
          backgroundRepeat: "no-repeat", // repeat korbe na
          backgroundPosition: "center", // image ke center e rakhbe
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          {error ? "Please Try Again" : "Verify Email"}
        </h1>
        <p className="text-sm text-center mb-6">
          {error ? (
            <span className="text-red-400">{error}</span>
          ) : (
            "Please enter the OTP we have sent you in your Email Address."
          )}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-lg font-bold rounded-lg 
                  ${error ? "bg-red-200/20 border-red-400/50" : "bg-white/20 border-white/20"} 
                  focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            ))}
          </div>

          <div className="flex justify-between text-sm mb-6">
            <button
              type="button"
              className="text-gray-300 hover:text-white"
              onClick={() => router.push("/forgot-password")}
            >
              Didn&apos;t receive OTP?
            </button>
            <button
              type="button"
              className="text-gray-300 hover:text-white"
              onClick={handleResend}
            >
              Resend
            </button>
          </div>

          <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn rounded-md bg-purple-600 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:bg-purple-400"
          >
            Verify
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

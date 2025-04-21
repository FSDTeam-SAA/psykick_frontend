"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
interface LoginFormProps {
  returnUrl?: string;
}
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  data: {
    _id: string;
  };
}

const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    },
  );
  console.log("login response", response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export default function LoginForm({ returnUrl = "/" }: LoginFormProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store token in localStorage or cookies
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      toast.success("Login successful!");

      // Redirect to home page
      router.push("/");
    },
    onError: () => {
      toast.success("Login faile");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(formData.email, formData.password);
    if (success) {
      router.push(returnUrl);
    }
    if (success) {
      console.log("Login successful");
      console.log("Token:", localStorage.getItem("authToken"));
      console.log("UserID:", localStorage.getItem("userId"));

      // Navigate to dashboard or home
      router.push("/");
    } else {
      toast.error("Login failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-xl p-8 rounded-3xl backdrop-blur-sm bg-black/30 border border-[#FFFFFF33]/20">
        <div className="text-center space-y-2 mb-8">
          <h1 className="font-kdam text-[32px] text-white smallShadow">
            Log In
          </h1>
          <p className="text-gray-200 lg:text-md">
            Continue to register as a customer or vendor, Please provide the
            information.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-white mb-4 text-[28px] smallShadow">
            Enter your Personal Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-200">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-200">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button
                type="submit"
                className="btn"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Log In"}
              </Button>
            </div>
          </form>

          <div className="mt-6 space-y-2 text-center">
            <Link
              href="/forgot-password"
              className="block text-sm text-gray-200 hover:text-white"
            >
              I forgot my password?
            </Link>
            <p className="text-sm text-gray-200">
              Don&apos;t you have account?{" "}
              <Link
                href="/signUp"
                className="text-purple-400 hover:text-purple-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

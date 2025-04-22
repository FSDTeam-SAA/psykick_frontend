"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  email: string;
  screenName: string;
  fullName?: string;
  avatar: string;
  tierRank: string;
  totalPoints: number;
  targetsLeft: number;
  role: string;
  // Add other properties as needed
}

// interface LoginResponse {
//   status: boolean;
//   message: string;
//   data: User;
//   token: string;
// }

interface ProfileResponse {
  status: boolean;
  data: User;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Check if the user is logged in on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    // console.log(token);

    if (!token || !userId) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch user profile using the stored userId
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/get-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const responseData: ProfileResponse = await response.json();

        if (responseData.status && responseData.data) {
          setUser(responseData.data);
          setIsLoggedIn(true);
        } else {
          // Something went wrong
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        // Token is invalid or expired
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Session check failed:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Login attempt for:", email);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.status && data.token) {
        // Store token and user ID with console logs to verify
        // console.log("Storing token and user ID");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.data._id);

        // Also set a cookie for the middleware
        document.cookie = `authToken=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days

        // console.log("Verifying stored values:");
        // console.log("Token:", localStorage.getItem("authToken"));
        // console.log("UserID:", localStorage.getItem("userId"));

        // Set user data from login response
        setUser(data.data);
        setIsLoggedIn(true);

        // Wait a moment before proceeding to ensure localStorage is updated
        await new Promise((resolve) => setTimeout(resolve, 100));

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    // Clear the cookie
    document.cookie = "authToken=; path=/; max-age=0";
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  return {
    isLoggedIn,
    user,
    isLoading,
    login,
    logout,
    checkSession,
  };
}

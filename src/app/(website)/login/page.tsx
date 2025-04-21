"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import LoginForm from "../_components/auth/LoginForm";

export default function LoginPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  useEffect(() => {
    // If already logged in, redirect to the return URL
    if (isLoggedIn) {
      router.push(returnUrl);
    }
  }, [isLoggedIn, router, returnUrl]);

  return <LoginForm returnUrl={returnUrl} />;
}

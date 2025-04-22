import { Suspense } from "react";
import LoginForm from "../_components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

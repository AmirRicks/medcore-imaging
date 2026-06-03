"use client";

import { PageTransition } from "@/components/shared/page-transition";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <PageTransition>
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoginForm />
      </div>
    </PageTransition>
  );
}

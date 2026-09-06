import { Suspense, type ReactNode } from "react";
import { AuthForm } from "@/components/brand/auth-form";

/** useSearchParams requires a Suspense boundary in the App Router. */
export function AuthFormSuspense({ mode }: { mode: "login" | "register" }) {
  return (
    <Suspense fallback={<div className="prose-narrow min-h-40" aria-hidden />}>
      <AuthForm mode={mode} />
    </Suspense>
  );
}

export function AuthFormSlot({
  mode,
  children,
}: {
  mode: "login" | "register";
  children?: ReactNode;
}) {
  return (
    <>
      <AuthFormSuspense mode={mode} />
      {children}
    </>
  );
}

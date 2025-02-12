import LoginForm from "@/components/form/login-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex justify-center px-4 py-6 md:py-24">
      <Suspense fallback={<FormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="relative z-40 max-w-md space-y-3 md:space-y-4">
      {/* Title skeleton */}
      <Skeleton className="h-8 w-24 md:h-9" />

      {/* Email field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Input */}
      </div>

      {/* Password field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Input */}
      </div>

      {/* Button skeleton */}
      <Skeleton className="h-10 w-full" />

      {/* Sign up text skeleton */}
      <div className="flex items-center justify-center gap-1">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  );
}

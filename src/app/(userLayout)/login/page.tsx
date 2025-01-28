import LoginForm from "@/components/form/login-form";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex justify-center py-6 md:py-24 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

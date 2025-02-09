import LoginForm from "@/components/form/login-form";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex justify-center px-4 py-6 md:py-24">
      <Suspense fallback={<Loader2 className="mx-auto my-2 animate-spin" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

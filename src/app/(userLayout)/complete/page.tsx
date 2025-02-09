import { Suspense } from "react";
import Com from "./com";

export default function CompletePage() {
  return (
    <Suspense>
      <Com></Com>
    </Suspense>
  );
}

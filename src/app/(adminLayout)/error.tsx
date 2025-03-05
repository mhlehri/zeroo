"use client";
export default function error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}

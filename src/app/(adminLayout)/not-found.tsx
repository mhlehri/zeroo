import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-primary-800 text-4xl font-bold">Not Found</h2>
      <p className="text-primary-600">Could not find requested resource</p>
      <Link href="/" className="text-slate-500 underline hover:text-slate-700">
        Return Home
      </Link>
    </div>
  );
}

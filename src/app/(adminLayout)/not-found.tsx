import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-4xl font-bold text-gray-800">Not Found</h2>
      <p className="text-gray-600">Could not find requested resource</p>
      <Link href="/" className="text-slate-500 hover:text-slate-700 underline">
        Return Home
      </Link>
    </div>
  );
}

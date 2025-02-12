import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <Image
        src="/404.gif"
        alt="404"
        width={300}
        height={300}
        className="rounded-full"
      />
      <h2 className="text-primary-800 text-4xl font-bold">এনে কি ব্রো?</h2>
      <p className="text-primary-600">ব্যাকে যান মিয়া....</p>
      <Link
        href="/products"
        className="text-slate-500 underline hover:text-slate-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

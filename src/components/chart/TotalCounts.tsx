import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  text: string;
  isLoading: boolean;
  count: number;
  link: string;
};

export default function TotalCounts({ text, isLoading, count, link }: Props) {
  return (
    <div className="rounded border">
      <div className="px-4 pt-4 pb-2">
        <p className="text-lg font-medium text-slate-800 md:text-xl">{text}</p>

        <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
          {isLoading ? <Loader2 className="animate-spin" /> : count}
        </p>
      </div>

      {!isLoading && (
        <Link
          href={link}
          className="flex w-full items-center gap-1 border-t px-4 py-2 text-sm transition-discrete duration-200 hover:bg-gray-200 hover:tracking-widest"
        >
          View list <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}

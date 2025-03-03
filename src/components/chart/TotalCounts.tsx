import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Counts } from "./Counts";

type Props = {
  text: string;
  func: Promise<{ total: number }>;
  link: string;
};

export default function TotalCounts({ text, func, link }: Props) {
  return (
    <div className="roundeddd border bg-white">
      <div className="px-4 pt-4 pb-2">
        <p className="text-lg font-medium text-slate-800 md:text-xl">{text}</p>

        <Counts func={func} />
      </div>
      <Link
        href={link}
        className="flex w-full items-center gap-1 border-t px-4 py-2 text-sm transition-discrete duration-200 hover:bg-gray-200 hover:tracking-widest"
      >
        View list <ChevronRight size={16} />
      </Link>
    </div>
  );
}

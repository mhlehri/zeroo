"use client";
import { useUsers } from "@/hooks/use-user";
import { Loader2, Users } from "lucide-react";
// import Link from "next/link";

export default function TotalUserOverview() {
  const { users, isUsersLoading } = useUsers();

  return (
    <div className="rounded border p-4">
      <div className="text-lg font-medium text-slate-800 md:text-xl">
        <Users />
        Total Users
      </div>
      <div>
        <p className="text-lg font-semibold md:text-xl lg:text-2xl">
          {isUsersLoading ? <Loader2 className="animate-spin" /> : users.length}
        </p>
        {/* {!isUsersLoading && (
          <Link
            href="/admin/user-list"
            className="my-auto text-sm underline hover:text-blue-500"
          >
            View list
          </Link>
        )} */}
      </div>
    </div>
  );
}

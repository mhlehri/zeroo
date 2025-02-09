"use client";
import { useUsers } from "@/hooks/use-user";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function TotalUserOverview() {
  const { users, isUsersLoading } = useUsers();

  return (
    <Card>
      <CardHeader className="text-center text-xl font-bold md:text-2xl">
        Total Products
      </CardHeader>
      <CardContent>
        <p className="text-center text-xl font-bold md:text-2xl lg:text-3xl">
          {isUsersLoading ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : (
            users.length
          )}
        </p>
      </CardContent>

      {!isUsersLoading && (
        <CardFooter>
          <Link
            href="/admin/user-list"
            className="mx-auto my-auto text-center text-sm underline hover:text-blue-500"
          >
            View list
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}

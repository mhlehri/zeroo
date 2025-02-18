import { getUserById, getUsers } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export function useUsers() {
  const {
    data,
    isLoading: isUsersLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
  });

  const users = useMemo(() => data?.users ?? [], [data]);
  const totalUsers = useMemo(() => data?.total ?? 0, [data]);

  return { users, totalUsers, isUsersLoading, isError };
}

export function useUserById(id: string) {
  const [user, setUser] = useState<TUser>();

  const {
    data,
    isLoading: isUserLoading,
    isError,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => await getUserById(id),
  });

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data]);

  return { user, isUserLoading, isError };
}

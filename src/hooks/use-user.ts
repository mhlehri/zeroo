import { getUserById, getUsers } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState<TUser[]>([]);

  const {
    data,
    isLoading: isUsersLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
  });

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
    } else {
      setUsers([]);
    }
  }, [data]);

  return { users, isUsersLoading, isError };
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

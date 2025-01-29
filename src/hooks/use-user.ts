import { getUsers } from "@/services/auth";
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
    if (data?.data?.users) {
      setUsers(data.data.users);
    } else {
      setUsers([]);
    }
  }, [data]);

  return { users, isUsersLoading, isError };
}

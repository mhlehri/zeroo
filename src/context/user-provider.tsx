import { getCurrentUser } from "@/services/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type TCUser = {
  id: string;
  email: string;
  role: "admin" | "user";
  address: string;
  exp: number;
  iat: number;
  name: string;
  phone: string;
};

interface UserContextType {
  user: TCUser | null;
  setUser: (user: TCUser | null) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TCUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user as TCUser | null);
      setLoading(false);
    });
  }, [loading]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;

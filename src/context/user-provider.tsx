import { getCurrentUser } from "@/services/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserContextType {
    user: TUser | null;
    setUser: (user: TUser | null) => void;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children } : { children : ReactNode}) => {
    const [user, setUser] = useState<TUser | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getCurrentUser().then((user) => {
            setUser(user as TUser | null);
            setLoading(false);
        });
    }, [loading]);
    
    return <UserContext.Provider value={{user, setUser, loading, setLoading}}>{children}</UserContext.Provider>;
    }

export const useUser = () => {
        const context = useContext(UserContext);
        if (!context) {
            throw new Error("useUser must be used within a UserProvider");
        }
        return context;
    }

    export default UserProvider;
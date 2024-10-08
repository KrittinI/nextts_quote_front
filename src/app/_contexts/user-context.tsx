"use client";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { User } from "../_types/user.type";
import { getAccessToken } from "../_utils/local-storage";
import { getMe } from "../_lib/auth-data";

interface UserContextValue {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    fetchUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextValue | null>(null);

export default function UserContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        const token = getAccessToken();
        const result = await getMe(token);
        console.log(result);
        setUser(result);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        user,
        setUser,
        fetchUser,
    };
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useAuth must be use within a UserContextProvider");
    }

    return context;
};

import { createContext, useContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { getCurrentUser } from '@services/api/auth';
import { UserAuth } from '@interfaces/user';

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: UserAuth | null;
    setUser: (user: UserAuth | null) => void;
    isLoading: boolean;
    refresh: boolean;
    triggerRefresh: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) throw new Error('useGlobalContext must be used within a GlobalProvider');

    return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserAuth | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => setRefresh((prev) => !prev);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setUser({
                        $id: res.$id,
                        email: res.email,
                    });
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoggedIn(false);
                setUser(null);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
            refresh,
            triggerRefresh,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
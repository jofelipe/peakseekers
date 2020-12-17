import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
} from 'react';

import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import api from '../services/api';

interface Notification {
    recipient: string;
    sender: {
        name: string;
        avatar_url: string;
        username: string;
    };
    created_at: string;
    story_id: string;
    type: 'like' | 'badge';
    read: boolean;
    id: string;
}

interface User {
    credentials: {
        id: string;
        avatar_url: string;
        name: string;
        email: string;
        username: string;
        nationality: {
            label: string;
            value: string;
        };
        bio: string;
        website: string;
        use_feet: boolean;
        is_facebook_user?: boolean;
    };
    stories?: string[];
    bucketlist?: string[];
    badges?: string[];
    likes?: string[];
    notifications: Notification[];
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    isAuthenticated: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signInFacebook(token: string): Promise<void>;
    updateUser(user: User): void;
    signOut(): void;
    deleteUser(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const tokenExpiration = new Date(new Date().getTime() + 59 * 60 * 1000);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token');
            if (token) {
                //check if is valid
                const decodedToken = jwtDecode(token);

                if (decodedToken.exp * 1000 < Date.now()) {
                    Cookies.remove('token');
                    setUser(null);
                    window.location.pathname = '/';
                } else {
                    api.defaults.headers.authorization = `Bearer ${token}`;

                    const { data: user } = await api.get('/user');

                    if (user) {
                        setUser(user);
                    }
                }
            }
            setLoading(false);
        }
        loadUserFromCookies();
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        const { data: token } = await api.post('/login', { email, password });

        if (token) {
            Cookies.set('token', token.token, { expires: tokenExpiration });
            api.defaults.headers.authorization = `Bearer ${token.token}`;
            const { data: user } = await api.get('/user');
            setUser(user);
        }
    }, []);

    const signInFacebook = useCallback(async (fbToken) => {
        if (fbToken) {
            Cookies.set('token', fbToken, { expires: tokenExpiration });
            api.defaults.headers.authorization = `Bearer ${fbToken}`;
            const { data: user } = await api.get('/user');
            setUser(user);
        }
    }, []);

    const updateUser = useCallback(
        (user: User) => {
            setUser(user);
        },
        [user]
    );

    const signOut = useCallback(() => {
        Cookies.remove('token');
        setUser(null);
        window.location.pathname = '/';
    }, []);

    const deleteUser = useCallback(() => {
        Cookies.remove('token');
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                signIn,
                signInFacebook,
                loading,
                updateUser,
                deleteUser,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}

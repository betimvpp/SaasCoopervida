import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import { z } from "zod";

const signInForm = z.object({
    email: z.string().email(),
    password: z.string(),
});

type SignInForm = z.infer<typeof signInForm>;

interface AuthContextType {
    login: (data: SignInForm) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    user: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    async function login(dataResp: SignInForm) {
        try {
            const { email, password } = dataResp;
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;

            setIsAuthenticated(true);
            setUser(data.user);
            toast.success("Sucesso, você será redirecionado para a página principal!");
            return true
        } catch (error: any) {
            console.error("Erro durante o login:", error.message);
            toast.error("Usuário ou senha inválido!");
            return false;
        }
    }    

    function logout() {
        supabase.auth.signOut();
        setIsAuthenticated(false);
        setUser(null);
        toast.info("Logout realizado com sucesso!");
    }

    const refreshToken = async () => {
        const refresh_token = localStorage.getItem("refresh_token");
        if (refresh_token) {
            const { data, error } = await supabase.auth.refreshSession({ refresh_token });

            if (error) {
                console.error("Erro ao renovar o token:", error.message);
                logout();
                return;
            }

            setIsAuthenticated(true);
            setUser(data.user);
        }
    };

    const loadUserFromLocalStorage = async () => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            try {
                await refreshToken();
            } catch (error) {
                console.error("Erro ao carregar usuário do localStorage", error);
                logout();
            }
        }
    };

    useEffect(() => {
        loadUserFromLocalStorage();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
}

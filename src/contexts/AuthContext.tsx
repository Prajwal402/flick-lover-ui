import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getToken, logout as authLogout, type AuthToken } from "@/lib/auth";

interface AuthContextType {
  user: AuthToken | null;
  isAuthenticated: boolean;
  refreshAuth: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  refreshAuth: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthToken | null>(null);

  const refreshAuth = () => {
    setUser(getToken());
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

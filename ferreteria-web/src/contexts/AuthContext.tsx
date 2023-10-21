import * as React from "react";
import { AuthProviderProps, AuthContextType } from "../interfaces/Interfaces";
import UrlProvider from "./UrlContext";
import DetalleProductoProvider from "./DetalleProductoContext";

// Crea un contexto de autenticación
const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Componente proveedor del contexto de autenticación

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Función para iniciar sesión
  const login = (): void => {
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión
  const logout = (): void => {
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <DetalleProductoProvider>
      <UrlProvider>
        <AuthContext.Provider value={value as AuthContextType}>
          {children}
        </AuthContext.Provider>
      </UrlProvider>
    </DetalleProductoProvider>
  );
};

export default AuthProvider;

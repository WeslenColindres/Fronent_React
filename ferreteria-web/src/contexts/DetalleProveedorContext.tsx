import * as React from "react";
import {
  DetalleProveedorContextType,
  DetalleProveedorProviderProps,
} from "../interfaces/Interfaces";

// Crea un contexto de autenticación
const DetalleProveedorContext = React.createContext<
DetalleProveedorContextType | undefined
>(undefined);

// Hook personalizado para acceder al contexto de autenticación
export const useDetalleProveedor = (): DetalleProveedorContextType => {
  const context = React.useContext(DetalleProveedorContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Componente proveedor del contexto de autenticación

const DetalleProveedorProvider: React.FC<DetalleProveedorProviderProps> = ({ children }) => {
  const [proveedor, setProveedor] = React.useState<
  DetalleProveedorContextType["proveedor"]
  >({
    ID_Proveedor: 0,
    Nombre_Proveedor: "",
    Contacto: "",
    Teléfono: "",
    Dirección: "",
  });

 

  const value: DetalleProveedorContextType = {
    proveedor,
    setProveedor,
  };

  return (
    <DetalleProveedorContext.Provider
      value={value as DetalleProveedorContextType}
    >
      {children}
    </DetalleProveedorContext.Provider>
  );
};

export default DetalleProveedorProvider;

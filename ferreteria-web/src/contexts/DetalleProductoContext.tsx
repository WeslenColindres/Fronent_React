import * as React from "react";
import DetalleProveedorProvider from "./DetalleProveedorContext";
import {
  DetalleProductoContextType,
  DetalleProductoProviderProps,
} from "../interfaces/Interfaces";
import DetalleCompraProvider from "./DetalleCompraContext";

// Crea un contexto de autenticación
const DetalleProductoContext = React.createContext<
  DetalleProductoContextType | undefined
>(undefined);

// Hook personalizado para acceder al contexto de autenticación
export const useDetalleProducto = (): DetalleProductoContextType => {
  const context = React.useContext(DetalleProductoContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Componente proveedor del contexto de autenticación

const DetalleProductoProvider: React.FC<DetalleProductoProviderProps> = ({
  children,
}) => {
  const [producto, setProducto] = React.useState<
    DetalleProductoContextType["producto"]
  >({
    ID_Producto: 0,
    Nombre_Producto: "",
    Descripción: "",
    Precio_Unitario: 0,
    Cantidad_Stock: 0,
    ID_Categoria: 0,
  });

  const value: DetalleProductoContextType = {
    producto,
    setProducto,
  };

  return (
    <DetalleCompraProvider>
      <DetalleProveedorProvider>
        <DetalleProductoContext.Provider
          value={value as DetalleProductoContextType}
        >
          {children}
        </DetalleProductoContext.Provider>
      </DetalleProveedorProvider>
    </DetalleCompraProvider>
  );
};

export default DetalleProductoProvider;

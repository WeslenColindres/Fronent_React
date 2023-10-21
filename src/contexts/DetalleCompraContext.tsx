import * as React from "react";
import {
  DetalleCompraContextType,
  DetalleCompraProviderProps,
} from "../interfaces/Interfaces";

const DetalleCompraContext = React.createContext<
  DetalleCompraContextType | undefined
>(undefined);

export const useDetalleCompra = (): DetalleCompraContextType => {
  const context = React.useContext(DetalleCompraContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

const DetalleCompraProvider: React.FC<DetalleCompraProviderProps> = ({
  children,
}) => {
  const [compra, setCompra] = React.useState<
    DetalleCompraContextType["compra"]
  >({
    ID_Entrada: 0,
    ID_Proveedor: {
        ID_Proveedor: 0,
        Nombre_Proveedor: '',
        Contacto: '',
        Teléfono: '',
        Dirección: '',
    },
    ID_Producto: {
        ID_Producto: 0,
        Nombre_Producto: '',
        Descripción: '',
        Precio_Unitario: 0,
        Cantidad_Stock: 0,
        ID_Categoria: 0,
    },
    Cantidad: 0,
    Precio_Compra: 0,
});

  const value: DetalleCompraContextType = {
    compra,
    setCompra,
  };

  return (
      <DetalleCompraContext.Provider
        value={value as DetalleCompraContextType}
      >
        {children}
      </DetalleCompraContext.Provider>
  );
};

export default DetalleCompraProvider;

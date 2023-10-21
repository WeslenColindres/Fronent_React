export type Order = "asc" | "desc";

export type Producto = {
  ID_Producto: number;
  Nombre_Producto: string;
  Descripción: string;
  Precio_Unitario: number;
  Cantidad_Stock: number;
  ID_Categoria: number;
};

export type Proveedor = {
  ID_Proveedor: number;
  Nombre_Proveedor: string;
  Contacto: string;
  Teléfono: string;
  Dirección: string;
};

export interface Compra {
  ID_Entrada: number;
  ID_Proveedor: {
    ID_Proveedor: number;
    Nombre_Proveedor: string;
    Contacto: string;
    Teléfono: string;
    Dirección: string;
  };
  ID_Producto: {
    ID_Producto: number;
    Nombre_Producto: string;
    Descripción: string;
    Precio_Unitario: number;
    Cantidad_Stock: number;
    ID_Categoria: number;
  };
  Cantidad: number;
  Precio_Compra: number;
}

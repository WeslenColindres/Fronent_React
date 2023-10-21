import { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { ReactNode } from 'react';
import { Producto, Proveedor, Compra } from '../type/type';

export interface DrawerProps extends MuiDrawerProps {
    open: boolean;
    toggleDrawer: () => void;
  }

export interface AppBarProps extends MuiAppBarProps {
    open: boolean;
    toggleDrawer: () => void;
  }
  export interface children {
    children?: ReactNode;
  }  

export interface MainContentProps extends children {
    
  }

export interface DashboardProps extends children {

}

export interface AuthProviderProps extends children  {

}

export interface AuthProviderProps extends children {

}

export interface UrlProviderProps extends children {

}

export interface DetalleProductoProviderProps extends children {

}

export interface DetalleProveedorProviderProps extends children {

}

export interface DetalleCompraProviderProps extends children {

}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export interface DetalleProductoContextType {
  producto: Producto;
  setProducto: React.Dispatch<React.SetStateAction<Producto>>;
}

export interface DetalleCompraContextType {
  compra: Compra;
  setCompra: React.Dispatch<React.SetStateAction<Compra>>;
}

export interface DetalleProveedorContextType {
  proveedor: Proveedor;
  setProveedor: React.Dispatch<React.SetStateAction<Proveedor>>;
}

export interface UrlContextType {
  url: string;
  up: boolean;
  setUp: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface HeadCellProducto {
  disablePadding: boolean;
  id: keyof Producto;
  label: string;
  numeric: boolean;
}

export interface HeadCellProveedor {
  disablePadding: boolean;
  id: keyof Proveedor;
  label: string;
  numeric: boolean;
}

export interface HeadCellCompra {
  disablePadding: boolean;
  id: keyof Compra | string;
  label: string;
  numeric: boolean;
}
  
export interface ProductoTableProps {
  data: Producto[];
}

export interface ProveedorTableProps {
  data: Proveedor[];
}

export interface CompraTableProps {
  data: Compra[];
}


export interface HttpRequestOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  authToken?: string | any; 
}
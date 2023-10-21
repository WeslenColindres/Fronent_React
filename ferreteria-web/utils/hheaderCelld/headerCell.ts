import { HeadCellProducto, HeadCellProveedor } from '../../src/interfaces/Interfaces';

export const headCellsProductos: readonly HeadCellProducto[] = [
    {
      id: 'Nombre_Producto',
      numeric: false,
      disablePadding: false,
      label: 'Nombre Producto',
    },
    {
      id: 'Descripción',
      numeric: true,
      disablePadding: false,
      label: 'Descripción',
    },
    {
      id: 'Precio_Unitario',
      numeric: true,
      disablePadding: false,
      label: 'Precio Unitario',
    },
    {
      id: 'Cantidad_Stock',
      numeric: true,
      disablePadding: false,
      label: 'Cantidad Stock',
    },
    {
        id: 'ID_Categoria',
        numeric: true,
        disablePadding: false,
        label: 'ID Categoria',
      },
  ];

  export const headCellsProveedor: readonly HeadCellProveedor[] = [
    {
      id: 'Nombre_Proveedor',
      numeric: false,
      disablePadding: false,
      label: 'Nombre Proveedor',
    },
    {
      id: 'Contacto',
      numeric: true,
      disablePadding: false,
      label: 'Contacto',
    },
    {
      id: 'Teléfono',
      numeric: true,
      disablePadding: false,
      label: 'Teléfono',
    },
    {
      id: 'Dirección',
      numeric: true,
      disablePadding: false,
      label: 'Dirección',
    },
  ];


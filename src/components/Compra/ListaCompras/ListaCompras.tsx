import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Compra } from "../../../type/type";
import { CompraTableProps } from "../../../interfaces/Interfaces";
import Paper  from '@mui/material/Paper';
import { useDetalleCompra } from '../../../contexts/DetalleCompraContext';
import { useNavigate } from 'react-router-dom';
import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar';


export default function ListaCompras({ data }: CompraTableProps) {
  const [compra, setCompra] = React.useState<Compra[]>([]);

  const {setCompra: Entrada} = useDetalleCompra()
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      setCompra(data);
    }
  }, [data]);

  const handleClick = (
    compra: Compra,
    id: number
  ) => {
    Entrada(compra);
    navigate(`/dashboard/Compras/detalles/${id}`);
  };

  const filteredData = searchText
    ? compra.filter((compra) =>
    compra.ID_Proveedor?.Nombre_Proveedor.toLowerCase().includes(
          searchText.toLowerCase()
        )
      )
    : compra;

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };


  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* <Title>Recent Orders</Title> */}
        <EnhancedTableToolbar onSearchTextChange={handleSearchTextChange}  />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Compra</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((datos) => {
              return (
                <TableRow hover
                tabIndex={-1}
                key={datos.ID_Entrada}
                onClick={() =>
                  handleClick(datos, datos.ID_Entrada)
                }
                sx={{ cursor: "pointer" }}>
                  <TableCell>{datos.ID_Entrada}</TableCell>
                  <TableCell>{datos.ID_Proveedor.Nombre_Proveedor}</TableCell>
                  <TableCell>{datos.ID_Producto.Nombre_Producto}</TableCell>
                  <TableCell>{datos.Cantidad}</TableCell>
                  <TableCell>{`Q ${datos.Precio_Compra}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
}

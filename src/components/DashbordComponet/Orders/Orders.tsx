import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import axios from "axios";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const [productos, setProductos] = React.useState([
    {
      ID_Producto: 1,
      Nombre_Producto: "asdasd",
      Descripción: "asdsdsd",
      Precio_Unitario: "43.23",
      Cantidad_Stock: 0,
      ID_Categoria: 0,
    },
  ]); // Estado para almacenar los pedidos

  React.useEffect(() => {
    // Función para realizar la solicitud HTTP

    // axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    axios
      .get("http://127.0.0.1:8000/api/Producto/")
      .then((response) => {
        // Actualiza el estado con los datos de respuesta
        setProductos(response.data.results);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  }, []);

  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID Producto</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio Unitario</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((datosProducto) => (
            <TableRow key={datosProducto.ID_Producto}>
              <TableCell>{datosProducto.ID_Producto}</TableCell>
              <TableCell>{datosProducto.Nombre_Producto}</TableCell>
              <TableCell>{datosProducto.Descripción}</TableCell>
              <TableCell>{`$${datosProducto.Precio_Unitario}`}</TableCell>
              <TableCell>{datosProducto.ID_Categoria}</TableCell>
              <TableCell>{datosProducto.Cantidad_Stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useDetalleProducto } from "../../contexts/DetalleProductoContext";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import  Container from '@mui/material/Container';
import  Paper  from '@mui/material/Paper';
import EliminarProducto from './EliminarProducto';

const DetalleProducto: React.FC = () => {
  const { producto } = useDetalleProducto();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEliminarProducto = () => {
    setOpenDialog(false);
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Detalles del Producto
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>ID:</strong> {producto.ID_Producto}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Nombre:</strong> {producto.Nombre_Producto}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Descripción:</strong> {producto.Descripción}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Precio Unitario:</strong> {producto.Precio_Unitario}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Cantidad en Stock:</strong> {producto.Cantidad_Stock}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>ID de Categoría:</strong> {producto.ID_Categoria}
            </Typography>
          </CardContent>
          <Button variant="contained" color="primary" style={{ margin: "8px" }}
          component={Link}
          to={`/dashboard/Producto/modificar/${producto.ID_Producto}`}
          >
              Modificar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "8px" }}
            onClick={handleOpenDialog}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "8px" }}
            component={Link}
                to={`/dashboard/Productos`}
          >
            Regresar
          </Button>
        </Card>
      </Paper>
      <EliminarProducto
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirmDelete={handleEliminarProducto}
      />
    </Container>
  );
};

export default DetalleProducto;

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import  Container from '@mui/material/Container';
import  Paper  from '@mui/material/Paper';
import { useDetalleCompra } from '../../../contexts/DetalleCompraContext';
import EliminarCompra from '../EliminarCompra/EliminarCompra';

const DetalleCompra: React.FC = () => {
  const { compra } = useDetalleCompra();
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
              Detalles del Compra
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>ID:</strong> {compra.ID_Entrada}
            </Typography>
            <Typography variant="h5" component="div" style={{paddingLeft:'16px'}}>
              Detalles del Proveedor
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>Nombre proveedot:</strong> {compra.ID_Proveedor.Nombre_Proveedor}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>contacto:</strong> {compra.ID_Proveedor.Contacto}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>Telefono:</strong> {compra.ID_Proveedor.Teléfono}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>Direccion:</strong> {compra.ID_Proveedor.Dirección}
            </Typography>
            <Typography variant="h5" component="div" style={{paddingLeft:'16px'}}>
              Detalles del Producto
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>Nombre de Producto:</strong> {compra.ID_Producto.Nombre_Producto}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>Desctipcion:</strong> {compra.ID_Producto.Descripción}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>Precio Unitario:</strong> {compra.ID_Producto.Precio_Unitario}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>Cantidad Stock:</strong> {compra.ID_Producto.Cantidad_Stock}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{paddingLeft:'30px'}}>
              <strong>ID Categoria:</strong> {compra.ID_Producto.ID_Categoria}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Cantida de Compra:</strong> {compra.Cantidad}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Precio de Compra:</strong> {compra.Precio_Compra}
            </Typography>
          </CardContent>
          <Button variant="contained" color="primary" style={{ margin: "8px" }}
          component={Link}
          to={`/dashboard/Compras/modificar/${compra.ID_Entrada}`}
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
                to={`/dashboard/Compras`}
          >
            Regresar
          </Button>
        </Card>
      </Paper>
      <EliminarCompra
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirmDelete={handleEliminarProducto}
      />
    </Container>
  );
};

export default DetalleCompra;

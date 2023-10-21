import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import  Container from '@mui/material/Container';
import  Paper  from '@mui/material/Paper';

import { useDetalleProveedor } from "../../contexts/DetalleProveedorContext";
import EliminarProveedor from './EliminarProveedor';

const DetalleProveedor: React.FC = () => {
  const { proveedor } = useDetalleProveedor();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEliminarProveedor = () => {
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
              Detalles del Proveedor
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>ID:</strong> {proveedor.ID_Proveedor}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Nombre Proveedor:</strong> {proveedor.Nombre_Proveedor}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Contacto:</strong> {proveedor.Contacto}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Teléfono:</strong> {proveedor.Teléfono}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Dirección:</strong> {proveedor.Dirección}
            </Typography>
          </CardContent>
          <Button variant="contained" color="primary" style={{ margin: "8px" }}
          component={Link}
          to={`/dashboard/Proveedor/modificar/${proveedor.ID_Proveedor}`}
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
                to={`/dashboard/Proveedor`}
          >
            Regresar
          </Button>
        </Card>
      </Paper>
      <EliminarProveedor
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirmDelete={handleEliminarProveedor}
      />
    </Container>
  );
};

export default DetalleProveedor;

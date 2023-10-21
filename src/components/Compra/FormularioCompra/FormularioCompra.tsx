import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUrl } from "../../../contexts/UrlContext";
import { useDetalleCompra } from "../../../contexts/DetalleCompraContext";
import { Compra } from "../../../type/type";
import { sendHttpRequest } from "../../../../services/api/httpService";

export default function FormularioCompra() {
  const { compra: detalle, setCompra: Actual } = useDetalleCompra();
  const { url } = useUrl();
  const navigate = useNavigate();

  const [compra, setCompra] = React.useState<Compra>(detalle);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompra((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    sendHttpRequest(
      {
        url: `${url}/Compra/${compra.ID_Entrada}/`,
        method: "PUT",
        data: compra,
      },
      () => {
        Actual(compra);
        navigate(`/dashboard/Compras/detalles/${compra.ID_Entrada}`);
      },
      (error) => {
        console.error("Error de login", error);
      }
    );
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h6" gutterBottom>
          Modificar Compra
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ padding: "16px" }}
        >
          Detalles del Proveedor
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Nombre_Proveedor"
              name="Nombre_Proveedor"
              label="Nombre_Proveedor"
              fullWidth
              autoComplete="Nombre del Proveedor"
              variant="standard"
              value={compra.ID_Proveedor.Nombre_Proveedor}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Contacto"
              name="Contacto"
              label="Contacto"
              fullWidth
              autoComplete="Contacto"
              variant="standard"
              value={compra.ID_Proveedor.Contacto}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="Teléfono"
              name="Teléfono"
              label="Precio Teléfono"
              fullWidth
              autoComplete="Teléfono"
              variant="standard"
              value={compra.ID_Proveedor.Teléfono}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Dirección"
              name="Dirección"
              label="Dirección Stock"
              fullWidth
              autoComplete="Dirección"
              variant="standard"
              value={compra.ID_Proveedor.Dirección}
              onChange={handleFieldChange}
            />
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          component="div"
          style={{ padding:"16px" }}
        >
          Detalles del Producto
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="Nombre_Producto"
              name="Nombre_Producto"
              label="Nombre de Producto"
              fullWidth
              autoComplete="Nombre Producto"
              variant="standard"
              value={compra.ID_Producto.Nombre_Producto}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="Descripción"
              name="Descripción"
              label="Descripción"
              fullWidth
              autoComplete="Descripción"
              variant="standard"
              value={compra.ID_Producto.Descripción}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="ID_Categoria"
              name="ID_Categoria"
              label="ID Categoria"
              fullWidth
              autoComplete="ID Categoria"
              variant="standard"
              value={compra.ID_Producto.ID_Categoria}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Cantidad"
              name="Cantidad"
              label="Cantidad"
              fullWidth
              autoComplete="Cantidad"
              variant="standard"
              value={compra.Cantidad}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Precio_Compra"
              name="Precio_Compra"
              label="Precio Compra"
              fullWidth
              autoComplete="Precio Compra"
              variant="standard"
              value={compra.Precio_Compra}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            sx={{ p: { xs: 1, md: 2 } }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGuardar}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={`/dashboard/Compras/detalles/${compra.ID_Entrada}`}
              >
                Regresar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

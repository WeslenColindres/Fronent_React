import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDetalleProducto } from "../../contexts/DetalleProductoContext";
import { Producto } from "../../type/type";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUrl } from "../../contexts/UrlContext";
import { sendHttpRequest, getAuthToken } from '../../../services/api/httpService';


export default function FormularioProducto() {
  const { producto: detalleProduto, setProducto: Actual } = useDetalleProducto();
  const { url } = useUrl();
  const navigate = useNavigate();

  const [producto, setProducto] = React.useState<Producto>(detalleProduto);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const auth = getAuthToken();

  const handleGuardar = () => {
    sendHttpRequest(
        {
          url: `${url}/Producto/${producto.ID_Producto}/`,
          method: "PUT",
          data: producto,
          authToken:auth,
        },
        (response) => {
          Actual((prev)=>( producto))
          navigate(`/dashboard/Producto/detalles/${producto.ID_Producto}`)
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
          Modificar Producto
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Nombre_Producto"
              name="Nombre_Producto"
              label="Nombre_Producto"
              fullWidth
              autoComplete="Nombre del Producto"
              variant="standard"
              value={producto.Nombre_Producto}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Descripción"
              name="Descripción"
              label="Descripción"
              fullWidth
              autoComplete="Descripción"
              variant="standard"
              value={producto.Descripción}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="Precio_Unitario"
              name="Precio_Unitario"
              label="Precio Unitario"
              fullWidth
              autoComplete="00.00"
              variant="standard"
              value={producto.Precio_Unitario}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Cantidad_Stock"
              name="Cantidad_Stock"
              label="Cantidad Stock"
              fullWidth
              autoComplete="0"
              variant="standard"
              value={producto.Cantidad_Stock}
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
                onClick={handleGuardar} // Agrega la función para guardar
              >
                Guardar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={`/dashboard/Producto/detalles/${producto.ID_Producto}`}
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

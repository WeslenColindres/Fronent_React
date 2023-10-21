import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Proveedor } from "../../type/type";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUrl } from "../../contexts/UrlContext";
import { sendHttpRequest, getAuthToken } from '../../../services/api/httpService';
import { useDetalleProveedor } from '../../contexts/DetalleProveedorContext';


export default function FormularioProveedor() {
  const { proveedor: detalle, setProveedor: Actual } = useDetalleProveedor();
  const { url } = useUrl();
  const navigate = useNavigate();

  const [proveedor, setProveedor] = React.useState<Proveedor>(detalle);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProveedor((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };
  const auth = getAuthToken();

  const handleGuardar = () => {
    sendHttpRequest(
        {
          url: `${url}/Proveedor/${proveedor.ID_Proveedor}/`,
          method: "PUT",
          data: proveedor,
          authToken:auth,
        },
        (response) => {
          Actual((prev)=>( proveedor))
          navigate(`/dashboard/Proveedor/detalles/${proveedor.ID_Proveedor}`)
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
              id="Nombre_Proveedor"
              name="Nombre_Proveedor"
              label="Nombre_Proveedor"
              fullWidth
              autoComplete="Nombre de Proveedor"
              variant="standard"
              value={proveedor.Nombre_Proveedor}
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
              value={proveedor.Contacto}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="Teléfono"
              name="Teléfono"
              label="Teléfono"
              fullWidth
              autoComplete="00000000"
              variant="standard"
              value={proveedor.Teléfono}
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Dirección"
              name="Dirección"
              label="Dirección"
              fullWidth
              autoComplete="0"
              variant="standard"
              value={proveedor.Dirección}
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
                to={`/dashboard/Proveedor/detalles/${proveedor.ID_Proveedor}`}
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

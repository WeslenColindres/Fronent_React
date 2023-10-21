import React, { ReactElement, useState } from "react";
import {
  Modal,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useUrl } from "../../contexts/UrlContext";
import { sendHttpRequest, getAuthToken } from '../../../services/api/httpService';

interface AgregarProps {
  isOpen: boolean;
  handleClose: () => void;
}

const AgregarProducto: React.FC<AgregarProps> = ({
  isOpen,
  handleClose,
}): ReactElement => {
  const [openDialog, setOpenDialog] = useState(false);
  const [productos, setProductos] = React.useState<T>({
    Nombre_Producto: "",
    Descripción: "",
    Precio_Unitario: 0.0,
    Cantidad_Stock: 0,
    ID_Categoria: 1,
  });

  const { url, setUp } = useUrl();

  const handleConfirmClose = () => {
    setOpenDialog(false);
    handleClose();
  };

  const handleRequestClose = () => {
    setOpenDialog(true);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProductos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const auth = getAuthToken();

  const handleGuardar = () => {
    sendHttpRequest(
      {
        url: `${url}/Producto/`,
        method: "POST",
        data: productos,
        authToken:auth,
      },
      (response) => {
        handleConfirmClose();
        setUp(prev => !prev)
      },
      (error) => {
        console.error("Error de login", error);
      }
    );
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleRequestClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: '90%', sm: '70%', md: '50%' },
            maxHeight: "90vh", 
            overflow: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
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
                Agregar del Producto
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
                    value={productos.Nombre_Producto}
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
                    value={productos.Descripción}
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
                    value={productos.ID_Categoria}
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
                      onClick={handleConfirmClose}
                    >
                      Regresar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      </Modal>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{"¿Estás seguro de que quieres cerrar?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si cierras esta ventana, perderás todos los cambios no guardados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button onClick={handleConfirmClose} autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AgregarProducto;

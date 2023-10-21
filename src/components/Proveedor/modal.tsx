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

const AgregarProveedor: React.FC<AgregarProps> = ({
  isOpen,
  handleClose,
}): ReactElement => {
  const [openDialog, setOpenDialog] = useState(false);
  const [proveedor, setProveedor] = React.useState<T>({
    Nombre_Proveedor: "",
    Contacto: "",
    Teléfono: "",
    Dirección: "",
  });

  const auth = getAuthToken();

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

    setProveedor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    sendHttpRequest(
      {
        url: `${url}/Proveedor/`,
        method: "POST",
        data: proveedor,
        authToken:auth,
      },
      (response) => {
        handleConfirmClose();
        setUp((prev) => !prev);
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
                Agregar del Proveedor
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
                    label="Precio Teléfono"
                    fullWidth
                    autoComplete="Teléfono"
                    variant="standard"
                    value={proveedor.Teléfono}
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

export default AgregarProveedor;

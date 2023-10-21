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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useUrl } from "../../contexts/UrlContext";
import { Producto, Proveedor } from "../../type/type";
import { sendHttpRequest, getAuthToken } from '../../../services/api/httpService';
import AddIcon from "@mui/icons-material/Add";

interface AgregarCompraProps {
  isOpen: boolean;
  handleClose: () => void;
}


const AgregarCompra: React.FC<AgregarCompraProps> = ({
  isOpen,
  handleClose,
}): ReactElement => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isExistProductos, setIsExistProductos] = useState(true);
  const [isExistProveedores, setIsExistProveedores] = useState(true);
  const [compra, setCompra] = React.useState<T>({
    ID_Proveedor: {
      Nombre_Proveedor: "",
      Contacto: "",
      Teléfono: "",
      Dirección: "",
    },
    ID_Producto: {
      Nombre_Producto: "",
      Descripción: "",
      Precio_Unitario: 0,
      Cantidad_Stock: 0,
      ID_Categoria: 1,
    },
    Cantidad: 0,
    Precio_Compra: 0.0,
  });

  const [proveedor, setProveedor] = React.useState<Proveedor[]>([]);
  const [productos, setProductos] = React.useState<Producto[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<number>(1);
  const [selectedProducto, setSelectedProducto] = React.useState<number>(1);

  const { url, setUp } = useUrl();

  const auth = getAuthToken();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await sendHttpRequest(
          {
            url: `${url}/Producto/`,
            method: "GET",
            authToken:auth,
          },
          (response) => {
            console.log(response);
            setProductos(response.data.results);
            console.log(productos);
          },
          (error) => {
            console.error("Error de login", error);
          }
        );
        await sendHttpRequest(
          {
            url: `${url}/Proveedor/`,
            method: "GET",
            authToken:auth,
          },
          (response) => {
            console.log(response);
            setProveedor((prev) => (prev = response.data.results));
            console.log(proveedor);
          },
          (error) => {
            console.error("Error de login", error);
          }
        );
      } catch (error) {
        console.error("Error de login", error);
      }
    };

    fetchData();
  }, []);

  const handleProveedorChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const selectedValue = event.target.value as number;
    console.log("Producto seleccionado:", selectedValue);
    const selectedProveedor = proveedor.find(
      (proveedor) => proveedor.ID_Proveedor === selectedValue
    );
    setSelectedValue(selectedValue as number);

    if (selectedProveedor) {
      setCompra((prevCompra) => ({
        ...prevCompra,
        ID_Proveedor: selectedProveedor,
      }));
    } else {
      console.error(
        "El producto seleccionado no se encuentra en la lista de productos."
      );
    }
  };

  const handleProductoChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const selectedValue = event.target.value as number;
    console.log("Producto seleccionado:", selectedValue);
    const selectedProducto = productos.find(
      (productos) => productos.ID_Producto === selectedValue
    );
    setSelectedProducto(selectedValue as number);

    if (selectedProducto) {
      setCompra((prevCompra) => ({
        ...prevCompra,
        ID_Producto: selectedProducto,
      }));
    } else {
      console.error(
        "El producto seleccionado no se encuentra en la lista de productos."
      );
    }
  };

  const handleConfirmClose = () => {
    setOpenDialog(false);
    handleClose();
  };

  const handleRequestClose = () => {
    setOpenDialog(true);
  };

  const handleAgregarProducto = () => {
    setIsExistProductos(!isExistProductos);
  };
  const handleAgregarProveedor = () => {
    setIsExistProveedores(!isExistProveedores);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nameParts: string[] = name.split(".");
    if (nameParts.length > 1) {
      setCompra((prev) => ({
        ...prev,
        [nameParts[0]]: {
          ...prev[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else {
      setCompra((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGuardar = () => {
    sendHttpRequest(
      {
        url: `${url}/EntradaInventario/`,
        method: "POST",
        data: compra,
        authToken:auth,
      },
      () => {
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
            width: { xs: "90%", sm: "70%", md: "50%" },
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
                Detalles del Proveedor
              </Typography>
              <Tooltip title="Add">
                <IconButton onClick={handleAgregarProveedor}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Grid container spacing={3}>
                {isExistProveedores ? (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="Proveedor-selector-label">
                        Proveedor
                      </InputLabel>
                      <Select
                        labelId="Proveedor-selector-label"
                        value={selectedValue}
                        label="Seleccionar Proveedor"
                        onChange={handleProveedorChange}
                      >
                        {proveedor.map((proveedor, index) => (
                          <MenuItem key={index} value={proveedor.ID_Proveedor}>
                            {proveedor.Nombre_Proveedor}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="Nombre_Proveedor"
                        name="ID_Proveedor.Nombre_Proveedor"
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
                        name="ID_Proveedor.Contacto"
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
                        name="ID_Proveedor.Teléfono"
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
                        name="ID_Proveedor.Dirección"
                        label="Dirección Stock"
                        fullWidth
                        autoComplete="Dirección"
                        variant="standard"
                        value={compra.ID_Proveedor.Dirección}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Typography
                variant="h5"
                component="div"
                style={{ padding: "16px" }}
              >
                Detalles del Producto
              </Typography>
              <Tooltip title="Add">
                <IconButton onClick={handleAgregarProducto}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Grid container spacing={3}>
                {isExistProductos ? (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="producto-selector-label">
                        Producto
                      </InputLabel>
                      <Select
                        labelId="producto-selector-label"
                        value={selectedProducto}
                        label="Producto"
                        onChange={handleProductoChange}
                      >
                        {productos.map((prov, index) => (
                          <MenuItem key={index} value={prov.ID_Producto}>
                            {prov.Nombre_Producto}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        id="Nombre_Producto"
                        name="ID_Producto.Nombre_Producto"
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
                        name="ID_Producto.Descripción"
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
                        name="ID_Producto.ID_Categoria"
                        label="ID Categoria"
                        fullWidth
                        autoComplete="ID Categoria"
                        variant="standard"
                        value={compra.ID_Producto.ID_Categoria}
                        onChange={handleFieldChange}
                      />
                    </Grid>
                  </>
                )}
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

export default AgregarCompra;

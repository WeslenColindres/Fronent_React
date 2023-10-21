import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashbord";
import Login from "./components/public/Login/Login";
import { useAuth } from "./contexts/AuthContext";
import MainContent from "./components/Dashboard/MainContent/MainContent";
import Producto from "./components/Producto/Producto";
import Compra from "./components/Compra/Compra";
import DetalleProducto from "./components/Producto/DetalleProducto";
import FormularioProducto from './components/Producto/FormularioProducto';
import Proveedor from "./components/Proveedor/Proveedor";
import DetalleProveedor from './components/Proveedor/DetalleProveedor';
import FormularioProveedor from './components/Proveedor/FormularioProveedor';
import DetalleCompra from './components/Compra/DetalleCompra/DetalleCompra';
import FormularioCompra from './components/Compra/FormularioCompra/FormularioCompra';
import GaleriaProductos from './components/public/GaleriaProductos/GaleriaProductos';

function RouterApp() {
  const { isAuthenticated } = useAuth();


  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Outlet /> 
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      >
        <Route
          path="Home"
          element={isAuthenticated ? <MainContent /> : <Navigate to="/login" />}
        />
        <Route
          path="Productos"
          element={
            isAuthenticated ? (
              <MainContent>
                <Producto />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/Producto/detalles/:id"
          element={
            isAuthenticated ? (
              <MainContent>
                <DetalleProducto />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/Producto/modificar/:id"
          element={
            isAuthenticated ? (
              <MainContent>
                <FormularioProducto />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="proveedor"
          element={
            isAuthenticated ? (
              <MainContent>
                <Proveedor />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/proveedor/detalles/:id"
          element={
            isAuthenticated ? (
              <MainContent>
                <DetalleProveedor />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/Proveedor/modificar/:id"
          element={
            isAuthenticated ? (
              <MainContent>
                <FormularioProveedor />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/Compras"
          element={
            isAuthenticated ? (
              <MainContent>
                <Compra />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
         <Route
          path="/dashboard/Compras/detalles/:id"
          element={
            isAuthenticated ? (
              <MainContent>
                <DetalleCompra />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard/Compras/modificar/:id"
          element={
            isAuthenticated ? (
              <MainContent>
                <FormularioCompra />
              </MainContent>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/Publico" element={<GaleriaProductos />} />
    </Routes>
  );
}

export default RouterApp;

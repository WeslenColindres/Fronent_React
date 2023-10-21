import * as React from "react";

import { useUrl } from '../../contexts/UrlContext';
import { sendHttpRequest, getAuthToken } from '../../../services/api/httpService';
import { Producto } from "../../type/type";
import ListaProductos from "./ListaProductos";



export default function Producto() {

  const { url, up } = useUrl(); 

  const [productos, setProductos] = React.useState<Producto[]>([]);

  const auth = getAuthToken();

  React.useEffect(() => {

    sendHttpRequest(
      {
        url: `${url}/Producto/`,
        method: "GET",
        authToken:auth,
      },
      (response) => {
        console.log(response);
        setProductos((prev) => prev = response.data.results);
      },
      (error) => {
        console.error("Error de login", error);
      }
    );
  }, [up]);
  

  return (
      <ListaProductos data={productos}/>
  );
}
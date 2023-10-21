import * as React from "react";

import { useUrl } from '../../contexts/UrlContext';
import { getAuthToken, sendHttpRequest } from '../../../services/api/httpService';
import { Compra } from "../../type/type";
import ListaCompras from './ListaCompras/ListaCompras';



export default function Compra() {

  const { url, up } = useUrl(); 

  const [compra, setCompra] = React.useState<Compra[]>([]);

  const auth = getAuthToken();

  React.useEffect(() => {

    sendHttpRequest(
      {
        url: `${url}/EntradaInventario/`,
        method: "GET",
        authToken:auth,
      },
      (response) => {
        console.log(response);
        setCompra(response.data.results);
      },
      (error) => {
        console.error("Error de login", error);
      }
    );
  }, [up]);
  

  return (
      <ListaCompras data={compra}/>
  );
}
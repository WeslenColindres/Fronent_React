import React from 'react'
import { useUrl } from '../../contexts/UrlContext';
import { getAuthToken, sendHttpRequest } from '../../../services/api/httpService';
import { Proveedor } from '../../type/type';
import ListaProveedores from './ListaProveedores';

const Proveedor = () => {
  
    const { url, up } = useUrl(); 

    const [productos, setProductos] = React.useState<Proveedor[]>([]);

    
    const auth = getAuthToken();
  
    React.useEffect(() => {
  
      sendHttpRequest(
        {
          url: `${url}/Proveedor/`,
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
        <ListaProveedores data={productos}/>
    );
}

export default Proveedor

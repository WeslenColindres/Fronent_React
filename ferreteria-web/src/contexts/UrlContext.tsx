import * as React from 'react';
import { UrlContextType, UrlProviderProps } from '../interfaces/Interfaces';



// Crea un contexto de autenticación
const UrlContext = React.createContext<UrlContextType| undefined
>(undefined);

// Hook personalizado para acceder al contexto de autenticación
export const useUrl = (): UrlContextType => {
  const context = React.useContext(UrlContext);
  if (!context) {
    throw new Error('useUrl debe usarse dentro de un UrlProvider');
  }
  return context;
};

// Componente proveedor del contexto de autenticación


const UrlProvider: React.FC<UrlProviderProps> = ({ children }) => {
  const url = 'http://143.110.153.97:8000/api';

  const [up, setUp] = React.useState(true as boolean);

  const value: UrlContextType = {
    url,
    up,
    setUp,
  };

  return (
    <UrlContext.Provider value={value as UrlContextType}>
      {children}
    </UrlContext.Provider>
  )
  
};

export default UrlProvider;
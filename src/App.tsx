import { BrowserRouter as Router } from "react-router-dom";
import RouterApp from "./RouterApp";
import AuthProvider from "./contexts/AuthContext";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <RouterApp />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

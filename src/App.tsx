// src/App.tsx
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";
import CustomNavbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/loginPage";
import Inicio from "./pages/InicioPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contactame" element={<ContactPage />} />

        {/* Rutas privadas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/home" element={<Inicio />} />
          <Route path="/historyPage" element={<HistoryPage />} />
        </Route>

        {/* Ruta para página no encontrada */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// hooks
import { useState, useEffect } from "react";
import { useAutenthicator } from "./hooks/useAutenthicator";

// provider
import { AuthProvider } from "./context/AuthContext";

// pages
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import CriarPost from "./pages/CriarPost/CriarPost";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [usuario, setUsuario] = useState(undefined);
  const { auth } = useAutenthicator();

  const carregandoUsuario = usuario === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (usuario) => {
      setUsuario(usuario);
    });
  }, [auth]);

  if (carregandoUsuario) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ usuario }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route
                path="/login"
                element={!usuario ? <Login /> : <Navigate to={"/"} />}
              />
              <Route
                path="/register"
                element={!usuario ? <Register /> : <Navigate to={"/"} />}
              />
              <Route
                path="/posts/criar"
                element={usuario ? <CriarPost /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/dashboard"
                element={usuario ? <Dashboard /> : <Navigate to={"/login"} />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

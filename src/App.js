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
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";

function App() {
  const [user, setUsuario] = useState(undefined);
  const { auth } = useAutenthicator();

  const carregandoUsuario = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
  }, [auth]);

  if (carregandoUsuario) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to={"/"} />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to={"/"} />}
              />
              <Route
                path="/posts/criar"
                element={user ? <CriarPost /> : <Navigate to={"/login"} />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to={"/login"} />}
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

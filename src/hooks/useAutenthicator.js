import { app, db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAutenthicator = () => {
  const [error, setErro] = useState(null);
  const [carregando, setCarregando] = useState(null);

  // cleanup
  const [cancelado, setCancelado] = useState(false);

  const auth = getAuth(app);

  function checandoSeFoiCancelado() {
    if (cancelado) {
      return;
    }
  }
  const criarUsuario = async (data) => {
    checandoSeFoiCancelado();

    setCarregando(true);
    setErro(null);
    try {
      const { usuario } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      await updateProfile(usuario, {
        displayName: data.displayName,
      });

      setCarregando(false);

      return usuario;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let ErroDeSistema;

      if (error.message.includes("Password")) {
        ErroDeSistema = "a senha precisa de 6 caracteres";
      } else if (error.message.includes("email-already")) {
        ErroDeSistema = "usuario ja cadastrado";
      } else {
        ErroDeSistema = "ocorreu um erroaaaaaaaaaaaa";
      }
      setCarregando(false);
      setErro(ErroDeSistema);
    }
  };

  // logout
  const logout = () => {
    checandoSeFoiCancelado();

    signOut(auth);
  };

  // login
  const login = async (data) => {
    checandoSeFoiCancelado();
    setCarregando(true);
    setErro(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.senha);
      setCarregando(false);
    } catch (error) {
      let ErroSitema;

      if (error.message.includes("user-not-found")) {
        ErroSitema = "usuario nao encontrado";
      } else if (error.message.includes("wrong-password")) {
        ErroSitema = "senha incorreta";
      } else {
        ErroSitema = "email ou senha Inválido";
      }
      setErro(ErroSitema);
      setCarregando(false);
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return {
    auth,
    criarUsuario,
    error,
    carregando,
    logout,
    login,
  };
};

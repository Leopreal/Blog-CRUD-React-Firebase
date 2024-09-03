import { db } from "../firebase/config";

import {
  getAuth,
  criarUsuarioComEmailESenha,
  EntrarComEmailESenha,
  AtualizarPerfil,
  Sair,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAutenthicator = () => {
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(null);

  // cleanup
  const [cancelado, setCancelado] = useState(false);

  const auth = getAuth();

  function checandoSeFoiCancelado() {
    if (cancelado) {
      return;
    }
  }
  const criarUsuario = async (data) => {
    checandoSeFoiCancelado();

    setCarregando();
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
        ErroDeSistema = "ocorreu um erro";
      }
      setErro(ErroDeSistema);
    }
    setCarregando(false);
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return {
    auth,
    criarUsuario,
    erro,
    carregando,
  };
};

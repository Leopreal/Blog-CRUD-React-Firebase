import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  EntrarComEmailESenha,
  Sair,
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

    setCarregando(true);
    // setErro(null);
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
    } catch (erro) {
      console.log(erro.message);
      console.log(typeof erro.message);

      let ErroDeSistema;

      if (erro.message.includes("Password")) {
        ErroDeSistema = "a senha precisa de 6 caracteres";
      } else if (erro.message.includes("email-already")) {
        ErroDeSistema = "usuario ja cadastrado";
      } else {
        ErroDeSistema = "ocorreu um erroaaaaaaaaaaaa";
      }
      setCarregando(false);
      setErro(ErroDeSistema);
    }
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

import {
  getAuth,
  criarUsuarioComEmailESenha,
  EntrarComEmailESenha,
  AtualizarPerfil,
  Sair,
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
    checandoSeFoiCancelado()
  }
};

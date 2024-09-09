import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const EstadoInicial = {
  carregando: null,
  error: null,
};

const InserirReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { carregando: true, error: null };
    case "INSERTED_DOC":
      return { carregando: false, error: null };
    case "ERROR":
      return { carregando: false, error: action.payload }; // cuidar
    default:
      return state;
  }
};

export const useInserirDocumento = (colecaoDocs) => {
  const [response, dispatch] = useReducer(InserirReducer, EstadoInicial);

  // tratar vazamento de memoria
  const [cancelado, setCancelado] = useState(false);

  const checandoSeFoiCanceladoDepoisDoDispatch = (action) => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const InserirDocumento = async (documento) => {
    checandoSeFoiCanceladoDepoisDoDispatch({
      type: "LOADING", // CUIDAR
    });
    try {
      const novoDocumento = { ...documento, criarAt: Timestamp.now() };

      const DocumentoInserido = await addDoc(
        collection(db, colecaoDocs),
        novoDocumento
      );
      checandoSeFoiCanceladoDepoisDoDispatch({
        type: "INSERTED_DOC",
        payload: DocumentoInserido,
      });
    } catch (error) {
      checandoSeFoiCanceladoDepoisDoDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return { InserirDocumento, response };
};

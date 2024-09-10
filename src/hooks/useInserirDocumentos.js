// import { useState, useEffect, useReducer } from "react";
// import { db } from "../firebase/config";
// import { collection, addDoc, Timestamp } from "firebase/firestore";

// const EstadoInicial = {
//   carregando: null,
//   erro: null,
// };

// const InserirReducer = (state, action) => {
//   switch (action.type) {
//     case "LOADING":
//       return { carregando: true, erro: null };
//     case "INSERTED_DOC":
//       return { carregando: false, erro: null };
//     case "ERROR":
//       return { carregando: false, erro: action.carregamento }; // cuidar
//     default:
//       return state;
//   }
// };

// export const useInserirDocumento = (colecaoDocs) => {
//   const [response, dispatch] = useReducer(InserirReducer, EstadoInicial);

//   // tratar vazamento de memoria
//   const [cancelado, setCancelado] = useState(false);

//   const checandoSeFoiCanceladoDepoisDoDispatch = (action) => {
//     if (!cancelado) {
//       dispatch(action);
//     }
//   };

//   const InserirDocumento = async (documento) => {
//     checandoSeFoiCanceladoDepoisDoDispatch({
//       type: "LOADING", // CUIDAR
//     });
//     try {
//       const novoDocumento = { ...documento, criarAt: Timestamp.now() };

//       const DocumentoInserido = await addDoc(
//         collection(db, colecaoDocs),
//         novoDocumento
//       );
//       checandoSeFoiCanceladoDepoisDoDispatch({
//         type: "INSERTED_DOC",
//         carregamento: DocumentoInserido,
//       });
//     } catch (error) {
//       checandoSeFoiCanceladoDepoisDoDispatch({
//         type: "ERROR",
//         carregamento: error.message,
//       });
//     }
//   };

//   useEffect(() => {
//     return () => setCancelado(true);
//   }, []);

//   return { InserirDocumento, response };
// };
import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};

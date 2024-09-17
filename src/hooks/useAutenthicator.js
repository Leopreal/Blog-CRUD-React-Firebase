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
  const [carregando, setCarregando] = useState(false);
 

  const auth = getAuth(app);

 

  const criarUsuario = async (data) => {
   
    setCarregando(true);
    setErro(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });

      setCarregando(false);

      return user;
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  };

  const logout = () => {
    
    signOut(auth);
  };

  const login = async (data) => {
    
    setCarregando(true);
    setErro(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.senha);
      setCarregando(false);
    } catch (error) {
      setCarregando(false);
      setErro(error.message);
    }
  };


  return {
    auth,
    criarUsuario,
    error,
    carregando,
    logout,
    login,
  };
};

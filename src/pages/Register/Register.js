import React from "react";
import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState();
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError();

    const usuario = {
      displayName,
      email,
      senha,
    };

    if (senha !== confirmarSenha) {
      setError("As senhas não coincindem");
      return;
    }
    console.log(usuario);
  };
  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="seuNome"
            required
            placeholder="Nome de Usuario"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="senha"
            required
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <label>
          <span>Confirmar Senha: </span>
          <input
            type="password"
            name="senha"
            required
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </label>
        <button className="btn">Cadastrar!</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;

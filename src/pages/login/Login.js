import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useAutenthicator } from "../../hooks/useAutenthicator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, carregando } = useAutenthicator();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const usuario = {
      email,
      senha,
    };

    const res = await login(usuario);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1>Entre com a sua Conta!</h1>

      <form onSubmit={handleSubmit}>
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
        {!carregando && <button className="btn">Entrar!</button>}
        {carregando && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;

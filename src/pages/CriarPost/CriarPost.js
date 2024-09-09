import styles from "./CriarPost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInserirDocumento } from "../../hooks/useInserirDocumentos";

const CriarPost = () => {
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { usuario } = useAuthValue();

  const { InserirDocumento, response } = useInserirDocumento("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    // validar url imagem

    // criar array tags

    // checar os valores

    InserirDocumento({
      titulo,
      imagem,
      body,
      tags,
      userID: usuario.userID,
      criadoPor: usuario.displayName,
    });

    //refiresionar para homepage
  };

  return (
    <div className={styles.criarpost}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="text"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa seu post"
            onChange={(e) => setImagem(e.target.value)}
            value={imagem}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.carregando && <button className="btn">Cadastrar!</button>}
        {response.carregando && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </div>
  );
};

export default CriarPost;

import styles from "./Home.module.css";
// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// components

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.home}>
      <h1>Veja os Postos mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Busque por tags"
          onChange={(e) => e.target.value}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>não foram encontrados</p>
            <Link to={"/posts/criar"} className="btn">
              Criar Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

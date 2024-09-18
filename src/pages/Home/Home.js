import styles from "./Home.module.css";
// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocments } from "../../hooks/useFetchDocments";

// components
import PostDetails from "../../components/PostDetails";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      <h1>Veja os Postos mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Busque por tags"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}

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

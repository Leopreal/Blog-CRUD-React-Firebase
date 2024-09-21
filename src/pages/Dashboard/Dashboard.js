import React from "react";
import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";
//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocments } from "../../hooks/useFetchDocments";
import { useDeletarPost } from "../../hooks/useDeletarPost";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  // post usuario
  const { documents: posts, loading } = useFetchDocments("posts", null, uid);

  const { deletarPost } = useDeletarPost("posts");

  return (
    <div className={styles.dashboard}>
      <h2>DashBoard</h2>
      <p>Gerencie os seus Posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>não foram encontrados posts</p>
          <Link to={"/posts/create"} className="btn">
            Crie o seu post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deletarPost(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;

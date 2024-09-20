import React from "react";
import PostDetails from "../../components/PostDetails";
import style from "./Seach.module.css";

// hooks
import { useFetchDocments } from "../../hooks/useFetchDocments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();

  const search = query.get("q");

  const { documents: posts } = useFetchDocments("posts", search);

  return (
    <div className={style.search_container}>
      <div className={style.nopost}>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados</p>
            <Link to={"/"} className="btn btn-dark">
              Voltar
            </Link>
          </>
        )}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;

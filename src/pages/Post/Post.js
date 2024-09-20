import style from "./Post.module.css";

// hooks
import { useParams } from "react-router-dom";
import { useFetchDocment } from "../../hooks/useFetchOneDocument";

const Post = () => {
  const { id } = useParams();
  const { document: oPost } = useFetchDocment("posts", id);

  return (
    <div className={style.post_container}>
      {oPost && (
        <>
          <h1>{oPost.title}</h1>
          <img src={oPost.image} alt={oPost.title} />
          <p>{oPost.body}</p>
          <h3>Este é um post sobre:</h3>
          <div className={style.tags}>
            {oPost.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;

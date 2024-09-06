import styles from "./Sobre.module.css";

import { Link } from "react-router-dom";

const Sobre = () => {
  return (
    <div className={styles.sobre}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito com React no front-end e Firebase
        no back-end.
      </p>
      <Link to="/posts/create" className="btn">
        Criar post
      </Link>
    </div>
  );
};

export default Sobre;

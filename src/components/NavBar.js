import { NavLink } from "react-router-dom";
import { useAutenthicator } from "../hooks/useAutenthicator";
import { useAuthValue } from "../context/AuthContext";
import styles from "./NavBar.module.css";
import React from "react";

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAutenthicator();

  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/register"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to={"/posts/criar"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                DashBoard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to={"/sobre"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

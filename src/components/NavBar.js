import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import React from 'react'

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
            <NavLink to={"/"} className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>   
            </li>
            <li>
            <NavLink to={"/sobre"} className={({isActive}) => (isActive ? styles.active : "")}>Sobre</NavLink> 
            </li>
        </ul>
    </nav>
  )
}

export default NavBar
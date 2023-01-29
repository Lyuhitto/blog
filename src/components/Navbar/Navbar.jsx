import React from "react"
import { Link } from "gatsby"
import {container, menus} from './Navbar.module.css'
// import './Navbar.module.css'


export default function Navbar() {
  return (
    <div className={container}>
      <ul className={menus}>
        {menusList.map((item, key) => (
          <li key={key}>
            <Link to={item.url}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const menusList = [
  { name: "Home", url: "/" },
  { name: "Post", url: "/posts" },
  { name: "About", url: "/about" },
]

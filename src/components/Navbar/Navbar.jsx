import React from "react"
import { Link } from "gatsby"
import {container, logo, menus} from './Navbar.module.css'
// import './Navbar.module.css'
import blogLogo from './../../images/blogLogo.png'


export default function Navbar() {
  return (
    <div className={container}>
      <div className={logo}>
        <img src={blogLogo} alt="홈으로 가기" />
      </div>
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

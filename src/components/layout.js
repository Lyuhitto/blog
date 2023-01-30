import * as React from "react"
import { Link } from "gatsby"
import Navbar from './Navbar/Navbar'

const Layout = ({ children }) => {

  return (
    <div className="global-wrapper">
      <Navbar  />
      <main>{children}</main>
    </div>
  )
}

export default Layout

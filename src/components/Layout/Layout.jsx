import * as React from "react"
import { Link } from "gatsby"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

const Layout = ({ children }) => {
  return (
    <div className="global-wrapper">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

import * as React from "react"
import { Link } from "gatsby"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

import { container, navbarWrapper, mainWrapper, footerWrapper } from "./Layout.module.css"
import GlobalWrapper from "./../GlobalWrapper/GlobalWrapper"

const Layout = ({ children }) => {
  return (
    <div className={container}>
      <section className={navbarWrapper}>
        <GlobalWrapper>
          <Navbar />
        </GlobalWrapper>
      </section>
      <section className={mainWrapper}>
        <GlobalWrapper>
          <main>{children}</main>
        </GlobalWrapper>
      </section>
      <section className={footerWrapper}>
        <GlobalWrapper>
          <Footer />
        </GlobalWrapper>
      </section>
    </div>
  )
}

export default Layout

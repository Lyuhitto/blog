import React from "react"
import {globalWrapper} from "./GlobalWrapper.module.css"

export default function GlobalWrapper({ children }) {
  return <div className={globalWrapper}>{children}</div>
}

import React, { createContext, useState, useEffect } from "react";

import Sidebar from "../../../components/Sidebar";
import Toolbar from "../../../components/Toolbar";

import * as styles from "./SiteLayout.module.css";

export default function SiteLayout({ pageContext, children }) {
  return (
    <div className={styles.component}>
      <Sidebar />
      <main className={styles.main} id="main">
        <Toolbar />
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { Navigation, Header } from "../components";
import styles from "./MainLayout.module.css";
import { getUser } from "../api/user";
import UserImageContext from "../contexts/UserImageContext";



function MainLayout({ children }) {
    const [url, setUrl] = useState("");

  useEffect(() => {
    getUser().then((res) => {
      setUrl(res.data.image);
      localStorage.setItem("im-userid", res.data.id);
    });
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <UserImageContext.Provider value={url}>
        <div className={styles.container}>{children}</div>
      </UserImageContext.Provider>
    </div>
  );
}

export default MainLayout;

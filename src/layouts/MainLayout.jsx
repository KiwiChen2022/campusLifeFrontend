
import React, { useState, useEffect } from "react";
import { Navigation, Header } from "../components";
import styles from "./MainLayout.module.css";
import { getUser } from "../api/user";
import UserImageContext from "../contexts/UserImageContext";



function MainLayout({ children }) {
    const [url, setUrl] = useState("");


    const isUrl = (url) => {
      const pattern = new RegExp(
        '^https?:\\/\\/' // protocol (http or https)
      );
      return !!pattern.test(url);
    };
    
    
    const getImageUrl = (imageUrl) => {
      const baseUrl = "http://127.0.0.1:8081/ipfs/";
      return isUrl(imageUrl) ? imageUrl : baseUrl + imageUrl;
    };

  useEffect(() => {
    getUser().then((res) => {
      setUrl(res.data.image);
      localStorage.setItem("im-userid", res.data.id);
    });
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <UserImageContext.Provider value={getImageUrl(url)}>
      {/* <UserImageContext.Provider value={url}> */}
        <div className={styles.container}>{children}</div>
      </UserImageContext.Provider>
    </div>
  );
}

export default MainLayout;

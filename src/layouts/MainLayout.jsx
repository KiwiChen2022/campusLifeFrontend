
import React, { useState, useEffect } from "react";
import { Navigation, Header } from "../components";
import styles from "./MainLayout.module.css";
import { getUser } from "../api/user";
import UserImageContext from "../contexts/UserImageContext";



function MainLayout({ children }) {
    const [url, setUrl] = useState("");


    const isUrl = (url) => {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
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
        <div className={styles.container}>{children}</div>
      </UserImageContext.Provider>
    </div>
  );
}

export default MainLayout;

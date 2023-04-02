import React, { useState,useEffect } from "react";
import { Navigation,Header } from "../../components";
import { getUser } from "../../api/user";


function HomePage(){
    const [url, setUrl] = useState("");
    getUser().then(res=>{
    setUrl(res.data.image)
    localStorage.setItem("im-userid",res.data.id);
  })
  
    return (
    <div className="app">
        <Header />
        <img src={url}></img>
        <Navigation />
    </div>)
}

export default HomePage;
import React, { useState,useEffect } from "react";
import WebSocketClient from "../../utils/websocketClient";
import { Navigation } from "../../components";
import Header from "../../components/Header";
import { getUser } from "../../api/user";
// const socket = new WebSocketClient('ws://127.0.0.1:8004/ws');


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
import React, { useState,useEffect } from "react";
import { FaComments, FaUserAlt, FaCog } from "react-icons/fa";
import Chats from "../Chat/Chats";
import UserProfile from "../UserProfile/UserProfile";


function Navigation() {
  const [activeView, setActiveView] = useState("chat");
  const handleNavigation = (view) => {
    setActiveView(view);
  };
  return (
      <div className="navigation">
      <button onClick={() => handleNavigation("chat")}>
        <FaComments size={20} color={activeView === "chat" ? "blue" : "black"} />
      </button>
      <button onClick={() => handleNavigation("profile")}>
        <FaUserAlt size={20} color={activeView === "profile" ? "blue" : "black"} />
      </button>
      <button onClick={() => handleNavigation("settings")}>
        <FaCog size={20} color={activeView === "settings" ? "blue" : "black"} />
      </button>
      {activeView === "chat" && <Chats />}
      {activeView === "profile" && <UserProfile />}
      {/* {activeView === "settings" && <Settings />} */}
    </div>
  );
}

export default Navigation;

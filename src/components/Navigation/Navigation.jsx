import React, { useState } from "react";
import { FaComments, FaUserAlt, FaCog } from "react-icons/fa";
import Chats from "../Chat/Chats";
import UserProfile from "../UserProfile/UserProfile";
import { Friend } from "../Friend";


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
      <button onClick={() => handleNavigation("friend")}>
        <FaCog size={20} color={activeView === "friend" ? "blue" : "black"} />
      </button>
      {activeView === "chat" && <Chats />}
      {activeView === "profile" && <UserProfile />}
      {activeView === "friend" && <Friend />}
      {/* {activeView === "settings" && <Settings />} */}
    </div>
  );
}

export default Navigation;

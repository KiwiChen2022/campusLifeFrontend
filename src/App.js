import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chats from "./components/Chats";
import LandingPage from "./components/LandingPage/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/chats" element={<Chats />} />
      </Routes>
    </Router>
  );
};

export default App;

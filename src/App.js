import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, LandingPage } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;

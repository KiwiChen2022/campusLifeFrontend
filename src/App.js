import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, LandingPage } from "./pages";
import eventEmitter from "./utils/eventEmitter";
import { ErrorMessage, PrivateRoute, NotFound } from "./components";

const App = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (message) => {
      setError(message);
      setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
    };

    eventEmitter.on("apiError", handleError);

    return () => {
      eventEmitter.removeListener("apiError", handleError);
    };
  }, []);

  return (
    <>
      {error && <ErrorMessage message={error} />}
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<PrivateRoute />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

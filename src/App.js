import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { LandingPage, ChatsPage, UserProfilePage, FriendPage } from "./pages";
import eventEmitter from "./utils/eventEmitter";
import { ErrorMessage, PrivateRoute, NotFound } from "./components";
import "./layout.css";

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
      <div className="error-message-container">
        {error && (
          <ErrorMessage
            message={error}
            onClose={() => {
              setError(null);
            }}
          />
        )}
      </div>

      <div className="app-container">
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/homepage" element={<PrivateRoute />}>
              <Route index element={<ChatsPage />} />
              <Route path="profile" element={<UserProfilePage />} />
              <Route path="friend" element={<FriendPage />} />
              {/* <Route path="settings" element={<Settings />} /> */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;

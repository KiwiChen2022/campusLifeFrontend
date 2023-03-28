import React, { useState } from "react";
import { useNavigate }  from "react-router-dom";
import "./landingPage.css";

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // try {
    //   const response = await fetch("https://example.com/login", {
    //     method: "POST",
    //     body: JSON.stringify({ username, password }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.ok) {
    //     const { token } = await response.json();
    //     localStorage.setItem("authToken", token);
    //     navigate("/chats");
    //   } else {
    //     setError("Invalid username or password");
    //   }
    // } catch (error) {
    //   setError("An error occurred while logging in");
    // }
    navigate("/chats");
  };

  return (
    <div className="landing-page">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LandingPage;

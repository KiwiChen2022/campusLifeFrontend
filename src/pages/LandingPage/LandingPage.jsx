import React, { useState } from "react";
import { useNavigate }  from "react-router-dom";
import { login } from "../../api/login";

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = {
      username: username,
      password: password
    };
    
    login(user).then(res=>{
        localStorage.setItem("mushan-token",res.data);
        navigate("/homepage");
    })
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

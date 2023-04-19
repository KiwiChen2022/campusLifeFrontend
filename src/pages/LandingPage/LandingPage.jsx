import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/login";
import styles from "./LandingPage.module.css";

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = {
      username: username,
      password: password,
    };

    login(user).then((res) => {
      localStorage.setItem("token", res.data);
      navigate("/homepage");
    });
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.card}>
      <h1>Login</h1>
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
      <button onClick={handleLogin} className={styles.button}>Login</button>
      </div>
    </div>
  );
}

export default LandingPage;

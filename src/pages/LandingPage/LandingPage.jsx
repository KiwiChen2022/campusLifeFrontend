import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../api/login";
import styles from "./LandingPage.module.css";
import { SuccessMessage } from "../../components";

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

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

  const handleRegister = async () => {
    if (registerPassword !== registerConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      username: registerUsername,
      password: registerPassword,
    };

    try {
      await register(user);
      setSuccessMessage("Registration successful! Please log in."); // Set the success message
    } catch (error) {
      // the error will be handled on App.js
    }
  };

  return (
    <div className={styles.landingPage}>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => {
            setSuccessMessage(null);
          }}
        />
      )}
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
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={registerConfirmPassword}
          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister} className={styles.button}>
          Register
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

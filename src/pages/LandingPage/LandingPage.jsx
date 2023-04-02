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
    // try {
    //   const response = await fetch("http://127.0.0.1:8080/login", {
    //     method: "POST",
    //     body: JSON.stringify({ username, password }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
      // const data = {
      //   username: {username},
      //   password: {password},
      // }
      // console.log(data);
      // try {
      //     const response = request({
      //       url: '/login',
      //       method: 'post',
      //       data:data
      //   })
    //   console.log(response)
    //   console.log(response.data)
    //   if (response.ok) {
    //     const { token } = await response.json();
    //     localStorage.setItem("authToken", token);
    //     navigate("/chats");
    //   } else {
    //     setError("Invalid username or password");
    //   }
    // } catch (error) {
    //   setError("An error occurred while logging in");
    //   alert("error!")
    // }
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

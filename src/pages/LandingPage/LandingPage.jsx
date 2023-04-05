import React, { useState } from "react";
import { useNavigate }  from "react-router-dom";
import { login } from "../../api/login";
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'

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
        <NavBar>campus&nbsp;life</NavBar>
        <Logo/>
        <WingBlank>
            <List>
                <WhiteSpace/>
                <InputItem
                    placeholder='please enter username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                >username:</InputItem>
                <WhiteSpace/>
                <InputItem
                    placeholder='please enter password'
                    type="password"
                    handleLogin
                    onChange={(e) => setPassword(e.target.value)}
                >password:</InputItem>
                <WhiteSpace/>

                <Button type='primary' onClick={handleLogin}>sign in</Button>
            </List>
        </WingBlank>
    </div>
  );
}

export default LandingPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <span>Login</span>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="form-control inp_text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => handleLogin()}>Login</button>
        <div className="goMessage" onClick={() => navigate("/signup")}>
          Don't have an account?
        </div>
        <div className="goMessage" onClick={() => navigate("/")}>
          Or back to home?
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

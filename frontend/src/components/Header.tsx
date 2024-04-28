import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="logo">fullstack-login-1</div>
      <div className="loginStatus">
        {user ? (
          <div className="user-info">
            <span className="username">{user.nickname}</span>
            <button className="logout-button">Logout</button>
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

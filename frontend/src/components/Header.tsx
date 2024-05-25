import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <div className="header">
      <div className="logo">fullstack-login-1</div>
      <div className="loginStatus">
        {user ? (
          <div className="user-info">
            <span className="username">{user.nickname}</span>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
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

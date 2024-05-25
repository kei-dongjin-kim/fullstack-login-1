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
      <div className="login-status">
        {user ? (
          <div className="user-info">
            <span className="nickname">{user.nickname}</span>
            <button className="loginout-button" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <button
            className="loginout-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

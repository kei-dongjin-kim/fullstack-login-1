import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};

export default LogoutPage;

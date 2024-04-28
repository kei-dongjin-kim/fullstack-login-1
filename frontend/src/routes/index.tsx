import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import SignupPage from "../components/SignupPage";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<div>Logout</div>} />
      </Routes>
    </Router>
  );
};

export default index;

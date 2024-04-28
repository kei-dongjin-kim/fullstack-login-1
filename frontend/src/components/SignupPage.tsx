import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  // const [signup, { data, loading, error }] = useSignupMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   await signup({ variables: { email, password, name } });
  };

  return (
    <div className="signup">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <span>Sign Up</span>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          <div className="goMessage" onClick={() => navigate("/login")}>
            Already have an account?
          </div>
          <div className="goMessage" onClick={() => navigate("/")}>
            Or back to home?
          </div>
        </form>
        {/* {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>Account created successfully!</p>} */}
      </div>
    </div>
  );
};

export default SignupPage;

import React from "react";
import "../styles/Landing.css";
import { Link } from "react-router-dom";
import { LogIn, User } from "lucide-react";

const Landing = () => {
  return (
    <div className="container">
      <div className="container-buttons">
        <Link to="/admin">
          <LogIn color="white" />
          <div className="button">Login</div>
        </Link>
        <Link to="/">
          <User color="white" />
          <div className="button">Continue as guest</div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;

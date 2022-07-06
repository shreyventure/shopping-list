import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span className="navbar-brand mb-0 h1">Shopping List</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;

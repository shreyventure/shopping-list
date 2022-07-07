import React from "react";
import { Link } from "react-router-dom";
import { store } from "../configure-store";

const Header = () => {
  const { name } = store.getState();
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/"} className="decor-none">
          <span className="navbar-brand mb-0 h1">Shopping List</span>
        </Link>
        <Link to="/" className="decor-none">
          {name}
        </Link>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { store } from "../configure-store";

const Header = () => {
  const { name } = store.getState();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    Navigate("/");
  };
  return (
    <nav className="navbar text-light">
      <div className="container-fluid">
        <div to={"/"} className="decor-none">
          <span className="navbar-brand mb-0 h1">Shopping List</span>
        </div>
        {name === "" || name === undefined || name === null ? null : (
          <div to="/" className="decor-none text-light">
            <span className="mx-2 text-primary">{name}</span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

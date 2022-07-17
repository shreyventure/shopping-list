import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const name = useSelector((state) => state.name);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className="navbar text-light opacity-8 py-3 header">
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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_USERS } from "../Shopping-reducers/reducer";

const Header = () => {
  const name = useSelector((state) => state.name);
  const roomNo = useSelector((state) => state.roomNo);
  const socket = useSelector((state) => state.socket);
  const showUserbar = useSelector((state) => state.showUsers);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await socket.emit("logging_out", { roomNo, name });
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className="navbar navbar-expand-lg text-light opacity-8 py-3 header">
      <div className="container-fluid">
        <span to={"/"} className="decor-none navbar-brand">
          <span style={{ fontSize: "1.5rem" }}>Shopping List</span>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-light">
            <i className="bi bi-list"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item d-flex align-items-center link-decor">
              <span className="nav-link mx-2 text-light">About</span>
            </li>
            <li className="nav-item d-flex align-items-center link-decor">
              <span className="nav-link mx-2 text-light">Contact</span>
            </li>
            {name === "" || name === undefined || name === null ? null : (
              <>
                <li className="nav-item d-flex align-items-center link-decor">
                  <span
                    className="nav-link mx-2 text-light"
                    onClick={() =>
                      dispatch({ type: SET_SHOW_USERS, value: !showUserbar })
                    }
                  >
                    {showUserbar ? "Hide Users" : "Show Users"}
                  </span>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link mx-2 text-warning">{name}</span>
                </li>
                <li className="nav-item">
                  <div to="/" className="decor-none text-light nav-link">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

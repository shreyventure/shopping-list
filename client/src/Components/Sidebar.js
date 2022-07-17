import React from "react";
import UserIcon from "./UserIcon";

const Sidebar = ({ users }) => {
  return (
    <div className="sidebar d-flex flex-column p-3 ">
      {users !== null || users !== undefined
        ? users.map((name, idx) => <UserIcon key={idx} name={name} />)
        : null}
    </div>
  );
};

export default Sidebar;

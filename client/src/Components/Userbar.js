import React from "react";
import UserIcon from "./UserIcon";

const Userbar = ({ users }) => {
  return (
    <div className="userbar d-flex flex-column p-3 ">
      {users !== null || users !== undefined
        ? users.map((name, idx) => <UserIcon key={idx} name={name} />)
        : null}
    </div>
  );
};

export default Userbar;

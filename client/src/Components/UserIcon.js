import React from "react";

const UserIcon = ({ name }) => {
  return (
    <div
      className="userIcon d-flex justify-content-center align-items-center my-2"
      title={name}
    >
      {name[0]}
    </div>
  );
};

export default UserIcon;

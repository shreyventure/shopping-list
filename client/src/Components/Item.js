import React from "react";

const Item = ({ title, completed }) => {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
    </div>
  );
};

export default Item;

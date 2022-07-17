import React, { useEffect, useState } from "react";

const UserIcon = ({ name }) => {
  const [color, setColor] = useState("");
  useEffect(() => {
    const darkColors = [
      "#5F4B8BFF",
      "#000000FF",
      "#00A4CCFF",
      "#00203FFF",
      "#606060FF",
      "#2C5F2D",
      "#00539CFF",
      "#B1624EFF",
      "#A07855FF",
      "#603F83FF",
      "#2BAE66FF",
    ];
    const index = Math.floor(Math.random() * darkColors.length);
    setColor(darkColors[index]);
  }, []);

  return (
    <div
      className="userIcon d-flex justify-content-center align-items-center my-2"
      style={{ backgroundColor: color, color: "white" }}
      title={name}
    >
      {name[0]}
    </div>
  );
};

export default UserIcon;

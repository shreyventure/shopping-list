import React from "react";
import error404 from "../Images/error404.png";
const FourZeroFour = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <img
        src={error404}
        alt="Four O Four Error"
        width={"70%"}
        loading="lazy"
      />
      <p className="lead">Page not found...</p>
    </div>
  );
};

export default FourZeroFour;

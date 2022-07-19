import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

const Alert = ({ type, msg, show }) => {
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (show === true) setShowMessage(true);
    else setShowMessage(false);
  }, [show]);
  return (
    <>
      <CSSTransition
        in={showMessage}
        timeout={700}
        classNames="AlertAnimation"
        unmountOnExit
      >
        <div className={`alert alert-${type} mx-1`} role="alert">
          {msg}
        </div>
      </CSSTransition>
    </>
  );
};

export default Alert;

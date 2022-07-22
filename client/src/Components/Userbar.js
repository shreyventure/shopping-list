import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import UserIcon from "./UserIcon";

const Userbar = ({ users }) => {
  const showUserbar = useSelector((state) => state.showUsers);

  return (
    <CSSTransition
      in={showUserbar}
      timeout={700}
      classNames="UserbarAnimation"
      unmountOnExit
    >
      <div className="userbar d-flex flex-column p-3 ">
        {users !== null || users !== undefined
          ? users.map((name, idx) => <UserIcon key={idx} name={name} />)
          : null}
      </div>
    </CSSTransition>
  );
};

export default Userbar;

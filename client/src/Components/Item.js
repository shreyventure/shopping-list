import { useDispatch } from "react-redux";
import { store } from "../configure-store";
import {
  LOADING_FALSE,
  LOADING_TRUE,
  SET_SHOPPING_LIST,
} from "../Shopping-reducers/reducer";

const Item = ({ title, completed, timestamp, id, completedBy }) => {
  const dispatch = useDispatch();
  const { socket, roomNo, shoppingList, name } = store.getState();

  const handleDelete = () => {};

  const handleComplete = () => {
    console.log("handling complete");
    dispatch({ type: LOADING_TRUE });

    const newList = [...shoppingList];
    newList.forEach((item, idx) => {
      if (item.id === id) {
        item.completed = !item.completed;
        item.completedBy = name;
        return;
      }
    });
    dispatch({ type: SET_SHOPPING_LIST, value: newList });
    socket.emit("changed_list", { newList, roomNo });

    dispatch({ type: LOADING_FALSE });
  };

  return (
    <div className="card m-1">
      <div className="d-flex justify-content-around">
        <div className="card-body">
          <div className={`${completed === true ? "line-through" : ""}`}>
            {title}
          </div>
        </div>
        <div className="d-flex justify-content-around align-items-center px-1">
          <i
            className="bi bi-trash-fill px-2 hover-pointer"
            onClick={handleDelete}
          ></i>
          <i
            className={`bi ${
              completed === true ? "bi-cart-x-fill" : "bi-cart-check-fill"
            } border-start px-2 hover-pointer`}
            onClick={handleComplete}
          ></i>
        </div>
      </div>
      <div
        className="card-footer text-muted font-weight-lighter d-flex justify-content-between"
        style={{ fontSize: "12px" }}
      >
        <div>{timestamp}</div>
        {completed === true ? <div>{completedBy}</div> : null}
      </div>
    </div>
  );
};

export default Item;

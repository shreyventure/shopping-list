import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Item from "../Components/Item";
import Userbar from "../Components/Userbar";
import {
  LOGOUT,
  SET_SHOPPING_LIST,
  SET_USERS,
} from "../Shopping-reducers/reducer";

const Shopping = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("danger");
  const [alertMsg, setAlertMsg] = useState("");

  const [glow, setGlow] = useState(false);

  const Navigate = useNavigate();

  const [newItem, setNewItem] = useState("");
  const dispatch = useDispatch();

  const shoppingList = useSelector((state) => state.shoppingList);
  const socket = useSelector((state) => state.socket);
  const roomNo = useSelector((state) => state.roomNo);
  const users = useSelector((state) => state.users);
  const name = useSelector((state) => state.name);

  useEffect(() => {
    if (roomNo === null) {
      dispatch({ type: LOGOUT });
      Navigate("/");
    }

    try {
      socket.on("changed_list", (data) => {
        dispatch({ type: SET_SHOPPING_LIST, value: data.newList });
      });

      socket.on("new_users_list", async (new_users) => {
        dispatch({ value: new_users, type: SET_USERS });
      });
    } catch (error) {
      dispatch({ type: LOGOUT });
      Navigate("/");
    }
  }, [Navigate, dispatch, socket, roomNo, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let NewItem = newItem.trim();
    if (NewItem.length === 0) {
      setAlertType("danger");
      setAlertMsg("A list item cannot be empty.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    if (NewItem.length > 200) {
      setAlertType("danger");
      setAlertMsg("A list item cannot extend 200 characters.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    let today = new Date();
    let timestamp =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear() +
      " @ " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    const newList = [
      {
        title: NewItem,
        completed: false,
        id: Date.now(),
        completedBy: "",
        timestamp,
      },
      ...shoppingList,
    ];

    dispatch({ type: SET_SHOPPING_LIST, value: newList });
    socket.emit("changed_list", { newList, roomNo });
    setNewItem("");

    setGlow(true);
    setTimeout(() => {
      setGlow(false);
    }, 3000);
  };
  return (
    <div className="d-flex">
      <Userbar users={users} />
      <div className="shopping container mb-5">
        <form
          className="form d-flex justify-content-around my-4"
          onSubmit={handleSubmit}
        >
          <div className="form-floating d-inline-block w-100 me-3">
            <input
              className="form-control mx-1 outline-none bg-transparent border-bottom-in"
              type="text"
              name="item"
              id="item"
              placeholder="Bread.."
              value={newItem}
              onChange={(e) => {
                setNewItem(e.target.value);
              }}
            />
            <label htmlFor="item" className="text-muted">
              Bread...
            </label>
          </div>
          <button type="submit" className="btn btn-success mx-1">
            Add
          </button>
        </form>
        <Alert type={alertType} msg={alertMsg} show={showAlert} />
        {shoppingList.map((item, idx) => (
          <Item
            key={item.id + "_" + String(idx)}
            title={item.title}
            completed={item.completed}
            timestamp={item.timestamp}
            id={item.id}
            completedBy={item.completedBy}
            completedTime={item.completedTime}
            idx={idx}
            glow={idx === 0 && glow === true ? glow : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Shopping;

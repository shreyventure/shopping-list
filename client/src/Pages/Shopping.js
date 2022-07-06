import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Item from "../Components/Item";
import { store } from "../configure-store";
import {
  LOADING_FALSE,
  LOADING_TRUE,
  SET_SHOPPING_LIST,
} from "../Shopping-reducers/reducer";

const Shopping = () => {
  const state = store.getState();
  const Navigate = useNavigate();

  const [newItem, setNewItem] = useState("");
  const dispatch = useDispatch();
  const { shoppingList, socket, roomNo } = store.getState();

  useEffect(() => {
    if (state.roomNo === null) Navigate("/");

    socket.on("changed_list", (data) => {
      dispatch({ type: LOADING_TRUE });
      dispatch({ type: SET_SHOPPING_LIST, value: data.newList });
      dispatch({ type: LOADING_FALSE });
    });
  }, [Navigate, dispatch, socket, state.roomNo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: LOADING_TRUE });

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
        title: newItem,
        completed: false,
        id: Date.now(),
        timestamp,
      },
      ...shoppingList,
    ];

    dispatch({ type: SET_SHOPPING_LIST, value: newList });
    socket.emit("changed_list", { newList, roomNo });
    setNewItem("");

    dispatch({ type: LOADING_FALSE });
  };
  return (
    <div>
      <form
        className="form d-flex justify-content-around my-2"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control mx-1"
          type="text"
          name="item"
          id="item"
          placeholder="Bread.."
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button type="submit" className="btn btn-success mx-1 d-flex">
          Add
        </button>
      </form>
      {shoppingList.map((item, idx) => (
        <Item
          key={item.id + "_" + String(idx)}
          title={item.title}
          completed={item.completed}
          timestamp={item.timestamp}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default Shopping;

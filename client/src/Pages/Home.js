import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getDoc, doc } from "@firebase/firestore";
import {
  LOADING_TRUE,
  LOADING_FALSE,
  NEW_ROOM_NO,
  SET_SHOPPING_LIST,
  SET_NAME,
} from "../Shopping-reducers/reducer";

const Home = () => {
  const [roomNo, setRoomNo] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const loading = useSelector((state) => state.loading);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: LOADING_TRUE });
    dispatch({ value: roomNo, type: NEW_ROOM_NO });
    dispatch({ value: name, type: SET_NAME });

    const docRef = doc(db, "shopping", roomNo);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch({ value: docSnap.data().newList, type: SET_SHOPPING_LIST });
    } else {
      dispatch({ value: [], type: SET_SHOPPING_LIST });
    }

    socket.emit("join_room", roomNo);
    dispatch({ type: LOADING_FALSE });
    navigate("/shopping");
  };
  return (
    <div
      className="text-center d-flex justify-content-around align-items-center flex-column m-auto"
      style={{ height: "80vh" }}
    >
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="number"
            name="roomno"
            id="roomno"
            className="m-auto form-control text-light outline-none bg-transparent border-bottom"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            placeholder="Room Number"
          />
          <label htmlFor="roomno" className="text-light">
            Enter room number
          </label>
        </div>
        <div className="form-floating my-2">
          <input
            type="text"
            name="name"
            id="name"
            className="m-auto form-control bg-transparent text-light outline-none border-bottom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <label htmlFor="roomno" className="text-light">
            Enter name
          </label>
        </div>
        <button type="submit" className="btn btn-success my-3">
          {loading === false ? (
            "Submit"
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default Home;

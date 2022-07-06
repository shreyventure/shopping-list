import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../configure-store";
import {
  LOADING_TRUE,
  LOADING_FALSE,
  NEW_ROOM_NO,
} from "../Shopping-reducers/reducer";

const Home = () => {
  const [roomNo, setRoomNo] = useState(0);

  const dispatch = useDispatch();
  const { socket } = store.getState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: LOADING_TRUE });
    dispatch({ value: roomNo, type: NEW_ROOM_NO });
    socket.emit("join_room", roomNo);
    dispatch({ type: LOADING_FALSE });
    navigate("/shopping");
  };
  return (
    <div className="text-center d-flex justify-content-around align-items-center flex-column m-auto">
      <h1>Enter Room No.</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="roomno"
          id="roomno"
          className="m-auto form-control text-center"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
        />
        <button type="submit" className="btn btn-success my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;

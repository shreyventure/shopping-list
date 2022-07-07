import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../configure-store";
import { db } from "../firebase";
import { getDoc, doc } from "@firebase/firestore";
import {
  LOADING_TRUE,
  LOADING_FALSE,
  NEW_ROOM_NO,
  SET_SHOPPING_LIST,
} from "../Shopping-reducers/reducer";

const Home = () => {
  const [roomNo, setRoomNo] = useState("");

  const dispatch = useDispatch();
  const state = store.getState();
  const socket = state.socket;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: LOADING_TRUE });
    dispatch({ value: roomNo, type: NEW_ROOM_NO });

    const docRef = doc(db, "shopping", roomNo);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      dispatch({ value: docSnap.data().newList, type: SET_SHOPPING_LIST });
    }

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
          placeholder="Room Number"
        />
        <button type="submit" className="btn btn-success my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getDoc, doc } from "@firebase/firestore";
import Alert from "../Components/Alert";
import {
  LOADING_TRUE,
  LOADING_FALSE,
  NEW_ROOM_NO,
  SET_SHOPPING_LIST,
  SET_NAME,
  SET_USERS,
  SET_SOCKET,
} from "../Shopping-reducers/reducer";

const Home = () => {
  const [roomNo, setRoomNo] = useState("");
  const [name, setName] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");

  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const loading = useSelector((state) => state.loading);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: LOADING_TRUE });

    if (socket.connected) {
      const docRef = doc(db, "shopping", roomNo);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const Data = docSnap.data();
        if (!Data.users.includes(name)) {
          dispatch({ value: roomNo, type: NEW_ROOM_NO });
          dispatch({ value: name, type: SET_NAME });
          dispatch({ value: Data.newList, type: SET_SHOPPING_LIST });
          dispatch({ value: [...Data.users, name], type: SET_USERS });
          let new_socket = { ...socket };
          new_socket.shopping_list_user_name = name;
          dispatch({ value: new_socket, type: SET_SOCKET });
        } else {
          setAlertMsg(
            `This user is already present in room number ${roomNo}. Please login using a different name or reach out to contact support.`
          );
          setShowAlert(true);
          setTimeout(() => {
            setAlertMsg("");
            setShowAlert(false);
          }, 7000);
          dispatch({ type: LOADING_FALSE });
          return;
        }
      } else {
        dispatch({ value: [], type: SET_SHOPPING_LIST });
        dispatch({ value: [name], type: SET_USERS });
      }

      await socket.emit("users_list_change", { roomNo, name });
      await socket.emit("join_room", { roomNo, name });
      console.log("no returnn");
      navigate("/shopping");
    } else {
      console.log("Error::: ", "Server Down");
      setAlertMsg(
        "Server is currently down or under maintanence. Please wait for  some time and try again later."
      );
      setAlertType("warning");
      setShowAlert(true);
    }
    setName("");
    setRoomNo("");
    dispatch({ type: LOADING_FALSE });
  };
  return (
    <div className="container">
      {showAlert ? (
        <Alert type={alertType} msg={alertMsg} show={showAlert} />
      ) : null}
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
              className="m-auto form-control outline-none bg-transparent border-bottom-in"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              placeholder="Room Number"
            />
            <label htmlFor="roomno" className="text-muted">
              Enter room number
            </label>
          </div>
          <div className="form-floating my-2">
            <input
              type="text"
              name="name"
              id="name"
              className="m-auto form-control bg-transparent outline-none border-bottom-in"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <label htmlFor="roomno" className="text-muted">
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
    </div>
  );
};

export default Home;

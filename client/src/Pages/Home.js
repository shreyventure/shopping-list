import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getDoc, doc } from "@firebase/firestore";
import Alert from "../Components/Alert";
import Checklist from "../Images/Checklist.png";

import {
  LOADING_TRUE,
  LOADING_FALSE,
  NEW_ROOM_NO,
  SET_SHOPPING_LIST,
  SET_NAME,
  SET_USERS,
  SET_SOCKET,
  SET_LOGGED_IN,
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
  const loggedIn = useSelector((state) => state.loggedIn);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: LOADING_TRUE });

    const Name = name.trim();
    if (Name.length === 0 || roomNo === "") {
      setAlertType("danger");
      setAlertMsg(`Please enter all the fields.`);
      setShowAlert(true);
      setTimeout(() => {
        setAlertMsg("");
        setShowAlert(false);
      }, 5000);
      dispatch({ type: LOADING_FALSE });

      return;
    }

    if (socket.connected) {
      const docRef = doc(db, "shopping", roomNo);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const Data = docSnap.data();
        if (!Data.users.includes(Name)) {
          dispatch({ value: roomNo, type: NEW_ROOM_NO });
          dispatch({ value: Name, type: SET_NAME });
          dispatch({ value: Data.newList, type: SET_SHOPPING_LIST });
          dispatch({ value: [...Data.users, Name], type: SET_USERS });
          let new_socket = { ...socket };
          new_socket.shopping_list_user_name = Name;
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
        dispatch({ value: [Name], type: SET_USERS });
      }

      await socket.emit("users_list_change", { roomNo, name });
      await socket.emit("join_room", { roomNo, name });
      dispatch({ type: SET_LOGGED_IN, value: true });
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
      <div className="d-flex justify-content-around align-items-center m-auto flex-wrap mt-4">
        <img
          className="my-3"
          src={Checklist}
          alt="Person holding the shopping list."
          width={"50%"}
          loading="lazy"
        ></img>
        <div className="p-5">
          <h1 className="playFair">
            Get access to your <br /> shared list
          </h1>
          <p className="pb-2" style={{ fontSize: "small" }}>
            Create a shopping list or access previously created list. <br />
            Login right away.
          </p>
          <div
            className="w-50 mb-5"
            style={{ borderBottom: "2px solid black" }}
          ></div>
          {!loggedIn ? (
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-floating">
                <input
                  type="number"
                  name="roomno"
                  id="roomno"
                  className="m-auto form-control outline-none border-bottom-in"
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
                  className="m-auto form-control outline-none border-bottom-in"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <label htmlFor="roomno" className="text-muted">
                  Enter name
                </label>
              </div>
              <button type="submit" className="btn btn-purple my-3 w-100">
                {loading === false ? (
                  "Submit"
                ) : (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </form>
          ) : (
            <Link to={"/shopping"} className="btn btn-success">
              Head to your shopping list <span>➡️</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

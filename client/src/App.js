import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Shopping from "./Pages/Shopping";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { SET_SOCKET } from "./Shopping-reducers/reducer";

const socket = io.connect("http://localhost:5000");
function App() {
  const dispatch = useDispatch();
  dispatch({ value: socket, type: SET_SOCKET });

  return (
    <div className="d-flex flex-column" style={{ minHeight: "110vh" }}>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shopping" element={<Shopping />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

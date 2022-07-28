import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Shopping from "./Pages/Shopping";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { SET_SOCKET } from "./Shopping-reducers/reducer";
import About from "./Pages/About";
import FourZeroFour from "./Pages/FourZeroFour";

// const socket = io.connect("http://localhost:5000"); // for local server
const socket = io.connect("https://shopping-list-server-1.herokuapp.com/");

function App() {
  const dispatch = useDispatch();
  dispatch({ value: socket, type: SET_SOCKET });

  return (
    <div className="d-flex flex-column" style={{ minHeight: "110vh" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

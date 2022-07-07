const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const firestoreClient = require("./firestoreClient");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", async (roomNo) => {
    console.log(roomNo);
    socket.join(roomNo);
  });

  socket.on("changed_list", async (data) => {
    await firestoreClient.save(data.roomNo, data);
    socket.to(data.roomNo).emit("changed_list", data);
  });
});

server.listen(5000, () => console.log("Server is running."));

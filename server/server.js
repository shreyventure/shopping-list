const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

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

  socket.on("join_room", async (data) => {
    const { roomNo } = data;

    socket.join(roomNo);
  });

  socket.on("changed_list", async (data) => {
    await firestoreClient.save(data.roomNo, data);
    socket.to(data.roomNo).emit("changed_list", data);
  });

  socket.on("users_list_change", async ({ roomNo, name }) => {
    const response = await firestoreClient.getData(roomNo);
    const Data = response.data();
    if (Data.users && !Data.users.includes(name)) {
      Data.users.push(name);
    } else if (Data.users && Data.users.includes(name)) {
      socket.join(roomNo);
      return;
    } else {
      Data.users = [name];
    }
    await firestoreClient.save(roomNo, Data);
    socket.to(roomNo).emit("new_users_list", Data.users);
  });

  socket.on("logging_out", async ({ roomNo, name }) => {
    const response = await firestoreClient.getData(roomNo);
    const Data = response.data();
    let newUsers = Data.users.filter((_name) => !(_name === name));
    Data.users = newUsers;
    await firestoreClient.save(roomNo, Data);
    socket.to(roomNo).emit("new_users_list", Data.users);
  });
});

server.listen(PORT, () => console.log(`Server is running over port ${PORT}`));

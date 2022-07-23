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
    const { roomNo, name } = data;
    socket.shopping_list_user_name = name;
    socket.shopping_list_room_no = roomNo;
    socket.join(roomNo);
  });

  socket.on("changed_list", async (data) => {
    const response = await firestoreClient.getData(data.roomNo);
    let Data = response.data();
    if (Data) {
      Data["newList"] = data.newList;
      await firestoreClient.save(data.roomNo, Data);
    } else {
      await firestoreClient.save(data.roomNo, Data);
    }
    socket.to(data.roomNo).emit("changed_list", data);
  });

  socket.on("users_list_change", async ({ roomNo, name }) => {
    const response = await firestoreClient.getData(roomNo);
    let Data = response.data();
    if (Data && Data.users && !Data.users.includes(name)) {
      Data.users.push(name);
    } else if (Data && Data.users && Data.users.includes(name)) {
      socket.join(roomNo);
      return;
    } else {
      Data = {};
      Data.newList = [];
      Data.users = [name];
      Data.roomNo = roomNo;
    }
    await firestoreClient.save(roomNo, Data);
    socket.to(roomNo).emit("new_users_list", Data.users);
  });

  socket.on("logging_out", async ({ roomNo, name }) => {
    const response = await firestoreClient.getData(roomNo);
    const Data = response.data();
    if (Data) {
      let newUsers = Data.users.filter((_name) => !(_name === name));
      Data.users = newUsers;
      await firestoreClient.save(roomNo, Data);
      socket.shopping_list_room_no = undefined;
      socket.shopping_list_user_name = undefined;
      socket.to(roomNo).emit("new_users_list", Data.users);
    }
  });

  // socket.disconnect()
  socket.on("disconnecting", async (reason) => {
    console.log("Reason:", reason);
    console.log("Name:", socket.shopping_list_user_name);
    console.log("Room:", socket.shopping_list_room_no);

    if (socket.shopping_list_user_name !== undefined) {
      const response = await firestoreClient.getData(
        socket.shopping_list_room_no
      );
      const Data = response.data();
      if (Data) {
        let newUsers = Data.users.filter(
          (_name) => !(_name === socket.shopping_list_user_name)
        );
        Data.users = newUsers;
        await firestoreClient.save(socket.shopping_list_room_no, Data);
        socket
          .to(socket.shopping_list_room_no)
          .emit("new_users_list", Data.users);
      }
    }
  });
});

server.listen(PORT, () => console.log(`Server is running over port ${PORT}`));

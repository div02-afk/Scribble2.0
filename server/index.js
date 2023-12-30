const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "scribble2-0-hicmuk9ht-divyam-s-projects.vercel.app",
    methods: ["GET", "POST"],
  },
});
const rooms = {};
const canvas = {};

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
  socket.on("createRoom", (data) => {
    console.log("creating Room", data);
    rooms[data.room] = data;
    canvas[data.room] = { imageData: "", time: 0 };
  });
  socket.on("joinRoom", (data) => {
    console.log("joining Room", data);
    const room = data.room;
    socket.join(room);
    console.log(room, "joined");
    console.log(socket.rooms);
    if (!data["justJoin"]) {
      try {
        rooms[data.room].playerList.push(data.playerName);
        const players = {
          playerList: rooms[data.room].playerList,
          room: data.room,
        };
        console.log(rooms);
        io.to(room).emit("players", players);
      } catch (err) {
        console.log(err);
      }
    }
  });
  socket.on("startGame", (data) => {
    console.log("starting Game", data);
    rooms[data].started = true;
    io.to(data).emit("gameStarted", true);
    io.to(data.room).emit("chance", rooms[data].chance);
  });
  socket.on("joinChannel", (data) => {
    console.log("joining channel", data);
    socket.join(data);
  });
  socket.on("draw", (data) => {
    try {
      console.log("drawing");
      canvas[data.room].imageData = data.imageData;
      canvas[data.room].time = data.time;
      io.to(data.room).emit("print", data);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("getChance", (data) => {
    console.log("getting chance", data);
    io.to(data.room).emit("chance", rooms[data].chance);
  });
  socket.on("nextPlayer", (data) => {
    console.log("next player", data);
    try {
      rooms[data].chance =
        (rooms[data].chance + 1) % rooms[data].playerList.length;
      io.to(data).emit("chance", rooms[data].chance);
    } catch (err) {
      console.log(err);
    }
  });
});



server.listen(process.env.port || 3000, () => {
  console.log("listening on port", process.env.port || 3000);
});

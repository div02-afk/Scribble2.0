const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { type } = require("os");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const rooms = {};
const canvas = {};
function removeFromArray(array, element) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

const fetchWords = async () => {
  const url = "https://random-words5.p.rapidapi.com/getMultipleRandom?count=50";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "15b80fdf3emsh5acd32eeb76f5e6p1a0c6ajsn3f1562d9701a",
      "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    },
  };
  let result;
  try {
    const response = await fetch(url, options);
    result = await response.text();
    result = JSON.parse(result);
    // console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
  socket.on("createRoom", async (data) => {
    console.log("creating Room", data);
    rooms[data.room] = data;
    rooms[data.room].words = await fetchWords();
    canvas[data.room] = { imageData: "", time: 0 };
    // console.log(rooms);
  });
  socket.on("joinRoom", (data) => {
    console.log("joining Room", data);
    const room = data.room;
    socket.join(room);
    // console.log(room, "joined");
    // console.log(socket.rooms);
    if(Object.keys(rooms).includes(room) && !rooms[room].started){
      socket.emit("cannotJoin", true);
    }
    if (!data["justJoin"]) {
      try {
        rooms[data.room].playerList.push(data.playerName);
        const players = {
          playerList: rooms[data.room].playerList,
          room: data.room,
        };
        // console.log(rooms);
        io.to(room).emit("players", players);
      } catch (err) {
        console.log(err);
      }
    }
  });
  socket.on("closeRoom", (data) => {
    console.log("closing Room", data.room);
    delete rooms[data.room];
    delete canvas[data.room];
  });
  socket.on("startGame", (data) => {
    // console.log("starting Game", data);
    rooms[data].started = true;
    const wordsToSend = rooms[data].words.splice(0,4);
    io.to(data).emit("gameStarted", true);
    const wordsAndChance = {
      words: wordsToSend,
      chance: rooms[data].chance,
    };
    console.log("type: ",typeof wordsToSend);
    io.to(data).emit("chance", wordsAndChance);
  });
  socket.on("word", (data) => {
    rooms[data.room].word = data.word;
    removeFromArray(rooms[data.room].words, data.word);
    io.to(data.room).emit("selectedWord", data);
  });
  socket.on("joinChannel", (data) => {
    // console.log("joining channel", data);
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
    // console.log("getting chance", data);
    const wordsToSend = rooms[data].words.splice(0,4);
        const wordsAndChance = {
          words: wordsToSend,
          chance: rooms[data].chance,
        };
        console.log("type: ",typeof wordsToSend);
        io.to(data.room).emit("chance", wordsAndChance);
  });
  socket.on("nextPlayer", (data) => {
    // console.log("next player", data);
    try {
      rooms[data].chance =
        (rooms[data].chance + 1) % rooms[data].playerList.length;
        const wordsToSend = rooms[data].words.splice(0,4);
        const wordsAndChance = {
          words: wordsToSend,
          chance: rooms[data].chance,
        };
        console.log("type: ",typeof wordsToSend);
        io.to(data).emit("chance", wordsAndChance);
        }
    catch (err) {
      console.log(err);
    }
  });
});

server.listen(process.env.port || 3000, () => {
  console.log("listening on port", process.env.port || 3000);
});

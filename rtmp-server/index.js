const express = require("express");
const app = express();
const { default: axios } = require("axios");
const NodeMediaServer = require("node-media-server");
const cors = require("cors");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { job, streamViewersJob } = require("./cron/thumbnails");
const { generateStreamThumbnails } = require("./streamThumbnail");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.static(__dirname + "/thumbnails"));

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "./media",
    api: true,
    allow_origin: "*",
  },
  trans: {
    ffmpeg: "C:/projects/hate/rtmp-server/ffmpeg/ffmpeg.exe",
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
      },
    ],
  },
};

const nms = new NodeMediaServer(config);

nms.on("prePublish", async (id, streamPath, args) => {
  const parts = streamPath.split("/");
  const streamKey = parts[parts.length - 1];
  const response = await axios.get(
    `http://localhost:3000/api/user/check/${streamKey}`
  );
  if (!response.data) {
    const session = nms.getSession(id);
    session.reject();
  }
});

nms.on("postPublish", async (id, streamPath, args) => {
  const parts = streamPath.split("/");
  const streamKey = parts[parts.length - 1];
  io.of("/").adapter.rooms.set(streamKey, new Set());
  const { data } = await axios.get(
    `http://localhost:3000/api/user/${streamKey}`
  );
  const stream = await axios.post("http://localhost:3000/api/stream/create", {
    streamId: id,
    streamKey,
    username: data.username,
  });
  console.log(io.of("/").adapter.rooms);
  generateStreamThumbnails(streamKey);
  io.emit("new-stream", {
    stream: stream.data,
  });
});

nms.on("doneConnect", async (id, args) => {
  console.log(
    "[NodeEvent on doneConnect]",
    `id=${id} args=${JSON.stringify(args)}`
  );
  const { data } = await axios.delete(`http://localhost:3000/api/stream/${id}`);
  io.emit("delete-stream", {
    streams: data,
  });
});

io.on("connection", (socket) => {
  socket.on("join-stream", ({ id }) => {
    socket.join(id);
    console.log(io.of("/").adapter.rooms.get(id).size);
    const viewers = io.of("/").adapter.rooms.get(id).size;
    io.to(socket.id).emit("joined-stream", {
      msg: "Welcome to chat",
    });
    io.to(id).emit("joined-stream", {
      viewers,
    });
  });

  // socket.on('leave-straem', ({ id }) => {
  //   socket.leave(id)
  //   const viewers = io.of('/').adapter.rooms.get(id).size
  //   io.to(id).emit('leaved-stream', {
  //     viewers
  //   })
  // })

  socket.on("message", ({ id, message, username }) => {
    io.to(id).emit("on-message", {
      msg: message,
      username,
    });
  });
});

server.listen(8080, () => {
  console.log(`Server has been started on port: 8080`);
});

nms.run();
job.start();

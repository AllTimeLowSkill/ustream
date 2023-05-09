import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";

import { useEffect } from "react";
import { socket } from "./context/WebSocketContext";
import { useDispatch, useSelector } from "react-redux";
import { addNewStream, deleteStream } from "./store/slices/streamsSlice";
import { setUser } from "./store/slices/userSlice";
import Profile from "./pages/profile";
import Category from "./pages/category";
import Stream from "./pages/stream";
import Page from "./pages/page";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispath = useDispatch();

  useEffect(() => {
    const local = localStorage.getItem("user");
    if (local) {
      dispath(setUser(JSON.parse(local)));
    }
  }, []);

  useEffect(() => {
    socket.on("new-stream", ({ stream }) => {
      dispath(addNewStream(stream));
      if (user.streamKey === stream.streamId) {
        console.log(user);
        socket.emit("add-owner", {
          id: stream.streamId,
        });
      }
    });

    socket.on("delete-stream", ({ streams }) => {
      dispath(deleteStream(streams));
    });

    return () => {
      socket.off("new-stream");
      socket.off("delete-stream");
    };
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/stream/:id" element={<Stream />} />
      <Route path="/page/:id" element={<Page />} />
    </Routes>
  );
}

export default App;

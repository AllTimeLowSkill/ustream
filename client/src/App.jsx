import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";

import { useEffect } from "react";
import { socket } from "./context/WebSocketContext";
import { useDispatch } from "react-redux";
import { addNewStream, deleteStream } from "./store/slices/streamsSlice";
import { setUser } from "./store/slices/userSlice";
import Profile from "./pages/profile";
import Category from "./pages/category";
import Stream from "./pages/stream";

function App() {
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
    });

    socket.on("delete-stream", ({ streams }) => {
      dispath(deleteStream(streams));
    });

    return () => {
      socket.off("new-stream");
      socket.off("delete-stream");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/stream/:id" element={<Stream />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Page from "./pages/Page";
import Profile from "./pages/Profile";
import StreamPage from "./pages/Stream";
import Studio from "./pages/Studio";
import { useEffect } from "react";
import { socket } from "./context/WebSocketContext";
import { useDispatch } from "react-redux";
import { addNewStream, deleteStream } from "./store/slices/streamsSlice"
import { getCategories, setCategories } from "./store/slices/categorySlice";
import { setUser } from "./store/slices/userSlice";
import Category from "./pages/Category";

function App() {
  const dispath = useDispatch()

  useEffect(() => {
    const local = localStorage.getItem('user')
    if(local) {
      dispath(setUser(JSON.parse(local)))
    }

    const storageCategories = localStorage.getItem('categories')
    if(!storageCategories) {
      dispath(getCategories())
    } else {
      dispath(setCategories(JSON.parse(storageCategories)))
    }

  }, [])

  useEffect(() => {
    socket.on('new-stream', ({ stream }) => {
      dispath(addNewStream(stream))
  })

  socket.on('delete-stream', ({ streams }) => {
      dispath(deleteStream(streams))
  })

  return () => {
      socket.off('new-stream')
      socket.off('delete-stream')
  }
  }, [])

  return (
    <Routes>
      <Route path="/" element={ <Main /> } />
      <Route path="/page/:id" element={ <Page /> } />
      <Route path="/profile/:id" element={ <Profile /> } />
      <Route path="/stream/:id" element={ <StreamPage /> } />
      <Route path="/studio/:id" element={ <Studio /> } />
      <Route path="/category/:id" element={ <Category /> } />
    </Routes>
  );
}

export default App;

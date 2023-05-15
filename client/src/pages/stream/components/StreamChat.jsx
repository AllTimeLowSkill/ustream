import { useEffect, useContext, useState } from "react";
import { WebSocketContext } from "../../../context/WebSocketContext";
import InputControl from "../../../components/input";
import Button from "../../../components/button";
import { useSelector } from "react-redux";

const StreamChat = ({ id }) => {
  const { user } = useSelector((state) => state.user);
  const socket = useContext(WebSocketContext);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.emit("join-stream", { id });
    socket.on("on-message", ({ msg, username }) => {
      setChat((prev) => [...prev, { msg, username }]);
    });

    return () => {
      socket.off("on-message");
    };
  }, []);

  const handleSendMessage = () => {
    socket.emit("message", {
      id,
      message,
      username: user.username,
    });
  };

  return (
    <section className="flex flex-col justify-between h-[720px] px-[18px] rounded-[10px] bg-[#240046]">
      <span className="text-base text-white font-semibold inline-block w-full text-center py-[18px] border-b-2 border-solid border-[#E0AAFFB2]">
        STREAM CHAT
      </span>
      <main className="overflow-y-auto h-full max-h-[560px]">
        {chat.map((msg, idx) => (
          <div key={idx} className="break-all">
            <span className="font-semibold text-purple-600">
              {msg.username}:{" "}
            </span>
            <span className="text-white">{msg.msg}</span>
          </div>
        ))}
      </main>
      <footer>
        <InputControl placeholder="Message" onChange={setMessage} />
        <Button
          accent={true}
          title="Send message"
          sx={{ margin: "my-[12px]" }}
          onClick={() => handleSendMessage()}
        />
      </footer>
    </section>
  );
};

export default StreamChat;

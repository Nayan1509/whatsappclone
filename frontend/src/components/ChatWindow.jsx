import { useEffect, useState } from "react";
import { fetchMessagesByUser } from "../services/api";
import { useChat } from "../contexts/ChatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { FaVideo, FaPhone } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";
import bgImage from "../assets/chatbg.jpg"; 

const ChatWindow = () => {
  const { selectedUser } = useChat();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedUser)
      fetchMessagesByUser(selectedUser.wa_id).then(({ data }) =>
        setMessages(data)
      );
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a chat to see messages.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="p-4 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiUserCircle className="text-3xl text-gray-500" />
          <div>
            <h2 className="font-semibold text-sm md:text-base">
              {selectedUser.name}
            </h2>
            <p className="text-xs text-gray-500">{selectedUser.wa_id}</p>
          </div>
        </div>

        <div className="flex gap-4 text-gray-600">
          <FaVideo
            className="text-xl cursor-pointer hover:text-green-600"
            title="Video Call"
          />
          <FaPhone
            className="text-xl cursor-pointer hover:text-green-600"
            title="Voice Call"
          />
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "repeat",
        }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg} />
        ))}
      </div>

      {/* Input */}
      <MessageInput onSend={(msg) => setMessages([...messages, msg])} />
    </div>
  );
};

export default ChatWindow;

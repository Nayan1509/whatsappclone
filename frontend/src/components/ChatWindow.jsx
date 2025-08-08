import { useEffect, useState } from "react";
import { fetchMessagesByUser } from "../services/api";
import { useChat } from "../contexts/ChatContext";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

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
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 border-b bg-gray-100">
        <h2 className="font-semibold">{selectedUser.name}</h2>
        <p className="text-sm text-gray-500">{selectedUser.wa_id}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg} />
        ))}
      </div>

      <MessageInput onSend={(msg) => setMessages([...messages, msg])} />
    </div>
  );
};

export default ChatWindow;

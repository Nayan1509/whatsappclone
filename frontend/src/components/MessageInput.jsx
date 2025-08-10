import { useState } from "react";
import { sendMessage } from "../services/api";
import { useChat } from "../contexts/ChatContext";
import { LuSendHorizontal } from "react-icons/lu";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const { selectedUser } = useChat();

  const handleSend = async () => {
    if (!text.trim()) return;

    const payload = {
      text,
      wa_id: selectedUser.wa_id,
      direction: "outbound",
    };

    const { data } = await sendMessage(payload);
    onSend(data);
    setText("");
  };

  return (
    <div className="flex p-3 bg-white">
      <input
        type="text"
        className="flex-1 rounded px-3 py-2 mr-2 text-sm"
        value={text}
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="bg-transparent cursor-pointer px-4 py-2 rounded text-md"
        onClick={handleSend}
      >
        <LuSendHorizontal />
      </button>
    </div>
  );
};

export default MessageInput;

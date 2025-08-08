import { useEffect, useState } from "react";
import { fetchConversations } from "../services/api";
import { useChat } from "../contexts/ChatContext";

const Sidebar = () => {
  const [conversations, setConversations] = useState([]);
  const { setSelectedUser } = useChat();

  useEffect(() => {
    fetchConversations()
      .then(({ data }) => {
        console.log("Fetched conversations:", data);
        setConversations(data);
      })
      .catch((err) => {
        console.error("Error fetching conversations:", err);
      });
  }, []);

  return (
    <div className="w-1/3 border-r overflow-y-auto bg-white">
      {conversations.map((user) => (
        <div
          key={user.wa_id}
          className="p-4 cursor-pointer hover:bg-gray-100"
          onClick={() => setSelectedUser(user)}
        >
          <h2 className="font-semibold">{user.name || "Unnamed User"}</h2>
          <p className="text-sm text-gray-500">{user.wa_id}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

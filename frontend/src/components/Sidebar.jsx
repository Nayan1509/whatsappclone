import { useEffect, useState } from "react";
import { fetchConversations } from "../services/api";
import { useChat } from "../contexts/ChatContext";
import { FiSearch } from "react-icons/fi";
import clsx from "clsx";

const Sidebar = ({ onSelectChat }) => {
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedUser, setSelectedUser } = useChat();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchConversations()
      .then(({ data }) => {
        setConversations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching conversations:", err);
        setLoading(false);
      });
  }, []);

  const filtered = conversations.filter((c) =>
    (c.name || c.wa_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (user) => {
    setSelectedUser(user);
    if (onSelectChat) onSelectChat(user);
  };

  return (
    <div className="shadow-md w-full md:w-auto bg-white flex flex-col">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Chats</h1>
      </div>

      {/* Search */}
      <div className="px-3 py-2 flex items-center">
        <div className="flex items-center w-full bg-white rounded-lg px-3 py-1 shadow-sm">
          <FiSearch className="text-gray-500 mr-2 text-base" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full outline-none bg-transparent text-sm text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between mb-3 animate-pulse"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <div className="h-3 bg-gray-300 rounded w-24" />
                    <div className="h-2 bg-gray-200 rounded w-32" />
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded w-10" />
              </div>
            ))
          : filtered.map((user) => (
              <div
                key={user.wa_id}
                onClick={() => handleClick(user)}
                className={clsx(
                  "flex items-center rounded-lg justify-between mb-2 px-4 py-3 cursor-pointer transition-all",
                  selectedUser?.wa_id === user.wa_id
                    ? "bg-[#e9edef]"
                    : "hover:bg-gray-100"
                )}
              >
                {/* Left: Avatar + Name + Preview */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.[0] || user.wa_id?.[0]}
                  </div>

                  <div className="flex flex-col">
                    <h2 className="font-semibold text-sm text-gray-900">
                      {user.name || user.wa_id}
                    </h2>
                    <p className="text-xs text-gray-600 truncate w-20 sm:w-40">
                      ~ {user.lastMessage || "No messages yet"}
                    </p>
                  </div>
                </div>

                {/* Right: Timestamp */}
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  {user.lastTime
                    ? new Date(user.lastTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;

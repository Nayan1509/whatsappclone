import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);
  const [activeTab, setActiveTab] = useState("chats"); // "chats" or "calls"

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        selectedCall,
        setSelectedCall,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

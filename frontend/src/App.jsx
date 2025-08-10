import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MainSidebar from "./components/MainSidebar";
import CallsWindow from "./components/CallsWindow";
import CallsSidebar from "./components/CallsSidebar";
import { useChat } from "./contexts/ChatContext";
import { useEffect, useState } from "react";

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const { selectedCall } = useChat();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 h-screen">
        <MainSidebar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Mobile: show either Sidebar or ChatWindow */}
                {isMobile ? (
                  selectedChat ? (
                    <ChatWindow
                      chat={selectedChat}
                      onBack={() => setSelectedChat(null)}
                    />
                  ) : (
                    <Sidebar onSelectChat={setSelectedChat} />
                  )
                ) : (
                  <>
                    <Sidebar onSelectChat={setSelectedChat} />
                    <ChatWindow chat={selectedChat} />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/calls"
            element={
              <>
                {/* Mobile: show either CallsSidebar or CallsWindow */}
                {isMobile ? (
                  selectedCall ? (
                    <CallsWindow />
                  ) : (
                    <CallsSidebar />
                  )
                ) : (
                  <>
                    <CallsSidebar />
                    <CallsWindow />
                  </>
                )}
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

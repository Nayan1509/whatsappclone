import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import MainSidebar from "./components/MainSidebar";
import CallsWindow from "./components/CallsWindow";
import CallsSidebar from "./components/CallsSidebar"

const App = () => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <MainSidebar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <ChatWindow />
              </>
            }
          />
          <Route
            path="/calls"
            element={
              <>
                <CallsSidebar/>
                <CallsWindow />
              </>
            }
          />
        </Routes>
        {/* <Sidebar />
        <ChatWindow /> */}
      </div>
    </div>
  );
};

export default App;

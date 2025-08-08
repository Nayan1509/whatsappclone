import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

const App = () => (
  <div className="h-screen flex bg-white">
    <Sidebar />
    <ChatWindow />
  </div>
);

export default App;

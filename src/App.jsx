import { useState } from "react";
import Body from "./components/Body";
import Header from "./components/Header";

const App = () => {
  const [chatVisible, setChatVisible] = useState(false);

  // Toggle visibility of the chat box
  const toggleChatVisibility = () => {
    setChatVisible(!chatVisible);
  };

  return (
    <div
       style={{
        backgroundSize: "200% 200%",
        animation: "gradient-flow 6s ease infinite",
      }}
    >
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <h1
          className="text-[10rem] font-black 
    bg-gradient-to-r from-blue-500 via-purple-600 via-pink-500 to-blue-500 
    bg-[length:400%_400%] bg-clip-text text-transparent 
    animate-gradient-slow
    hover:scale-110 transition-transform duration-500"
        >
          CHAT-BOT
        </h1>
      </div>

      <button
        onClick={toggleChatVisibility}
        className="fixed right-5 bottom-5 bg-blue-300 rounded-3xl h-[40px] w-[40px] flex cursor-pointer items-center justify-center"
      >
        <span className="material-symbols-outlined">chat_bubble</span>
      </button>

      <div
        className={`bg-white border-solid border-2 border-blue-800 rounded-lg shadow-2xl drop-shadow-2xl overflow-hidden fixed right-[35px] bottom-[90px] transition-all duration-500 text-[#1E3A8A] ${
          chatVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Header />
        <Body />
      </div>
    </div>
  );
};

export default App;

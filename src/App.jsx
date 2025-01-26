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
    
    className="border-solid flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 animate-gradient"
  style={{
    backgroundSize: "200% 200%",
    animation: "gradient-flow 6s ease infinite",
  }}
    
    >
      {/* Chat Button */}
      <button
        onClick={toggleChatVisibility}
        className="fixed right-5 bottom-5 bg-blue-300 rounded-3xl h-[40px] w-[40px] flex cursor-pointer items-center justify-center"
      >
        <span className="material-symbols-outlined">chat_bubble</span>
      </button>

      {/* Chat Box */}
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

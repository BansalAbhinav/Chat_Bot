import { useEffect, useRef, useState } from "react";
import ChatBotIcon from "./ChatBotIcon";
import Footer from "./footer";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "./companyInfo";

const Body = () => 
  {
  const [chatHistory, setChatHistory] = useState([{
    hideInChat:true,
    role:"model",
    text:companyInfo
  },]);
  const chatBodyRef =useRef();
 const generateActualBotResponse =async (history)=>{
  const updateHistory = (text,isError = false)=>{
    setChatHistory(prev=>[...prev.filter(msg=>msg.text !=="Thinking...") ,{role:"model", text ,isError}])
  };  
//format the chat api 
  history = history.map(({role,text })=>({
    role,parts:[{text}]}));

  const requestHistory ={
    method:'POST',
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({contents:history})
  }
  //Making API Call to API Response 
try{
  
  const response  = await fetch(import.meta.env.VITE_API_URL,requestHistory);
  const data = await response.json();
  if(!response.ok) throw new Error(data.error.messsage || "Something Went Wrong !") 
const apiResponseText =data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1") ;

  console.log(apiResponseText);
  updateHistory(apiResponseText)

  }
catch(error){
  // console.log(error.messsage);
  console.error("Error fetching API:", error.message);
  updateHistory(error.message,true)
  
}
};
  useEffect(()=>{
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight,behavior:"smooth"})
  },[chatHistory])
  return (
    <div id="chatBody" className="bg-[#F0F9FF] border-0 shadow-lg drop-shadow-2xl h-[500px] w-[500px] flex flex-col ">
  {/* Chat Messages Section */}
  <div   className="scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300   flex-1 overflow-y-auto px-6 py-4 " aria-live="polite" ref={chatBodyRef}>
    <div className="flex gap-3 mb-4 items-center " >
      <ChatBotIcon />
      <p className="bg-[#2563EB] rounded-lg max-w-[70%] p-3 text-[#000000] ">
        Hey there!👋 <br /> How can I help you?
      </p>
    </div>

    <div className="space-y-4">
      {chatHistory.map((chat, index) => (
        <ChatMessage key={index} chat={chat} />
      ))}
    </div>
  </div>

  {/* Footer */}
  <Footer
    chatHistory={chatHistory}
    setchatHistory={setChatHistory}
    generateActualBotResponse={generateActualBotResponse}
  />
</div>

  );
};

export default Body;

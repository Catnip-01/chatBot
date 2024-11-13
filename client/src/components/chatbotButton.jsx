import React from "react";
import { useNavigate } from "react-router-dom";

const ChatbotButton = () => {
  const navigate = useNavigate();
  const chatbotRedirect = () => {
    const token = localStorage.getItem("token");
    console.log("token in button : " + token);
    navigate("/chatbot", { replace: true });
  };

  return (
    <div>
      <button
        className=" px-10 py-5  text-white rounded-xl hover:rounded-full mr-2 bg-gptGray-300 hover:bg-white hover:text-gptGray-900 transition duration-300"
        onClick={chatbotRedirect}
      >
        Talk to Grit-AI
      </button>
    </div>
  );
};

export default ChatbotButton;

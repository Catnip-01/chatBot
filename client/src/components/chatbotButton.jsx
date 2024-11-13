import React from "react";
import { useNavigate } from "react-router-dom";

const ChatbotButton = () => {
  const navigate = useNavigate();
  const chatbotRedirect = () => {
    navigate("/chatbot");
  };

  return (
    <div>
      <button
        className=" px-10 py-5  text-white rounded-xl hover:rounded-full mr-2 bg-gptGray-300 hover:bg-white hover:text-gptGray-900 transition duration-300"
        onClick={chatbotRedirect}
      >
        proceed to chatbot
      </button>
    </div>
  );
};

export default ChatbotButton;

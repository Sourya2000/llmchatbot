import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newChat = [...chatHistory, { sender: "user", text: userInput }];
    setChatHistory(newChat);

    try {
      const response = await axios.post("http://localhost:8000/chat/", {
        message: userInput,
      });

      setChatHistory([...newChat, { sender: "bot", text: response.data.response }]);
    } catch (error) {
      setChatHistory([...newChat, { sender: "bot", text: "Error: Unable to reach the server." }]);
    }

    setUserInput("");
  };

  return (
    <div className="App">
      <h2>Chatbot</h2>
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            <strong>{chat.sender === "user" ? "You" : "Bot"}:</strong> {chat.text}
          </div>
        ))}
      </div>
      <div className="input-section">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;


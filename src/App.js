import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import Notification from "./components/Notification";

const initialMessages = {
  1: [
    {
      id: 1,
      text: "Hello",
      time: new Date().toLocaleTimeString(),
      sender: {
        name: "User",
        avatar: "https://via.placeholder.com/50",
      },
    },
    {
      id: 2,
      text: "How are you?",
      time: new Date().toLocaleTimeString(),
      sender: {
        name: "User",
        avatar: "https://via.placeholder.com/50",
      },
    },
  ],
  2: [
    {
      id: 1,
      text: "Hey there",
      time: new Date().toLocaleTimeString(),
      sender: {
        name: "User",
        avatar: "https://via.placeholder.com/50",
      },
    },
  ],
};

const App = () => {
  // State to store the active chat ID
  const [activeChatId, setActiveChatId] = useState(null);

  // State to store the messages for each chat
  const [messages, setMessages] = useState(initialMessages);

  // Function to handle sending a message
  const handleSendMessage = (inputValue) => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: new Date().getTime(),
        text: inputValue,
        time: new Date().toLocaleTimeString(),
        sender: {
          name: "User",
          avatar: "https://via.placeholder.com/50",
        },
      };
      setMessages((prevMessages) => {
        return {
          ...prevMessages,
          [activeChatId]: [...(prevMessages[activeChatId] || []), newMessage],
        };
      });
    }
  };

  // Dummy data for the chat list and messages
  const chats = [
    {
      id: 1,
      name: "Chat 1",
      avatar: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Chat 2",
      avatar: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onChatClick={setActiveChatId}
        />
        {activeChatId ? (
          <ChatWindow
            chat={chats[activeChatId - 1]} // starts from 0, so activeChatId - 1
            messages={messages[activeChatId] || []}
            onSend={handleSendMessage}
          />
        ) : (
          <Notification text="Select a chat to start messaging" />
        )}
      </div>
    </div>
  );
};

export default App;

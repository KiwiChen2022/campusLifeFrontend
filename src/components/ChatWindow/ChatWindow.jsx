import React, { useState, useEffect } from 'react';
import Message from './Message';
import InputBox from './InputBox';
import WebSocketClient from '../../utils/websocketClient';
import { list, addMessage } from '../../api/message';

const socket = new WebSocketClient('ws://127.0.0.1:8004/ws');


const ChatWindow = ({uid}) => {

  const query = {to:uid,pageNum:1,pageSize:10};
  const [messages, setMessages] = useState([]);
  
  const getAndSetMessages = async (query) => {
    try {
      const res = await list(query);
      setMessages(res.data.list);
    } catch (error) {
      console.log(error);
    }
  }
  

  const setupWebsocket = (query) => {
    // set up websocket
    const messageHandler = (event) => {
      const data = JSON.parse(event.data);
      if (data.type == 3){

      }
      else{
        getAndSetMessages(query);
      }
    };

    socket.addEventListener('message', messageHandler);

    const e = {uid:localStorage.getItem("im-userid"),type:1};

    const onOpen = () => {
      console.log('websocket connection established');
      socket.send(JSON.stringify(e));
    };

    if (socket.socket.readyState === WebSocket.OPEN) {   //socket is a wrapper of websocket
      // websocket is already open, send the message
      console.log('websocket connection already open');
      socket.send(JSON.stringify(e));
    } else {
      // wait for websocket to open, then send the message
      socket.addEventListener('open', onOpen);
    }

    return () => {
      socket.removeEventListener('message', messageHandler);
      socket.removeEventListener('open', onOpen);
    };
  };



  const handleSend = (newMessage) => {
    addMessage({to:uid,content:newMessage}).then(()=>{
      getAndSetMessages(query);
    }).then(()=>{
      socket.send(JSON.stringify({from:localStorage.getItem("im-userid"),to:uid,message:newMessage,type:2}))
    })
  };

  useEffect(()=>{
    setupWebsocket(query);
    getAndSetMessages(query);
    // return () => {
    //   socket.close();
    // };
  },[uid])

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;

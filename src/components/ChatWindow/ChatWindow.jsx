import React, { useState, useEffect } from 'react';
import Message from './Message';
import InputBox from './InputBox';
import WebSocketClient from '../../utils/websocketClient';
import { list, addMessage } from '../../api/message';



const ChatWindow = ({uid}) => {
  const query = {to:uid,pageNum:1,pageSize:10};
  
  // const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const handleInputChange = (event) => {
  //   setNewMessage(event.target.value);
  // };

  const socket = new WebSocketClient('ws://127.0.0.1:8004/ws');

  const handleSend = (newMessage) => {
    addMessage({to:uid,content:newMessage}).then(res=>{
    getlist();
  }).then(()=>{
    console.log("yes1")
    socket.send(JSON.stringify({from:localStorage.getItem("im-userid"),to:{uid},message:newMessage,type:2}))
    console.log("yes2")

  })
  setNewMessage('');
  };

  const getlist = ()=>{
    list(query).then(res=>{
      let data =  res.data;
      setMessages(data.list);
  })}

  const setupWebsocket = ()=>{
    // set up websocket
    const messageHandler = (event) => {
      const data = JSON.parse(event.data);
      if (data.type == 3){

      }
      else{
        getlist();
      }
    };
    socket.addEventListener('message', messageHandler);
    const e = {uid:localStorage.getItem("im-userid"),type:1};
    setTimeout(()=>{
                console.log(JSON.stringify(e));
                console.log(typeof(e));
                  socket.send(JSON.stringify(e))
              },1000);
    // if (socket.readyState === 0){
    //         setTimeout(()=>{
    //           console.log(JSON.stringify(e));
    //           console.log(typeof(e));
    //             socket.send(JSON.stringify(e))
    //         },1000);
    //     }else {
    //         socket.send(JSON.stringify(e))
    //     }

    return () => {
      socket.removeEventListener('message', messageHandler);
    };

  }

  useEffect(()=>{
    getlist();
    // scrollbarRef.value!.setScrollTop(2200)
    setupWebsocket();
  },[uid])
  return (
    <div className="chat-window">
      {/* <h2>{props.chat.name}</h2> */}
      <div className="messages">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <InputBox
        // value={newMessage}
        // onChange={handleInputChange}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatWindow;

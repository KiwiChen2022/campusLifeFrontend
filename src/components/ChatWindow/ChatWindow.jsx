import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InputBox } from './InputBox';
import { Message } from './Message';
import WebSocketClient from '../../utils/websocketClient';
import { list, addMessage } from '../../api/message';
import styles from './ChatWindow.module.css';



const ChatWindow = ({uid}) => {
  const socket = useRef(null);
  const query = {to:uid,pageNum:1,pageSize:10};
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const messagesEndRef = useRef(null);
  
  const getAndSetMessages = async (query, append = false) => {
    try {
      setLoading(true);
      const res = await list(query);
      setLoading(false);
      if (res.data.list.length < query.pageSize) {
        setHasMore(false);
      }

      if (append) {
        setMessages((prevMessages) => [...res.data.list, ...prevMessages]);
      } else {
        setMessages(res.data.list);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleScroll = useCallback(
    (event) => {
      const { scrollTop, clientHeight, scrollHeight } = event.target;

      if (scrollTop === 0 && !loading && hasMore) {
        query.pageNum += 1;
        getAndSetMessages(query, true);
      }
    },
    [loading, hasMore, query]
  );
  

  const setupWebsocket = (query) => {
    // set up websocket
    if (!socket.current) {
      socket.current = new WebSocketClient('ws://127.0.0.1:8004/ws');
    }
    const messageHandler = (event) => {
      const data = JSON.parse(event.data);
      if (data.type == 3){

      }
      else{
        getAndSetMessages(query);
      }
    };

    socket.current.addEventListener('message', messageHandler);

    const e = {uid:localStorage.getItem("im-userid"),type:1};

    const onOpen = () => {
      console.log('websocket connection established');
      socket.current.send(JSON.stringify(e));
    };

    if (socket.current.socket.readyState === WebSocket.OPEN) {   //socket.current is a wrapper of websocket
      // websocket is already open, send the message
      console.log('websocket connection already open');
      socket.current.send(JSON.stringify(e));
    } else {
      // wait for websocket to open, then send the message
      socket.current.addEventListener('open', onOpen);
    }

    return () => {
      socket.current.removeEventListener('message', messageHandler);
      socket.current.removeEventListener('open', onOpen);
      if (socket.current) {
        socket.current.close();
      }
    };
  };



  // const handleSend = (newMessage) => {
  //   addMessage({to:uid,content:newMessage}).then(()=>{
  //     getAndSetMessages(query);
  //   }).then(()=>{
  //     socket.send(JSON.stringify({from:localStorage.getItem("im-userid"),to:uid,message:newMessage,type:2}))
  //   })
  // };

  const handleSend = (newMessage) => {
    addMessage({to: uid, content: newMessage})
      .then(() => {
        // Create a temporary message object
        const tempMessage = {
          time: Date.now(), 
          from: localStorage.getItem("im-userid"),
          to: uid,
          content: newMessage,
        };
  
        // Update messages list with the new message
        setMessages((prevMessages) => [...prevMessages, tempMessage]);
  
        // Send message via websocket
        socket.current.send(JSON.stringify({from: localStorage.getItem("im-userid"), to: uid, message: newMessage, type: 2}));
      });
  };
  
  useEffect(()=>{
    setupWebsocket(query);
  },[])

  useEffect(()=>{
    getAndSetMessages(query);
  },[uid])

  useEffect(() => {
    const scrollContainer = messagesEndRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  return (
    <div className={styles.chatWindow}>
      <div
        className={styles.messages}
        ref={messagesEndRef}
        onScroll={handleScroll}
      >
        {loading && <div>Loading more messages...</div>}
        {messages.map((message) => (
          <Message key={message.id} message={message} uid={uid} />
        ))}
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { InputBox } from './InputBox';
import { Message } from './Message';
import WebSocketClient from '../../utils/websocketClient';
import { list, addMessage, addFile } from '../../api/message';
import styles from './ChatWindow.module.css';



const ChatWindow = ({uid}) => {
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const baseUrl = "http://127.0.0.1:8081/ipfs/";
  const query = useMemo(() => ({ to: uid, pageNum: 1, pageSize: 100 }), [uid]);
  
  const getAndSetMessages = async (query) => {
    try {
      setLoading(true);
      const res = await list(query);
      setLoading(false);
      setMessages(res.data.list);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setupWebsocket = (query) => {
    // set up websocket
    if (!socket.current) {
      socket.current = new WebSocketClient('ws://127.0.0.1:8004/ws');
    }
    const messageHandler = (event) => {
      console.log('Received message from server:', event.data);
      getAndSetMessages(query);
    };
  
    socket.current.addEventListener('message', messageHandler);
  
    const e = { uid: localStorage.getItem("im-userid"), type: 1 };
  
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
      // No need to close the websocket here, as it will be reused for the next user
    };
  };
  
  // Call setupWebsocket() in a useEffect hook that depends on uid
  useEffect(() => {
    const cleanup = setupWebsocket(query);
    return () => {
      cleanup();
    };
  }, [uid]);
  


  const handleSend = (data) => {
    if (data.type === 1) {
      const newMessage = data.content;
      addMessage({ to: uid, content: newMessage }).then((res) => {
        socket.current.send(
          JSON.stringify({
            from: localStorage.getItem('im-userid'),
            to: uid,
            message: newMessage,
            type: 2,
          })
        );
        
        getAndSetMessages(query)

      });
    } else  {
      const file = data.content;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('to', uid);
      console.log(data.type)
      console.log(typeof(data.type))
      
      addFile({ to: uid, file: file, type: data.type }).then((res) => {
        console.log("File upload successful:", res);
        socket.current.send(
          JSON.stringify({
            from: localStorage.getItem('im-userid'),
            to: uid,
            message: file,
            type: 2,
          })
        );
        getAndSetMessages(query)
      }).catch((error) => {
        console.error("File upload failed:", error);
      });
    }
  };
  
  const shouldShowMiddleTimestamp = (currentMessage, previousMessage) => {
    const threshold = 600000; // 10 minutes in milliseconds
    const currentTime = new Date(currentMessage.time);
    const previousTime = new Date(previousMessage.time);
  
    return currentTime - previousTime > threshold;
  };
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
    return formattedDate;
  };


  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const handleImageLoad = () => {
    scrollToBottom();
  };
  
  // useEffect(() => {
  //   setupWebsocket(query);
  // }, [uid]);
  
  useEffect(() => {
    getAndSetMessages(query);
  }, [uid]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  return (
    <div className={styles.chatWindow}>
      <div
        className={styles.messages}
        ref={messagesEndRef}
      >
        {messages.map((message,index) => {
          if (message.type == 2 || message.type == 3){
            if (!message.content.startsWith(baseUrl)) {
              message.content = baseUrl + message.content;
            }
          }
          const showMiddleTimestamp =
          index > 0 && shouldShowMiddleTimestamp(message, messages[index - 1]);
      
          return (
            <React.Fragment key={message.id}>
              {showMiddleTimestamp && (
                <div className={styles.middleTimestamp}>
                  {formatTimestamp(message.time)}
                </div>
              )}
              <Message message={message} uid={uid} onImageLoad={handleImageLoad} />
            </React.Fragment>)
        })}
        
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;

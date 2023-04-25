import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { InputBox } from './InputBox';
import { Message } from './Message';
import WebSocketClient from '../../utils/websocketClient';
import { list, addMessage, addImg } from '../../api/message';
import styles from './ChatWindow.module.css';



const ChatWindow = ({uid}) => {
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalMessage, setTotalMessage] = useState(0);
  const [currentPage, setCurrentPage] = useState(-1);

  const messagesEndRef = useRef(null);
  const baseUrl = "http://127.0.0.1:8081/ipfs/";

  const getQuery = useCallback(
    (pageNum) => ({ to: uid, pageNum, pageSize: 20 }),
    [uid]
  );

  
  const getAndSetMessages = async (query, append = false) => {
    try {
      setLoading(true);
      console.log("query")
      console.log(query)
      console.log(typeof(query))
      const res = await list(query);
      setTotalMessage(res.data.total);
      setCurrentPage(res.data.currPage);
      setLoading(false);
      if (res.data.currPage == 1) {
        setHasMore(false);
      }
      // console.log(res.data.list)
      // console.log("origin: ")
      // console.log(messages)
      if (append) {
        setMessages((prevMessages) => [...res.data.list, ...prevMessages]);
      } else {
        setMessages(res.data.list);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
      // console.log("new: ")
      // console.log(messages)
  };

  const handleScroll = useCallback(
    (event) => {
      const { scrollTop, clientHeight, scrollHeight } = event.target;

      if (scrollTop === 0 && !loading && hasMore) {
        const newPageNum = currentPage - 1;
        if (newPageNum > 0) {
          const newQuery = getQuery(newPageNum);
          getAndSetMessages(newQuery, true);
        }
      }
    },
    [loading, hasMore, currentPage, getQuery]
  );
  

  const setupWebsocket = (query) => {
    // set up websocket
    if (!socket.current) {
      socket.current = new WebSocketClient('ws://127.0.0.1:8004/ws');
    }
    const messageHandler = (event) => {
      const data = JSON.parse(event.data);
        console.log("data: " + event.data);
        // getAndSetMessages(query);
    };

    socket.current.addEventListener('message', messageHandler);

    const e = {uid:localStorage.getItem("im-userid"),type:9};

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


  const handleSend = (data) => {
    // console.log('handleSend data:', data);
    if (data.type === 'text') {
      const newMessage = data.content;
      addMessage({ to: uid, content: newMessage }).then((res) => {
        const tempMessage = res.data;
        // Update messages list with the new message
        setMessages((prevMessages) => [...prevMessages, tempMessage]);
         // Send message via websocket
         tempMessage.type = 2;
         console.log("tempMessage: " + JSON.stringify(tempMessage))
        socket.current.send(
          JSON.stringify(tempMessage)
          // JSON.stringify({
          //   from: localStorage.getItem('im-userid'),
          //   to: uid,
          //   message: data.content,
          //   type: 2,
          // })
        );
      });
    } else if (data.type === 'image') {
      const file = data.content;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('to', uid);
      
      addImg({ to: uid, file: file }).then((res) => {
        // Handle image upload response here
        // update the messages list with the new image message
        const tempMessage = res.data;
        // Update messages list with the new message
        setMessages((prevMessages) => [...prevMessages, tempMessage]);
        // and send a websocket message to notify others about the new image
        console.log("Image upload successful:", res);
        socket.current.send(
          JSON.stringify({
            from: localStorage.getItem('im-userid'),
            to: uid,
            message: data.content,
            type: 2,
          })
        );

      }).catch((error) => {
        console.error("Image upload failed:", error);
      });
    }
    // getAndSetMessages(getQuery(currentPage))
    

   
  };
  
  
  useEffect(() => {
    setupWebsocket(getQuery(currentPage));
  }, []);
  


  // useEffect(()=>{
  //   getAndSetMessages(query);
  // },[uid])

  useEffect(() => {
    getAndSetMessages(getQuery(currentPage));
  }, [uid]);


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
        {messages.map((message) => {
          if (message.type === 2){
            if (!message.content.startsWith(baseUrl)) {
              message.content = baseUrl + message.content;
            }
            console.log(message)
          }

          return <Message key={message.id} message={message} uid={uid} />
        })}
        
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;

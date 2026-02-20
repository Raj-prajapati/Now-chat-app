import React, { useEffect, useRef } from "react";

import { useChatStore } from "../../store/chatStore.js";
import MessageBubble from "./MessageBubble.jsx";
import useAuthStore from "../../store/authStore.js";

const ChatMessage = () => {
  const {
    messages,
    isMessagesLoading,
    listenToMessages,
    stopListeningToMessages,
  } = useChatStore();

  const authUser=useAuthStore((s)=>s.authUser)
 

  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const isNearBottom = () => {
    const el = containerRef.current;
    if (!el) return true;

    const threshold = 100;
    return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  };

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    listenToMessages();
    return () => stopListeningToMessages();
  }, []);

  useEffect(() => {
  if (!isMessagesLoading && messages.length) {
    scrollToBottom(false);
  }
}, [isMessagesLoading]);


  useEffect(() => {
  if (!messages.length) return;

  const lastMessage = messages[messages.length - 1];

  if (lastMessage.senderId === authUser._id) {
    scrollToBottom(true); 
  } else if (isNearBottom()) {
    scrollToBottom(true); 
  }
}, [messages]);


  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 items-center justify-center ">Loading...</div>
    );
  }

  return (
    <div className=" flex-1 overflow-y-auto p-4 space-y-2" ref={containerRef}>
      {messages.map((msg) => {
        return <MessageBubble key={msg._id} message={msg} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessage;

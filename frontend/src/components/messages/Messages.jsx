import React from "react";
import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { MessageSkeleton } from "../skeletons/messageSkeleton";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages()
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 return (
    <div className="px-4 flex-1 overflow-auto">
      {loading ? (
        // use idx+uuid or any other unique key as key
        [...Array(3)].map((_, idx) => (
          <MessageSkeleton key={`skeleton-${idx}`} />
        ))
      ) : messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

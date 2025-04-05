import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation.js";
import { extractTime } from "../../utils/extractTime.js";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilepic
    : selectedConversation?.profilepic || "/default-profile.png";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300 text-black";

  //shake class for shaking the messages when new message arrives
    const shakeClass = message.shouldShake ? "shake" : "";
 // console.log("message.message",message.message)

  // Format timestamp
  const formattedTime = extractTime(message.createdAt)

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="User avatar" />
        </div>
      </div>

      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} pb-2`}> {/* */}
      {message.message}
    </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;

import React from "react";
import "./message.css";
import Logo from "../conersations/logo512.png";
import { format } from "timeago.js";

const Message = ({ messages, own }) => {
  return (
    <>
      <div className={own ? `message own` : "message"}>
        <div className="messageTop">
          <img src={Logo} alt="" className="messageImg" />
          <p className="messageText">{messages.text}</p>
        </div>
        <div className="messageBottom">{format(messages.createdAt)}</div>
      </div>
    </>
  );
};

export default Message;

import React, { useState, useEffect } from "react";
import "./Conversation.css";
import Logo from "./logo512.png";
import axios from "axios";
import { useSelector } from "react-redux";

const Conversations = ({ conversation, currentUser }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let userId = userInfo ? userInfo["user"]._id : null;
  const [user, setUser] = useState([]);
  console.log(currentUser);
  console.log(conversation.members);
  useEffect(() => {
    //   const friendId = conversation.members.find((m) => m !== currentUser);
    const getuser = async () => {
      const token = userInfo
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      try {
        const res = await axios({
          method: "GET",
          // url: `http://localhost:5000/api/users/all`,
          url: `/api/users/all`,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        console.log(res.data);
        setUser(res.data.filter((a) => a._id !== userId));
        console.log(res.data.filter((a) => a._id === userId)[0].username);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [currentUser, conversation, userId, userInfo]);
  // console.log(user.filter);
  // console.log(conversation.members.filter((p) => p !== userId));
  const a = conversation.members.filter((p) => p !== userId);
  // console.log(a);
  // console.log(user.filter((p) => p._id === a[0]));
  const name = user.filter((p) => p._id === a[0]);
  console.log(name);
  return (
    <div className="conversation">
      <img className="conversationImg" src={Logo} alt="" />
      <span className="conversationName">{name[0]?.username}</span>
    </div>
  );
};

export default Conversations;

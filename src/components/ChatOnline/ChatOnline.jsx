import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import Logo from "../conersations/logo512.png";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatOnline = ({ onlineUsers, setOn, currentUser, setCurrentChat }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userId = userInfo ? userInfo["user"]._id : null;
  const [friends, setFriends] = useState([]);
  const [found, setfound] = useState(false);
  //console.log(userInfo["user"]._id);

  useEffect(() => {
    const getAll = async () => {
      const token = userInfo
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      try {
        const res = await axios({
          method: "GET",
          // url: "http://localhost:5000/api/users/all",
          url: "https://chatappsocial.herokuapp.com/api/users/all",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        // console.log(onlineUsers);
        setFriends(
          res.data.filter((p) => {
            for (var i = 0; i < onlineUsers.length; i++) {
              if (p._id === onlineUsers[i]["userId"] && p._id !== userId) {
                return p;
              }
            }
          })
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
  }, [userId, userInfo, onlineUsers]);
  console.log(currentUser);
  // console.log(onlineUsers[0]["userId"]);

  const handleClick = async (user) => {
    const token = userInfo
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null;
    console.log(userId);
    console.log(user._id);
    try {
      const con = await axios({
        method: "GET",
        // url: `http://localhost:5000/api/conversation/${userId}`,
        url: `https://chatappsocial.herokuapp.com/api/conversation/${userId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(con);
      console.log(con.data);

      const dup = con.data.findIndex((p) => {
        if (p["members"].includes(userId) && p["members"].includes(user._id)) {
          return p;
        }
      });
      console.log(dup);
      console.log(dup >= 0);
      if (dup < 0) {
        const data = await axios({
          method: "POST",
          // url: "http://localhost:5000/api/conversation",
          url: "https://chatappsocial.herokuapp.com/api/conversation",
          data: {
            senderId: userId,
            receiverId: user._id,
          },

          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(data);
      } else {
        setfound(true);
        setTimeout(() => {
          setfound(false);
        }, 5000);
      }

      const res = await axios({
        method: "POST",
        // url: `http://localhost:5000/api/conversation/find/${userId}/${user._id}`,
        url: `https://chatappsocial.herokuapp.com/api/conversation/find/${userId}/${user._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res);
      setCurrentChat(res.data);
      setOn(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="chatOnline">
        Online Users :<br />{" "}
        {friends.length <= 0
          ? "No Online user at the moment . Login with sample cred / wait for user to come online"
          : ""}
        {friends.map((m) => (
          <div
            className="chatonlineFriend"
            key={m._id}
            onClick={() => handleClick(m)}
          >
            <div className="chatOnlineImgConatiner">
              <img src={Logo} alt="" className="chatOnlineImg" />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{m.username}</span>
          </div>
        ))}
        {found && <p>Conversation exist</p>}
      </div>
    </>
  );
};

export default ChatOnline;

import React, { useState, useEffect, useRef } from "react";
import "./messenger.css";
import Conversation from "../components/conersations/Conversations";
import Message from "../components/Message/Message";
import ChatOnline from "../components/ChatOnline/ChatOnline";
import axios from "axios";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/loginActions";
import { useNavigate, Navigate } from "react-router-dom";
import Avator from "../../src/assets/noAvatar.png";

const Messenger = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  //console.log(userInfo._id);
  const userId = userInfo ? userInfo["user"]?._id : userInfo;
  const username = userInfo ? userInfo["user"]?.username : userInfo;
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [on, setOn] = useState(false);

  console.log(newMessage);

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();
  const newText = useRef();

  useEffect(() => {
    const expiryDate = localStorage.getItem("expiryDate");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setTimeout(() => {
      dispatch(logout());

      navigate("/");
    }, remainingMilliseconds);
  }, [dispatch, navigate]);

  ///socket
  useEffect(() => {
    // socket.current = io("ws://localhost:8000");
    socket.current = io("wss://chatsocialapp.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  //socket
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
      console.log(users);
    });
  }, [userId]);

  ///conversation
  useEffect(() => {
    const getConvrsation = async () => {
      const token = userInfo
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      try {
        const res = await axios({
          method: "GET",
          // url: `http://localhost:5000/api/conversation/${userId}`,
          url: `https://chatappsocial.herokuapp.com/api/conversation/${userId}`,
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(res);
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConvrsation();
  }, [userId, userInfo]);

  //getMessage
  useEffect(() => {
    const getMessages = async () => {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      try {
        const res = await axios({
          method: "GET",
          // url: `http://localhost:5000/api/message/${currentChat?._id}`,
          url: `https://chatappsocial.herokuapp.com/api/message/${currentChat?._id}`,
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(res.data);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  //Scroll overflow chat
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: userId,
      text: newText.current.value,
      conversationId: currentChat._id,
    };

    console.log(currentChat);
    const receiverId = currentChat?.members.find((m) => m !== userId);

    //socket
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: receiverId,
      text: newText.current.value,
    });

    try {
      const token = userInfo
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      const res = await axios({
        method: "POST",
        // url: `http://localhost:5000/api/message/`,
        url: `https://chatappsocial.herokuapp.com/api/message/`,
        data: message,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setMessages([...messages, res.data]);
      setnewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeClick = () => {
    console.log("Hi");
    dispatch(logout());

    navigate("/");
  };

  const handleChat = (c) => {
    setCurrentChat(c);
    console.log(c);
    const arr = c.members.filter((p) => p !== userId);
    console.log(arr);
    for (var i = 0; i < onlineUsers.length; i++) {
      if (arr.includes(onlineUsers[i]["userId"])) {
        setOn(true);
        break;
      } else {
        setOn(false);
      }
    }
    console.log(onlineUsers);
  };

  const Component = () => {
    const token = JSON.parse(localStorage.getItem("userInfo"));
    if (token === "") {
      return <Navigate to="/login" />;
    }
    return (
      <>
        {" "}
        <div className="topbar">
          <span>
            {" "}
            <img src={Avator} alt="noAvator" className="img_logo" />
            <span className="text_logo"> {username}</span>
          </span>
          <button onClick={hanldeClick} className="btn">
            Logout
          </button>
        </div>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input
                placeholder="List of Conversation"
                className="chatMenuInput"
              />
              {conversation?.map((c) => (
                <div
                  key={c._id}
                  onClick={() => {
                    handleChat(c);
                  }}
                >
                  <Conversation
                    conversation={c}
                    currentUser={userId}
                    onlineUsers={onlineUsers}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef} key={m._id}>
                        <Message messages={m} own={m.sender === userId} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    {on ? (
                      <>
                        <textarea
                          // onChange={(e) => setnewMessage(e.target.value)}
                          ref={newText}
                          placeholder="write something"
                          className="chatMessageInput"
                        ></textarea>
                        <button
                          onClick={handleSubmit}
                          className="chatSubmitButton"
                        >
                          Send
                        </button>
                      </>
                    ) : (
                      <p>User is not Online at the Moment</p>
                    )}
                  </div>
                </>
              ) : (
                <span className="noConversationTxt">
                  Open a Conversation to start a chat
                </span>
              )}
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentUser={userId}
                setCurrentChat={setCurrentChat}
                setOn={setOn}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  console.log(messages);
  return (
    <>
      <Component />
    </>
  );
};

export default Messenger;

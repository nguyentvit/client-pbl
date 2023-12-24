import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import {
  baseUrl,
  getRequest,
  postRequest,
  postRequestWithToken,
} from "../utils/services";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";
import openSocket from "socket.io-client";
import Peer from "simple-peer";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [call, setCall] = useState({});
  const [rejectCall, setRejectCall] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callData, setCallData] = useState({})
  const [receiveCall, setReceiveCall] = useState(false);
  const [signal, setSignal] = useState(null);
  const [peer, setPeer] = useState(null);



  // test
  const [stream, setStream] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const newSocket = openSocket(`${baseUrl}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send message
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.userIds?.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // receive message and notification
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatRoomId) return;

      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.userIds.some(
        (id) => id === res.postedByUser._id
      );

      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications(prev => [res, ...prev])
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users/find`, token);
      if (response.error) {
        return console.log("Error fetching users", response);
      }
      const pChats = response.users.filter((u) => {
        let isChatCreated = false;
        if (user._id === u._id) return false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.userIds[0] === u._id || chat.userIds[1] === u._id;
          });
        }

        return !isChatCreated;
      });
      setPotentialChats(pChats);
      setAllUsers(response.users);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/room`, token);

        setIsUserChatsLoading(false);
        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response.rooms);
      }
    };

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessage = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/room/${currentChat?._id}`,
        token
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response.conversation);
    };
    getMessage();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, currentChatId, setTextMessage, token) => {
      if (!textMessage) return console.log("You must type something...");
      const response = await postRequestWithToken(
        `${baseUrl}/room/${currentChatId}/message`,
        token,
        JSON.stringify({
          messageText: textMessage,
        })
      );
      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response.message[0]);

      setMessages((prev) => [...prev, response.message[0]]);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (memberId, token) => {
    const response = await postRequestWithToken(
      `${baseUrl}/room/initiate`,
      token,
      JSON.stringify({
        userIds: [memberId],
      })
    );
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setUserChats((prev) => [...prev, response.room]);
  }, []);

  const markAllNotificationsAsRead = useCallback((notifications) => {
    const mNofications = notifications.map(n => {
      return {...n, isRead: true}
    })

    setNotifications(mNofications);
  }, [])

  const markNotificationAsRead = useCallback((n, userChats, user, notifications) => {
    const desiredChat = userChats.find(chat => {
      const chatMembers = [user._id, n.postedByUser._id];
      const isDesiredChat = chat?.userIds.every((userId) => {
        return chatMembers.includes(userId);
      })
      return isDesiredChat;
    })
    const mNotifications = notifications.map(el => {
      if (n.postedByUser._id === el.postedByUser._id) {
        return {...n, isRead: true}
      } else {
        return el
      }
    })
    updateCurrentChat(desiredChat)
    setNotifications(mNotifications)
  })

  // const sendCall = (data) => {
  //   if (socket === null) return;
  //   socket.emit("sendcall", {data, stream});
  //   setCall({sended: true})
  //   setRejectCall(false);
  // }

  //test

  // goi
  const sendCall = (data) => {
    setSuccess(true);
    setData(data);
    setCall({sended: true});
    setRejectCall(false);
  }

  // lay stream
  useEffect(() => {
    if (call.sended && !rejectCall) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then((currentStream) => {
            console.log(currentStream);
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
          })
      } else if (navigator.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then((currentStream) => {
            setStream(currentStream);
            console.log(currentStream);
            myVideo.current.srcObject = currentStream;
          })
      } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia({video: true, audio: true})
          .then((currentStream) => {
            setStream(currentStream);
            console.log(currentStream);
            myVideo.current.srcObject = currentStream;
          })
      } else {
        console.log("that bai");
      }
    } else {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        if (myVideo.current) {

          myVideo.current.srcObject = null;
        }
        setStream(null);
      }
    }
  }, [call, socket, rejectCall])


// gui di
  useEffect(() => {
    if (success && stream) {
      if (socket === null) return;
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream
      })

      peer.on("signal", (signal) => {
        socket.emit("sendcall", {data, signalData: signal})
      })

      peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      })

      socket.on("callaccepted", (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      })

      connectionRef.current = peer;
    }
  }, [success, stream, socket]) 


//  gui tu choi
  const rejectCallFunc = (data) => {
    if (socket === null) return;
    socket.emit("rejectcall", data);
    setRejectCall(true);
  }

// nhan tu choi
useEffect(() => {
  if (socket === null) return;
  socket.on("getrejectcall", (data) => {
    setRejectCall(true);
  })
}, [socket, rejectCall])


  // dong y goi
  const acceptCallFunc = (data) => {
    setCallAccepted(true);
    setData(data);
  }


  // lay stream
  useEffect(() => {
    if (callAccepted) {
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((currentStream) => {
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
        })
    } else {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        if (myVideo.current) {

          myVideo.current.srcObject = null;
        }
        setStream(null);
      }
    }
  }, [callAccepted])

  useEffect(() => {
    if (callAccepted && stream && call.received) {
      const peer = new Peer({initiator: false, trickle: false, stream});
      peer.on('signal', (signal) => {
        socket.emit('answercall', {signal, id: call.data.from})
      })
      peer.on('stream', (currentStream) => {
        userVideo.current.srcObject = currentStream;
      })

      peer.signal(call.signal);
    }
  }, [callAccepted, stream])

  useEffect(() => {
    if (socket === null) return;
    socket.on("getcall", (data) => {
      setCall({received: true, data:data.data, signal: data.signalData});
      setRejectCall(false);
    })
  }, [call, socket])




  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        sendCall,
        call,
        rejectCallFunc,
        rejectCall,
        myVideo,
        acceptCallFunc,
        data,
        callAccepted,
        userVideo
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
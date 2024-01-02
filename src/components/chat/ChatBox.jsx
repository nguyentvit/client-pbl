import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";
import { IoVideocam } from "react-icons/io5";
import VideoPage from "./VideoPage";
const ChatBox = () => {
  const { user, token } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVideoCall, setIsOpenVideoCall] = useState(false);
  const {
    currentChat,
    messages,
    isMessagesLoading,
    sendTextMessage,
    sendCall,
    call,
    rejectCallFunc,
    rejectCall,
    myVideo,
    acceptCallFunc,
    data,
    callAccepted,
    userVideo,
    callSuccess,
    callEnded,
    leaveCall,
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();
  
  const handleCall = () => {
    sendCall({
      id: recipientUser?.user?._id,
      name: user?.name,
      from: user?._id,
    });
  };

  const handleAnswer = () => {
    acceptCallFunc({ id: 1 });
  };

  const handleReject = () => {
    //sendCall({sended: false})
    rejectCallFunc({ id: call.data.from });
  };

  const handleLeave = () => {
    leaveCall({ id: recipientUser?.user?._id });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No conversation selected yet...
      </p>
    );
  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading Chat...</p>
    );

  return (
    <Stack
      gap={4}
      className="chat-box"
      style={{
        background: "white",
        // backgroundColor: "#FFDEE9",
        // backgroundImage:
        //   "linear-gradient(0deg, #fbe9ef 0%, #9dfffa 69%, #a6f7ff 100%)",
      }}
    >
      <div
        className="chat-header"
        style={{
          background:
            " linear-gradient(90deg, #00d2ff 0%, rgb(58, 161, 213 ) 100%)",
        }}
      >
        <div className="avatar_chat">
          <img src={avatar} />
        </div>
        {/* {call.sended && !rejectCall && !callAccepted && (
          <div>
            <video playsInline autoPlay ref={myVideo}></video>
          </div>
        )}
        {call.received && !rejectCall && !callAccepted && (
          <div>
            <p>{call.data.name} is calling</p>
            <button onClick={handleAnswer}>Answer</button>
            <button onClick={handleReject}>Reject</button>
          </div>
        )}
        {callAccepted && (
          <div>
            <video playsInline autoPlay ref={myVideo}></video>
            <video playsInline autoPlay ref={userVideo}></video>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone-x-fill"
              viewBox="0 0 16 16"
              onClick={handleLeave}
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        )}
        {callSuccess && (
          <div>
            <video playsInline autoPlay ref={myVideo}></video>
            <video playsInline autoPlay ref={userVideo}></video>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone-x-fill"
              viewBox="0 0 16 16"
              onClick={handleLeave}
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        )} */}

        <div className="user-name">
          <strong>{recipientUser?.user?.name}</strong>
        </div>
        <strong>
          <IoVideocam
            style={{ color: "white", height: "32px", width: "32px" }}
            onClick={handleCall}
          />
          {/* <strong>
            <IoVideocam
              style={{ color: "white", height: "32px", width: "32px" }}
              onClick={openVideoCall}
            />

            {isOpenVideoCall && <VideoPage onClose={closeVideoCall} />}
          </strong> */}
        </strong>
      </div>
      {/* <div style={{height:"200px", width:"100%"}}> */}
      {/* && !callSuccess */}
      {call.sended && !rejectCall && !callAccepted && !callSuccess && (
          <div>
            <video playsInline autoPlay ref={myVideo}style={{height: "200px", width: "300px", border:"solid 1px black", marginLeft:"50px"}}></video>
          </div>
        )}
      {call.received && !rejectCall && !callAccepted && (
          <div>
            <p style={{color: "black", marginLeft: "100px"}}>{call.data.name} is calling</p>
            <button onClick={handleAnswer} style={{height: "50px", width: "100px", backgroundColor: "blue", color: "white", marginLeft:"100px", marginRight:"10px"}}>Answer</button>
            <button onClick={handleReject} style={{height: "50px", width: "100px", backgroundColor: "blue", color: "white"}}>Reject</button>
          </div>
        )}
        {callAccepted && (
          <div style={{display: "flex"}}>
            <video playsInline autoPlay ref={myVideo} style={{height: "200px", width: "300px", border:"solid 1px black", marginLeft:"50px"}}></video>
            <video playsInline autoPlay ref={userVideo} style={{height: "200px", width: "300px", border:"solid 1px black", marginLeft:"100px"}}></video>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone-x-fill"
              viewBox="0 0 16 16"
              onClick={handleLeave}
              style={{marginLeft: "10px", marginTop: "180px", color:"blue"}}
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        )}
        {/* {callSuccess && !rejectCall && !callAccepted && */}
        {callSuccess &&  (
          <div style={{display: "flex"}}>
             <video playsInline autoPlay ref={myVideo} style={{height: "200px", width: "300px", border:"solid 1px black", marginLeft:"50px"}}></video>
            <video playsInline autoPlay ref={userVideo} style={{height: "200px", width: "300px", border:"solid 1px black", marginLeft:"50px"}}></video>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone-x-fill"
              viewBox="0 0 16 16"
              onClick={handleLeave}
              style={{marginLeft: "10px", marginTop: "180px", color:"blue"}}
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        )}
      {/* </div> */}
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.postedByUser._id === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
              ref={scroll}
            >
              <span>{message?.message?.messageText}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
              
            </Stack>
          ))}
            {/* {call.sended && !rejectCall && !callAccepted && (
          <div>
            <video playsInline autoPlay ref={myVideo} style={{height: "370px", width: "500px", border:S"solid 1px black"}}></video>
          </div>
        )}
        */}
            {/* {call.sended && !rejectCall && !callAccepted && !callSuccess &&(
          <div>
            <video playsInline autoPlay ref={myVideo}style={{height: "200px", width: "300px", border:"solid 1px black", marginLeft:"50px"}}></video>
          </div>
        )} */}
      </Stack>
    
    

      <Stack
        direction="horizontal"
        gap={3}
        className="chat-input flex-grow-0"
        style={{
          border: "solid 1px   #e1dfdf",
          // background: " linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)",
          background: "white",
        }}
      >
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72, 112, 223, 0.2)"
          style={{ border: "solid 1px    #908f8f", background: "#ccc" }}
        />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, currentChat._id, setTextMessage, token)
          }
          style={{ background: "#ccc" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
            color="blue"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
        
      </Stack>
      
    </Stack>
  );
};

export default ChatBox;

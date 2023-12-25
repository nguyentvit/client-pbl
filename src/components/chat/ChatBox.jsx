import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import avatar from "../../assets/avatar.svg";
import "./ChatBox.css";
import { IoVideocam } from "react-icons/io5";
import CallModal from "./CallModal";

const ChatBox = () => {
  const { user, token } = useContext(AuthContext);
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
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();
  console.log("call:", call);

  console.log("data:", data);

  console.log("myvideo", myVideo);
  console.log("uservideo", userVideo);

  const [showCallModel, setShowCallModel] = useState(false);
  const [callContent, setCallContent] = useState("");
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

  useEffect(() => {
    if (call.sended && !rejectCall) {
      setCallContent(
        <div>
          <video playsInline muted autoPlay ref={myVideo}></video>
        </div>
      );
    } else if (call.received && !rejectCall && !callAccepted) {
      setCallContent(
        <div>
          <p>{call.data.name} is calling</p>
          <button onClick={handleAnswer}>Answer</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      );
    } else if (callAccepted) {
      setCallContent(
        <div>
          <video playsInline muted autoPlay ref={myVideo}></video>
          <video playsInline muted autoPlay ref={userVideo}></video>
        </div>
      );
    }
  }, [call, rejectCall, callAccepted]);

  const openCallModal = () => {
    setShowCallModel(true);
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
    <Stack gap={4} className="chat-box">
      <div
        className="chat-header"
        style={{
          background: "white",
          // " linear-gradient(90deg, #00d2ff 0%, rgb(58, 161, 213 ) 100%)",
        }}
      >
        <div className="avatar_chat">
          <img src={avatar} />
          <strong className="username_chat">{recipientUser?.user?.name}</strong>
        </div>
        <div className="icon_chat">
          {/* {call.sended && !rejectCall && (
            <div>
              <video playsInline muted autoPlay ref={myVideo}></video>
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
              <video playsInline muted autoPlay ref={myVideo}></video>
              <video playsInline muted autoPlay ref={userVideo}></video>
            </div>
          )} */}

          {/* <IoVideocam
            onClick={() => setShowCallModel(true)} // This line triggers showing the call modal
            style={{ width: "30", height: "30", color: "white" }}
          /> */}
         <IoVideocam
  onClick={openCallModal}
  style={{ width: "30", height: "30", color: "white" }}
/>
{showCallModel && (
  <CallModal
    isCalling={showCallModel}
    onClose={() => setShowCallModel(false)}
    myVideo={myVideo}
    userVideo={userVideo}
    handleAnswer={handleAnswer}
    handleReject={handleReject}
  >
   
    <div>
     
      <video ref={myVideo} autoPlay muted />
      <video ref={userVideo} autoPlay muted />
      <button onClick={handleAnswer}>Answer</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  </CallModal>
          )}
          <strong></strong>
        </div>
      </div>
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
      </Stack>
      <Stack
        direction="horizontal"
        gap={3}
        className="chat-input flex-grow-0"
        style={{
          // background: " linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)",
          background: "white",
          border: "0.2px solid #dddcdc",
        }}
      >
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="black"
          color="black"
        />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, currentChat._id, setTextMessage, token)
          }
          style={{ background: " #d0f6ff" }}
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

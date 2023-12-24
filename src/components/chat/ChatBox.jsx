import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";

const ChatBox = () => {
  const { user, token } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage, sendCall, call, rejectCallFunc, rejectCall, myVideo, acceptCallFunc, data, callAccepted, userVideo, callSuccess } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();
  console.log("call:", call);

  console.log("data:", data);

  console.log("myvideo", myVideo);
  console.log("uservideo", userVideo);


  const handleCall = () => {
    sendCall({id: recipientUser?.user?._id, name: user?.name, from: user?._id})
  }

  const handleAnswer = () => {
    acceptCallFunc({id: 1});
  }

  const handleReject = () => {
    //sendCall({sended: false})
    rejectCallFunc({id: call.data.from})
  }

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
        {call.sended && !rejectCall && !callAccepted &&(
          <div>
            <video playsInline muted autoPlay ref={myVideo}></video>
          </div>
        )}
        {call.received && !rejectCall && !callAccepted &&(
          <div>
            <p>{call.data.name} is calling</p>
            <button onClick={handleAnswer}>Answer</button>
            <button onClick={handleReject}>Reject</button>
          </div>
        )}
        {callAccepted || callSuccess && (
          <div>
          <video playsInline muted autoPlay ref={myVideo}></video>
          <video playsInline muted autoPlay ref={userVideo}></video>
        </div>
        )}

        <strong>{recipientUser?.user?.name}</strong>
        <strong>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-camera-video-fill"
            viewBox="0 0 16 16"
            onClick={handleCall}
          >
            <path
              fillRule="evenodd"
              d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"
            />
          </svg>
        </strong>
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
        }}
      >
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72, 112, 223, 0.2)"
          style={{ background: "#ccc" }} 
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

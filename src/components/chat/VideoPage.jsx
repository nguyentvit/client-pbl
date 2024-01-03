import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
// import { Stack } from "react-bootstrap";
import moment from "moment";
import "./ChatBox.css";

const VideoPage = ({ onClose }) => {
  const { user, token } = useContext(AuthContext);
  const 
  {
    currentChat,
    sendCall, 
    call,
    rejectCallFunc,
    rejectCall,
    myVideo, 
    acceptCallFunc,
    callAccepted,
    userVideo, 
    callSuccess,
    callEnded,
    leaveCall,
} = useContext(ChatContext);

const { recipientUser } = useFetchRecipientUser(currentChat, user);

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
    leaveCall({id: recipientUser?.user?._id,});
  }


 
  const close = () => {
    // setSuccessChangeInfo(false);
    onClose();
  }

  return (
    <div className="video-call" style={{display:"inline"}}>
        {call.sended && !rejectCall && !callAccepted && (
          <div>
            <video playsInline autoPlay ref={myVideo} className="Videosend"></video>
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
          <div className="" >
            <video playsInline autoPlay ref={myVideo} className="myVideo-accept" ></video>
            <video playsInline autoPlay ref={userVideo} className="userVideo-accept"></video>
          

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
          <div style={{display:"flex"}}>
            <video playsInline autoPlay ref={myVideo} className="myVideo-success" ></video>
            <video playsInline autoPlay ref={userVideo} className="userVideo-success"></video>
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

    </div>
   );
};

export default VideoPage;

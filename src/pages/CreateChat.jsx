import { useContext, useState } from "react";
//import "./CreateChat.css";
import "./Chat.css";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const CreateChat = ({ onClose }) => {
    const {token} = useContext(AuthContext);
    const {potentialChats, createChat, onlineUsers} = useContext(ChatContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleUserClick = (userId) => {
        setSelectedUser(userId === selectedUser ? null : userId);
    }
    const handleAdd = () => {
        if (selectedUser) {
            createChat(selectedUser, token);
            onClose();
        }
        else {
            setErrorMessage("Vui lòng chọn một người dùng để tạo cuộc trò chuyện.");
        }
    }
  return (
    <div className="modal">
      <div className="modal-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
          onClick={onClose}
          color="red"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
        </svg>
        <div>
            <ul >

        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <li
                className={selectedUser === u._id ? 'user selected' : 'user'}
                key={index}
                onClick={() => handleUserClick(u._id)}
              >
                {u.name}
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </li>
            );
          })}
            </ul>
        </div>
        <button onClick={handleAdd}>Add</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

      </div>
    </div>
  );
};

export default CreateChat;

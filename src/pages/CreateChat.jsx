import { useContext, useState } from "react";
//import "./CreateChat.css";
import "./Chat.css";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import avatar from "../assets/avatar.svg";

const CreateChat = ({ onClose }) => {
  const { token } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserClick = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
    console.log(selectedUser);
  };
  const handleAdd = () => {
    if (selectedUser) {
      createChat(selectedUser, token);
      onClose();
    } else {
      setErrorMessage("Vui lòng chọn một người dùng để tạo cuộc trò chuyện.");
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <IoCloseCircle className="button-close" onClick={onClose} />

        <div className="modal-title">
          <h5>Add Friends</h5>
        </div>

        <div>
          <ul className="user-list">
            {potentialChats &&
              potentialChats.map((u, index) => {
                return (
                  <li
                    className={selectedUser === u._id ? "selected" : ""}
                    key={index}
                    onClick={() => handleUserClick(u._id)}
                  >
                    <img src={avatar} />
                    {u.name}
                  </li>
                );
              })}
          </ul>
        </div>
        <button className="button-add" onClick={handleAdd}>
          Add
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default CreateChat;

import { useContext, useState } from "react";
//import "./CreateChat.css";
import "./Chat.css";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { IoCloseCircle } from "react-icons/io5";
import avatar from "../assets/avatar.svg";

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
      <IoCloseCircle className="button-close"  onClick={onClose}/>
       
        <div className="modal-title">
          <h5>Add Friends</h5>
        </div>
      
        <div>
            <ul >

        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div className = "user-list">
                
                {/* <div className="avatar_chat">
          
        </div> */}
              <li
                className={selectedUser === u._id ? 'user selected' : 'user'}
                key={index}
                onClick={() => handleUserClick(u._id)}
              >
         <img src={avatar} />
                {u.name}
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </li>
              </div>

             
              
            );
          })}
            </ul>
        </div>
        <button  className="button-add" onClick={handleAdd}>Add</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}

      </div>
    </div>
    
  );
};

export default CreateChat;

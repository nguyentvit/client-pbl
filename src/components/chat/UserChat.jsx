import { Container, Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg"
import "./ChatBox.css"
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserChat = ({chat, user}) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const {onlineUsers} = useContext(ChatContext);

    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?.user?._id);

    return  <Stack direction="horizontal"  className="user-card " role="button">
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} />
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.user.name}</div>
                <div className="text">Text Message</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">
                12/12/2022
            </div>
            <div className="this-user-notifications">
                2
            </div>
            <span className={isOnline ? "user-online" : ""}></span>
        </div>
    </Stack> 
    
}
 
export default UserChat;